// Clica no botão da demonstração e captura o palco no fim: node tests/visual/demo.mjs <saida>
import { chromium } from '@playwright/test';
const saida = process.argv[2];
const b = await chromium.launch({ channel: 'chrome' });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  for (const s of ['sobra', 'pontual', 'pulo', 'confere']) {
    await p.goto(`http://localhost:4321/projetos/${s}/`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    await p.screenshot({ path: `${saida}/topo-${s}-${w}.png` });
    const botao = p.locator('section[aria-labelledby="garantia-titulo"] button');
    await botao.scrollIntoViewIfNeeded();
    await botao.click();
    await p.waitForTimeout(5200);
    await p.locator('section[aria-labelledby="garantia-titulo"]').screenshot({ path: `${saida}/demo-${s}-${w}.png` });
    console.log(s, w, await botao.textContent());
  }
}
await b.close();
