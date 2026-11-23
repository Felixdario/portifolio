// Uso: npm run build && npm run serve; depois node tests/visual/medir-lava.mjs [url] (SEM_GPU=1 para renderização por software)
// Mede o custo da lâmpada de lava: rAF (fps e quadros perdidos) e o tempo de CPU por quadro
// (CDP Performance.getMetrics: script, estilo, layout e o total das tarefas), em Chrome com GPU.
import { chromium } from '@playwright/test';

const base = process.argv[2] ?? 'http://localhost:4321';
const browser = await chromium.launch({ channel: 'chrome', headless: process.env.SEM_GPU === '1', args: ['--disable-renderer-backgrounding'] });

async function medir({ rota, w, h, dpr, cpu, rolar }) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Performance.enable');
  if (cpu > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
  await page.goto(base + rota, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const m0 = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map((m) => [m.name, m.value]));
  const quadros = await page.evaluate(async (rolar) => {
    const ts = [];
    const fim = performance.now() + 5000;
    await new Promise((ok) => {
      const passo = (t) => {
        ts.push(t);
        if (rolar) window.scrollBy(0, 6);
        if (t < fim) requestAnimationFrame(passo);
        else ok();
      };
      requestAnimationFrame(passo);
    });
    const d = ts.slice(1).map((t, i) => t - ts[i]);
    d.sort((a, b) => a - b);
    return { n: d.length, p50: d[Math.floor(d.length * 0.5)], p95: d[Math.floor(d.length * 0.95)], perdidos: d.filter((x) => x > 25).length };
  }, rolar);
  const m1 = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map((m) => [m.name, m.value]));
  const ms = (k) => ((m1[k] - m0[k]) * 1000) / quadros.n;
  await ctx.close();
  return {
    cena: `${rota} ${w}x${h}@${dpr}${cpu > 1 ? ` cpu÷${cpu}` : ''}${rolar ? ' rolando' : ''}`,
    fps: +(1000 / quadros.p50).toFixed(0),
    'quadro p95 (ms)': +quadros.p95.toFixed(1),
    'perdidos/5s': quadros.perdidos,
    'CPU por quadro (ms)': +ms('TaskDuration').toFixed(2),
    'script (ms)': +ms('ScriptDuration').toFixed(2),
    'estilo+layout (ms)': +(ms('RecalcStyleDuration') + ms('LayoutDuration')).toFixed(2),
  };
}

const cenas = [
  { rota: '/', w: 1440, h: 900, dpr: 1, cpu: 1 },
  { rota: '/', w: 1920, h: 1080, dpr: 1, cpu: 1 },
  { rota: '/', w: 2560, h: 1440, dpr: 1, cpu: 1 },
  { rota: '/', w: 1440, h: 900, dpr: 2, cpu: 1 },
  { rota: '/', w: 1920, h: 1080, dpr: 1, cpu: 4 },
  { rota: '/', w: 1920, h: 1080, dpr: 1, cpu: 1, rolar: true },
  { rota: '/projetos/pulo/', w: 1920, h: 1080, dpr: 1, cpu: 1 },
];
const linhas = [];
for (const c of cenas) linhas.push(await medir(c));
console.table(linhas);
await browser.close();
