// Gera as imagens de prévia (Open Graph, 1200×630) em public/og/: a home e cada projeto, em PT e EN.
// Rodar: npm run previas  (usa o Chrome instalado e a fonte Bricolage Grotesque do Google Fonts).
// Os textos repetem os de src/i18n; ao mudar um número ou nome lá, rode de novo.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BG = '#15141d';
const INK = '#ece9e1';
const COR = { sobra: '#d6f27c', pontual: '#f6a3c7', pulo: '#86e6d8', confere: '#bba8f6' };
const HOST = 'eduardofelixdev.vercel.app';

const HOME = {
  pt: { titulo: 'Desenvolvedor full-stack júnior', frase: 'Node.js, React e React Native, com um teste para cada garantia.', lugar: 'Curitiba e região, PR' },
  en: { titulo: 'Junior full-stack developer', frase: 'Node.js, React and React Native, with a test for every guarantee.', lugar: 'Curitiba area, Brazil' },
};

const PROJETOS = {
  sobra: {
    pt: { kicker: '01 · finanças pessoais', numero: '1091', legenda: 'testes passando' },
    en: { kicker: '01 · personal finance', numero: '1091', legenda: 'tests passing' },
  },
  pontual: {
    pt: { kicker: '02 · agendamento online', numero: '20→1', legenda: '20 pedidos no mesmo horário, 1 reserva' },
    en: { kicker: '02 · online booking', numero: '20→1', legenda: '20 requests for the same slot, 1 booking' },
  },
  pulo: {
    pt: { kicker: '03 · encurtador de links', numero: '6,42 ms', legenda: 'p95 do redirect com cache' },
    en: { kicker: '03 · link shortener', numero: '6.42 ms', legenda: 'cached redirect, p95' },
  },
  confere: {
    pt: { kicker: '04 · currículos com IA', numero: '78 = 78', legenda: 'a mesma nota ao trocar nome, gênero ou idade' },
    en: { kicker: '04 · AI résumé checker', numero: '78 = 78', legenda: 'the same score when name, gender or age change' },
  },
};
const NOMES = { sobra: 'Sobra', pontual: 'Pontual', pulo: 'Pulo', confere: 'Confere' };

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// Gotas com o filtro "gosma" (blur + limiar de alfa), como a lâmpada de lava do site.
function gotas(lista) {
  return `<svg class="lava" viewBox="0 0 1200 630" aria-hidden="true">
    <defs><filter id="g"><feGaussianBlur stdDeviation="18"/><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12"/></filter></defs>
    <g filter="url(#g)">${lista.map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('')}</g>
  </svg>`;
}

const base = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { background: ${BG}; color: ${INK}; font-family: 'Bricolage Grotesque', 'Arial Narrow', sans-serif; position: relative; }
  .lava { position: absolute; inset: 0; width: 1200px; height: 630px; }
  .conteudo { position: absolute; inset: 0; padding: 64px 72px; display: flex; flex-direction: column; }
  .rodape { margin-top: auto; display: flex; gap: 18px; font-size: 26px; font-weight: 600; opacity: 0.8; }
`;

function pagina(css, corpo) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&display=block" rel="stylesheet">
<style>${base}${css}</style></head><body>${corpo}</body></html>`;
}

function home(l) {
  const t = HOME[l];
  return pagina(
    `
    h1 { font-size: 150px; line-height: 0.86; font-weight: 800; letter-spacing: -0.05em; margin-top: 18px; max-width: 760px; }
    .titulo { font-size: 40px; font-weight: 800; margin-top: 34px; letter-spacing: -0.01em; }
    .frase { font-size: 30px; font-weight: 600; margin-top: 10px; max-width: 700px; opacity: 0.86; line-height: 1.25; }`,
    `${gotas([
      [985, 170, 120, COR.sobra],
      [1095, 330, 70, COR.pontual],
      [930, 420, 95, COR.pulo],
      [1100, 540, 85, COR.confere],
      [1040, 260, 40, COR.pontual],
    ])}
    <div class="conteudo">
      <h1>Eduardo Felix</h1>
      <p class="titulo">${esc(t.titulo)}</p>
      <p class="frase">${esc(t.frase)}</p>
      <div class="rodape"><span>${HOST}</span><span>·</span><span>${esc(t.lugar)}</span></div>
    </div>`,
  );
}

function projeto(slug, l) {
  const t = PROJETOS[slug][l];
  const cor = COR[slug];
  return pagina(
    `
    .kicker { font-size: 28px; font-weight: 600; opacity: 0.8; }
    h1 { font-size: 168px; line-height: 0.9; font-weight: 800; letter-spacing: -0.05em; margin-top: 12px; }
    .numero { position: absolute; left: 790px; top: 150px; width: 360px; height: 330px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: ${BG}; }
    .numero strong { font-size: 76px; font-weight: 800; letter-spacing: -0.04em; line-height: 1; white-space: nowrap; }
    .numero span { font-size: 25px; font-weight: 600; margin-top: 12px; line-height: 1.2; max-width: 300px; }`,
    `${gotas([
      [970, 315, 205, cor],
      [770, 170, 46, cor],
      [1135, 95, 52, cor],
      [745, 470, 30, cor],
    ])}
    <div class="numero"><strong>${esc(t.numero)}</strong><span>${esc(t.legenda)}</span></div>
    <div class="conteudo">
      <p class="kicker">${esc(t.kicker)}</p>
      <h1>${NOMES[slug]}</h1>
      <div class="rodape"><span>Eduardo Felix</span><span>·</span><span>${HOST}</span></div>
    </div>`,
  );
}

mkdirSync('public/og', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  const alvos = [];
  for (const l of ['pt', 'en']) {
    alvos.push([`home-${l}`, home(l)]);
    for (const slug of Object.keys(PROJETOS)) alvos.push([`${slug}-${l}`, projeto(slug, l)]);
  }
  for (const [nome, html] of alvos) {
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const fonte = await page.evaluate(() => document.fonts.check("800 40px 'Bricolage Grotesque'"));
    if (!fonte) throw new Error('A fonte Bricolage Grotesque não carregou');
    await page.screenshot({ path: `public/og/${nome}.png`, type: 'png' });
    console.log(`public/og/${nome}.png`);
  }
} finally {
  await browser.close();
}
