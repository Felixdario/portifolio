// Capturas de conferência: node tests/visual/capturar.mjs <saida> [rota...]
import { chromium } from '@playwright/test';
const [saida, ...rotas] = process.argv.slice(2);
const b = await chromium.launch({ channel: 'chrome' });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const erros = [];
  p.on('console', (m) => m.type() === 'error' && erros.push(m.text()));
  p.on('pageerror', (e) => erros.push(String(e)));
  for (const r of rotas.length ? rotas : ['']) {
    await p.goto('http://localhost:4321/' + (r === 'home' ? '' : r), { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 200)); } window.scrollTo(0, 0); });
    await p.waitForTimeout(800);
    const larg = await p.evaluate(() => document.documentElement.scrollWidth);
    const nome = `${saida}/${r.replace(/\//g, '_') || 'home'}-${w}.png`;
    await p.screenshot({ path: nome, fullPage: true });
    console.log(nome, 'scrollWidth', larg, erros.length ? erros : '');
  }
}
await b.close();
