// Gera os currículos em PDF (PT e EN) em public/, a partir dos textos abaixo.
// Rodar: node scripts/curriculos.mjs  (usa o Chrome instalado, como os testes do Playwright).
// O PDF sai com texto selecionável e links clicáveis, legível por ATS e pelo próprio Confere.
import { chromium } from '@playwright/test';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const CONTATO = {
  email: 'eduardojosedario@gmail.com',
  linkedin: 'https://www.linkedin.com/in/felixdariodev/',
  github: 'https://github.com/Felixdario',
  site: 'https://eduardofelixdev.vercel.app',
};

const PROJETOS = {
  confere: { nome: 'Confere', url: 'https://confere-six.vercel.app', repo: 'https://github.com/Felixdario/Confere' },
  pulo: { nome: 'Pulo', url: 'https://pulo-two.vercel.app', repo: 'https://github.com/Felixdario/Pulo' },
  pontual: { nome: 'Pontual', url: 'https://pontual-zeta.vercel.app/b/navalha-e-cafe', repo: 'https://github.com/Felixdario/Pontual' },
  sobra: { nome: 'Sobra', url: 'https://sobra-chi.vercel.app', repo: 'https://github.com/Felixdario/Sobra' },
};

const TEXTOS = {
  pt: {
    lang: 'pt-BR',
    arquivo: 'eduardo-felix-curriculo-pt.pdf',
    titulo: 'Desenvolvedor full-stack júnior',
    local: 'Curitiba e região, PR',
    resumoRotulo: 'Resumo',
    resumo:
      'Desenvolvedor full-stack júnior com experiência profissional desde 2024 em React, React Native, Node.js e C#. Hoje na Epays, fintech de pagamentos, mantenho uma biblioteca de componentes React e contribuo com um sistema de notas fiscais de serviço. Nos projetos pessoais, escrevo APIs em Node.js e Python, registro as decisões em ADRs e provo as garantias principais com testes; os quatro estão no ar.',
    experienciaRotulo: 'Experiência',
    experiencia: [
      {
        cargo: 'Full-Stack Developer Junior',
        empresa: 'Epays',
        quando: 'ago/2025 – atual',
        itens: [
          'Mantenho uma biblioteca de componentes React com Vite, usada nos produtos internos.',
          'Contribuo com o Epjota, sistema do fluxo de notas fiscais de serviço (NFS-e) e relatórios fiscais.',
        ],
        stack: 'React, TypeScript, Vite, Sass, C#, PostgreSQL, Docker, Redis',
      },
      {
        cargo: 'Front-End Developer',
        empresa: 'Epays',
        quando: 'mai/2025 – ago/2025',
        itens: ['Funcionalidades e correções em aplicações React, integradas às APIs REST da plataforma.'],
        stack: 'React, TypeScript',
      },
      {
        cargo: 'Front-End Developer',
        empresa: 'Floox',
        quando: 'set/2024 – dez/2024 e fev/2025 – mai/2025',
        itens: [
          'Criei do zero a base de um app React Native de leitura de documentos: navegação, autenticação e layouts.',
          'Integrei OCR para extrair dados de documentos e implementei o modo offline com sincronização.',
        ],
        stack: 'React Native, TypeScript, OCR',
      },
      {
        cargo: 'Front-End Developer',
        empresa: 'LUGARH',
        quando: 'dez/2024 – fev/2025',
        itens: [
          'Componentes React com Material UI numa plataforma de perfis e currículos integrada ao BNE.',
          'Internacionalização em português, inglês e espanhol; suporte a clientes em inglês e espanhol.',
        ],
        stack: 'React, Node.js, Material UI, i18n',
      },
      {
        cargo: 'Full-Stack Developer',
        empresa: 'BNE – Banco Nacional de Empregos',
        quando: 'jan/2024 – out/2024',
        itens: [
          'Back-end em C#, ASP.NET MVC e Razor num sistema de RH que começou interno e passou a uso público.',
          'Extração de dados de documentos com OCR, SQL Server com modelagem relacional e APIs REST.',
        ],
        stack: 'C#, ASP.NET MVC, Razor, SQL Server, OCR',
      },
    ],
    projetosRotulo: 'Projetos (no ar, com código aberto)',
    projetos: {
      confere:
        'Currículo conferido contra a vaga: nota calculada em código, só com trecho citado; trocar nome, gênero ou idade não muda a nota. Python, FastAPI, PostgreSQL com pgvector, Redis, Next.js.',
      pulo: 'Encurtador de URLs com analytics. Redirect com p95 de 6,42 ms em medição local; cada clique humano contado uma vez, com robôs à parte, via Redis Streams e worker idempotente. TypeScript, Fastify, PostgreSQL, Redis, React.',
      pontual:
        'Agendamento online. Constraint EXCLUDE no PostgreSQL: 20 pedidos simultâneos para o mesmo horário resultam em 1 reserva; 24 regras de negócio ligadas aos testes. NestJS, Prisma, PostgreSQL, Next.js.',
      sobra:
        'Finanças pessoais na web e no celular. Dinheiro em centavos inteiros, refresh token rotativo com detecção de reuso, 1091 testes. Fastify, Prisma, React, React Native com Expo.',
    },
    codigo: 'código',
    competenciasRotulo: 'Competências',
    competencias: [
      ['Front-end', 'React, Next.js, TypeScript, Vite, Tailwind CSS, Material UI, TanStack Query'],
      ['Mobile', 'React Native, Expo'],
      ['Back-end', 'Node.js, Fastify, NestJS, Python (FastAPI), C# (ASP.NET MVC), APIs REST, filas'],
      ['Dados', 'PostgreSQL, SQL Server, Redis, SQLite, Prisma, Drizzle, SQLAlchemy'],
      ['Qualidade e entrega', 'Vitest, pytest, Jest, Playwright, axe, GitHub Actions, Docker Compose, Vercel, Render'],
    ],
    formacaoRotulo: 'Formação',
    formacao: [
      ['Análise e Desenvolvimento de Sistemas', 'PUCPR', '2026 – 2028, em andamento'],
      ['Técnico em Informática', 'IFPR, campus Colombo', '2022 – 2025'],
    ],
    idiomasRotulo: 'Idiomas',
    idiomas: 'Português (nativo), inglês (profissional pleno), espanhol (profissional).',
  },
  en: {
    lang: 'en',
    arquivo: 'eduardo-felix-resume-en.pdf',
    titulo: 'Junior full-stack developer',
    local: 'Curitiba area, Brazil',
    resumoRotulo: 'Summary',
    resumo:
      'Junior full-stack developer working professionally since 2024 with React, React Native, Node.js and C#. At Epays, a payments fintech, I maintain a React component library and contribute to a service-invoice system. In my own projects I write APIs in Node.js and Python, record decisions in ADRs and prove the main guarantees with tests; all four are live.',
    experienciaRotulo: 'Experience',
    experiencia: [
      {
        cargo: 'Full-Stack Developer Junior',
        empresa: 'Epays',
        quando: 'Aug 2025 – present',
        itens: [
          'Maintain a React component library built with Vite and used across internal products.',
          'Contribute to Epjota, a system that manages service invoice (NFS-e) and fiscal report flows between companies and providers.',
        ],
        stack: 'React, TypeScript, Vite, Sass, C#, PostgreSQL, Docker, Redis',
      },
      {
        cargo: 'Front-End Developer',
        empresa: 'Epays',
        quando: 'May 2025 – Aug 2025',
        itens: ["Features and fixes in existing React applications, integrated with the platform's REST APIs."],
        stack: 'React, TypeScript',
      },
      {
        cargo: 'Front-End Developer',
        empresa: 'Floox',
        quando: 'Sep 2024 – Dec 2024 and Feb 2025 – May 2025',
        itens: [
          'Built the foundation of a React Native document app from scratch: navigation, authentication and layouts.',
          'Integrated OCR for document data extraction and implemented offline mode with data sync.',
        ],
        stack: 'React Native, TypeScript, OCR',
      },
      {
        cargo: 'Front-End Developer',
        empresa: 'LUGARH',
        quando: 'Dec 2024 – Feb 2025',
        itens: [
          'React components with Material UI on a profile and résumé platform integrated with BNE.',
          'Internationalization in Portuguese, English and Spanish; client support in English and Spanish.',
        ],
        stack: 'React, Node.js, Material UI, i18n',
      },
      {
        cargo: 'Full-Stack Developer',
        empresa: 'BNE (Brazilian job platform)',
        quando: 'Jan 2024 – Oct 2024',
        itens: [
          'Back end in C#, ASP.NET MVC and Razor for an HR system that grew from internal tooling to public use.',
          'OCR-based document data extraction, SQL Server with relational modeling, REST APIs and third-party integrations.',
        ],
        stack: 'C#, ASP.NET MVC, Razor, SQL Server, OCR',
      },
    ],
    projetosRotulo: 'Projects (live, open source)',
    projetos: {
      confere:
        'A résumé checked against the job post. The score is computed in code and only counts items backed by a quote from the résumé; changing name, gender or age does not change the score; 44 of 46 prompt-injection variants detected. Python, FastAPI, PostgreSQL with pgvector, Redis, Next.js.',
      pulo: 'URL shortener with analytics. Redirect p95 of 6.42 ms in a local measurement; each human click counted once, bots kept apart, via Redis Streams and an idempotent worker. TypeScript, Fastify, PostgreSQL, Redis, React.',
      pontual:
        'Online booking. A PostgreSQL EXCLUDE constraint: 20 simultaneous requests for the same slot end in 1 booking; 24 business rules traced to their tests. NestJS, Prisma, PostgreSQL, Next.js.',
      sobra:
        'Personal finance on the web and on the phone. Money stored as integer cents, rotating refresh tokens with reuse detection, 1,091 tests. Fastify, Prisma, React, React Native with Expo.',
    },
    codigo: 'code',
    competenciasRotulo: 'Skills',
    competencias: [
      ['Front end', 'React, Next.js, TypeScript, Vite, Tailwind CSS, Material UI, TanStack Query'],
      ['Mobile', 'React Native, Expo'],
      ['Back end', 'Node.js, Fastify, NestJS, Python (FastAPI), C# (ASP.NET MVC), REST APIs, queues'],
      ['Data', 'PostgreSQL, SQL Server, Redis, SQLite, Prisma, Drizzle, SQLAlchemy'],
      ['Quality and delivery', 'Vitest, pytest, Jest, Playwright, axe, GitHub Actions, Docker Compose, Vercel, Render'],
    ],
    formacaoRotulo: 'Education',
    formacao: [
      ['Associate degree in Systems Analysis and Development', 'PUCPR', '2026 – 2028, in progress'],
      ['Technical course in Information Technology', 'IFPR, Colombo campus', '2022 – 2025'],
    ],
    idiomasRotulo: 'Languages',
    idiomas: 'Portuguese (native), English (full professional), Spanish (professional working).',
  },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const semProtocolo = (u) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

function html(t) {
  const contato = [
    esc(t.local),
    `<a href="mailto:${CONTATO.email}">${CONTATO.email}</a>`,
    `<a href="${CONTATO.site}">${semProtocolo(CONTATO.site)}</a>`,
    `<a href="${CONTATO.linkedin}">${semProtocolo(CONTATO.linkedin)}</a>`,
    `<a href="${CONTATO.github}">${semProtocolo(CONTATO.github)}</a>`,
  ].join(' · ');

  const experiencia = t.experiencia
    .map(
      (e) => `
      <div class="item">
        <div class="linha"><h3>${esc(e.cargo)} · ${esc(e.empresa)}</h3><span class="quando">${esc(e.quando)}</span></div>
        <ul>${e.itens.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
        <p class="stack">${esc(e.stack)}</p>
      </div>`,
    )
    .join('');

  const projetos = Object.entries(t.projetos)
    .map(([slug, texto]) => {
      const p = PROJETOS[slug];
      return `
      <div class="item projeto">
        <div class="linha"><h3>${p.nome}</h3><span class="quando"><a href="${p.url}">${semProtocolo(new URL(p.url).origin)}</a> · <a href="${p.repo}">${t.codigo}</a></span></div>
        <p>${esc(texto)}</p>
      </div>`;
    })
    .join('');

  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<title>Eduardo Felix · ${esc(t.titulo)}</title>
<style>
  @page { size: A4; margin: 11mm 14mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 9.2pt; line-height: 1.3; color: #1d1b18; }
  a { color: inherit; text-decoration: none; }
  header { border-bottom: 2px solid #1d1b18; padding-bottom: 6px; margin-bottom: 6px; }
  h1 { font-size: 20pt; line-height: 1.1; letter-spacing: -0.01em; }
  .titulo { font-size: 11.5pt; font-weight: 700; margin-top: 2px; }
  .contato { margin-top: 5px; color: #45413b; }
  .contato a { color: #1d1b18; border-bottom: 1px solid #b9b3a8; }
  section { margin-top: 8px; }
  h2 { font-size: 9pt; text-transform: uppercase; letter-spacing: 0.08em; color: #8a3b12; margin-bottom: 5px; }
  .item { margin-bottom: 5px; break-inside: avoid; }
  .linha { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  h3 { font-size: 10pt; }
  .quando { color: #45413b; white-space: nowrap; font-size: 9pt; }
  .quando a { border-bottom: 1px solid #b9b3a8; }
  ul { margin: 2px 0 0 14px; }
  li { margin-top: 1px; }
  .stack { color: #45413b; font-size: 8.8pt; margin-top: 1px; }
  .projeto p { margin-top: 1px; }
  dl { display: grid; grid-template-columns: auto 1fr; gap: 2px 12px; }
  dt { font-weight: 700; }
  .formacao div { display: flex; justify-content: space-between; gap: 12px; }
</style>
</head>
<body>
  <header>
    <h1>Eduardo Felix</h1>
    <p class="titulo">${esc(t.titulo)}</p>
    <p class="contato">${contato}</p>
  </header>
  <section><h2>${esc(t.resumoRotulo)}</h2><p>${esc(t.resumo)}</p></section>
  <section><h2>${esc(t.experienciaRotulo)}</h2>${experiencia}</section>
  <section><h2>${esc(t.projetosRotulo)}</h2>${projetos}</section>
  <section><h2>${esc(t.competenciasRotulo)}</h2>
    <dl>${[...t.competencias, [t.idiomasRotulo, t.idiomas]].map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join('')}</dl>
  </section>
  <section class="formacao"><h2>${esc(t.formacaoRotulo)}</h2>
    ${t.formacao.map(([curso, onde, quando]) => `<div><span><strong>${esc(curso)}</strong> · ${esc(onde)}</span><span class="quando">${esc(quando)}</span></div>`).join('')}
  </section>
</body>
</html>`;
}

mkdirSync('public', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
try {
  for (const t of Object.values(TEXTOS)) {
    const page = await browser.newPage();
    await page.setContent(html(t), { waitUntil: 'load' });
    const destino = `public/${t.arquivo}`;
    await page.pdf({ path: destino, format: 'A4', printBackground: true, preferCSSPageSize: true, tagged: true, outline: false });
    const paginas = (readFileSync(destino, 'latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
    console.log(`${destino}: ${paginas} página(s)`);
    if (process.argv.includes('--html')) writeFileSync(destino.replace(/\.pdf$/, '.html'), html(t));
    await page.close();
  }
} finally {
  await browser.close();
}
