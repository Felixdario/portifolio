// Uso: npm run build && npm run serve; depois node tests/visual/medir-imagens.mjs [url]
// Mede, para cada captura, a largura exibida, a escolhida pelo navegador e o fator de ampliação.
import { chromium } from '@playwright/test';

const base = process.argv[2] ?? 'http://localhost:4321';
const browser = await chromium.launch({ channel: 'chrome' });
for (const [w, dpr] of [[1920, 1], [1920, 1.25], [1440, 2], [390, 3]]) {
  const page = await browser.newPage({ viewport: { width: w, height: 1000 }, deviceScaleFactor: dpr });
  let pior = [];
  for (const rota of ['/', '/projetos/sobra/', '/projetos/pontual/', '/projetos/pulo/', '/projetos/confere/']) {
    await page.goto(base + rota);
    await page.evaluate(async () => {
      for (const img of document.images) img.loading = 'eager';
      await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))));
    });
    const r = await page.evaluate((dpr) =>
      [...document.querySelectorAll('img')].map((i) => {
        const caixa = i.getBoundingClientRect();
        // object-fit: cover => a imagem é ampliada até cobrir a caixa
        const nome = i.currentSrc.split('/').pop(); const arquivo = /-800.webp$/.test(nome) ? 800 : /-2880.webp$/.test(nome) ? 2880 : i.srcset ? 1440 : i.naturalWidth; const alto = arquivo * (i.naturalHeight / i.naturalWidth); const escala = Math.max(caixa.width / arquivo, caixa.height / alto) * dpr;
        return { src: i.currentSrc.split('/').pop(), caixa: Math.round(caixa.width), natural: arquivo, ampliacao: +escala.toFixed(2) };
      }), dpr);
    pior.push(...r.map((x) => ({ rota, ...x })));
  }
  pior.sort((a, b) => b.ampliacao - a.ampliacao);
  console.log(`\n== ${w}px @${dpr}x (ampliação > 1 = borrado)`);
  for (const x of pior.slice(0, 8)) console.log(`${x.ampliacao}x  ${x.rota} ${x.src} caixa ${x.caixa}px natural ${x.natural}px`);
  await page.close();
}
await browser.close();
