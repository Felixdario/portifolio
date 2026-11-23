// English texts. Source: content/textos-site.md (facts in content/conteudo.md).
import type { Dicionario } from './tipos';

export const en: Dicionario = {
  htmlLang: 'en',
  metaTitulo: 'Eduardo Felix · junior full-stack developer',
  metaDescricao:
    'Junior full-stack developer in the Curitiba area, Brazil. APIs in Node.js and TypeScript, interfaces in React, apps in React Native, and a test for every guarantee.',
  lugar: 'Curitiba area, Brazil',
  idioma: { rotulo: 'PT', nome: 'Ler em português' },
  tema: { claro: 'Use light theme', escuro: 'Use dark theme' },
  menu: { abrir: 'Menu', fechar: 'Close', titulo: 'Navigation' },
  pularParaConteudo: 'Skip to content',
  nav: { projetos: 'Projects', trabalho: 'Work', sobre: 'About', contato: 'Contact' },
  hero: {
    nome: 'Eduardo Felix',
    frase:
      'Junior full-stack developer. APIs in Node.js and TypeScript, interfaces in React, apps in React Native, and a test for every guarantee.',
    fraseCurta:
      'Junior full-stack developer: Node.js, React and React Native, with a test for every guarantee.',
    linkProjetos: '→ see projects',
    linkSobre: '→ about me',
    listaRotulo: 'Featured projects',
    fatos: {
      sobra: 'finance, 1091 tests',
      pontual: 'booking, 20 requests and 1 booking',
      pulo: 'links, every click once',
      confere: 'résumés with AI',
    },
  },
  pj: {
    titulo: 'Projects',
    intro: 'Four projects from 2026. Each one makes a promise, and a test proves it holds.',
    ver: '→ view project',
    repo: '→ repository',
    aoVivo: '→ see it live',
  },
  projetos: {
    sobra: {
      nome: 'Sobra',
      kicker: '01 · personal finance',
      numero: '1091',
      numeroLegenda: 'tests passing',
      frase:
        "Personal finance: the mobile app logs a purchase on the spot, and the web dashboard shows where the month's money went.",
      garantia: 'Money stored as whole cents. Nothing goes through a float.',
      stackCurta: 'TypeScript · Fastify · Prisma · React · Expo',
      capaAlt: "Sobra's web dashboard with the October summary",
      pagina: {
        meta: '01 · personal finance · 2026',
        resumo:
          "Personal finance that answers how much you have now, where this month's money went and how much is left. The mobile app logs a purchase on the spot; the web dashboard explains the month.",
        demo: 'live, with a demo user and fictional data',
        garantiaTitulo: 'R$ 10.00 in 3. Still adds up to 10.00.',
        demonstracao: {
          botao: 'Split in 3',
          rodando: 'Splitting…',
          deNovo: 'Split again',
          antes: 'Press the button to split R$ 10.00 into three parts.',
          durante: 'The 1000 cents become three whole parts…',
          depois: '3.34 + 3.33 + 3.33 = 10.00. The leftover cent goes to the first part.',
          esquerda: 'with a float, each part is 3.3333333333333335, and rounding all three gives 9.99',
          direita: 'in whole cents: 334 + 333 + 333 = 1000',
          prova:
            'This is the `allocate(cents(1000), 3)` case in the shared package tests, which expects [334, 333, 333]. A property test checks, with random totals and weights, that the parts always add up to the total.',
          palcoAntes: 'A R$ 10.00 drop ready to be split in three',
          palcoDepois: 'R$ 10.00 split into three drops: 3.34, 3.33 and 3.33',
          rotulos: { total: 'R$ 10.00', soma: 'sum: 10.00' },
        },
        comoTitulo: 'Three decisions that hold the rest',
        como: [
          '**Whole cents.** `BigInt` in the database and round-half-to-even. No value goes through a float (ADR-008 and ADR-010).',
          '**One contract.** The same Zod schema validates input in the API, filters the output, generates the OpenAPI and checks the response on web and mobile.',
          '**A session that defends itself.** Rotating refresh tokens: presenting an already used token revokes the whole family of that login.',
        ],
        numeros: [
          { valor: '1091', texto: 'tests, all passing: shared 331, tokens 225, i18n 41, client 63, api 167, web 100 and mobile 164' },
          { valor: '0', texto: 'axe violations in real Chrome, in light and dark themes, at 1440 and 390 px' },
          { valor: '34', texto: 'decisions written down in `docs/decisoes.md`' },
          { valor: '3', texto: 'taps to log a purchase: only amount and category are required' },
        ],
        naoMedido:
          '**Not measured:** the mobile app was checked on Expo web and in the Jest tests, not on a real device. The PostgreSQL (Docker) path was not tested, and setup was only tested on Windows 11.',
        stack:
          'TypeScript 6 · Fastify 5 · Prisma 7 · Zod 4 · React 19 · Vite 8 · TanStack Query · Expo SDK 58 · React Native 0.88 · Vitest · Jest · axe-core',
        capturasAlt: [
          "Sobra's web dashboard in dark theme, with October's balance and the income and expenses chart",
          'The Sobra app logging a R$ 45.90 purchase: picking the category',
          "October's summary in the app, with the balance, where the money went and the budgets",
          "October's budgets on the web dashboard, with what is close to the limit and what went over",
        ],
      },
    },
    pontual: {
      nome: 'Pontual',
      kicker: '02 · online booking',
      numero: '20→1',
      numeroLegenda: '20 requests for the same slot, 1 booking',
      frase:
        'Booking for barbershops, salons and clinics: customers book from their phone and the business follows along on a dashboard.',
      garantia: 'The same slot is never booked twice, even when two customers confirm at once.',
      stackCurta: 'NestJS · PostgreSQL · Prisma · Next.js',
      capaAlt: "Pontual's dashboard showing one appointment in detail",
      pagina: {
        meta: '02 · online booking · 2026',
        resumo:
          'Online booking that never lets the same slot be taken twice. Customers book on their own from their phone, and the barbershop, salon or clinic follows the schedule on a dashboard.',
        demo: 'live, with a demo account and fictional data',
        garantiaTitulo: '20 requests for the same slot. 1 booking.',
        demonstracao: {
          botao: 'Send the 20 requests',
          rodando: 'Sending…',
          deNovo: 'Send again',
          antes: 'Press the button to send all 20 requests at once.',
          durante: 'All 20 requests arrive at the same moment…',
          depois: '1 booking confirmed. 19 requests refused with 409 HORARIO_INDISPONIVEL.',
          esquerda: '20 customers confirm together',
          direita: 'refused with a 409 and 5 open slots',
          prova:
            'In the integration test, the 20 requests hit PostgreSQL at the same time, over 10 rounds. Every round ends with 1 booking and 19 refusals.',
          palcoAntes: '20 requests ready for the same Tuesday 2:00 pm slot',
          palcoDepois: '1 request took the Tuesday 2:00 pm slot; 19 were refused',
          rotulos: { dia: 'Tuesday', hora: '2:00 pm' },
        },
        comoTitulo: 'Blocked at three layers',
        como: [
          '**Pure domain.** The rules take "now" as a parameter, so every edge case becomes a test with the same result every time.',
          '**Lock in the transaction.** Before reading the schedule, the transaction takes a lock per professional and per customer (`pg_advisory_xact_lock`).',
          "**A rule in the database itself.** An `EXCLUDE USING gist` constraint in PostgreSQL, hand-written in a migration because Prisma can't model it.",
        ],
        numeros: [
          { valor: '0', texto: 'overlaps and 0 deadlocks across 15 rounds of 40 mixed operations' },
          { valor: '24', texto: 'business rules, each linked to the tests that cover it' },
          { valor: '363', texto: 'tests: 199 API, 4 shared, 33 web, 114 integration and 13 E2E' },
          { valor: '2', texto: 'real bugs found by an independent validator, both fixed' },
        ],
        naoMedido:
          '**Not measured:** the API has no bundled production build; it runs with SWC transpiling on load.',
        stack:
          'NestJS 11 · Prisma 7 · PostgreSQL 17 · Next 16 · React 19 · TanStack Query · Tailwind 4 · Vitest · fast-check · Playwright with axe',
        capturasAlt: [
          "The business dashboard with the day's schedule",
          'A customer picking a slot on their phone',
          'An unavailable-slot refusal suggesting other times',
          'The day schedule in dark theme, with one appointment in detail and its prep and cleanup block',
        ],
      },
    },
    pulo: {
      nome: 'Pulo',
      kicker: '03 · link shortener',
      numero: '6.42 ms',
      numeroLegenda: 'cached redirect, p95',
      frase: 'A URL shortener with analytics that keeps redirects fast.',
      garantia: 'Every human click is counted once. Bots and WhatsApp previews are kept apart.',
      stackCurta: 'Fastify · Redis Streams · PostgreSQL · React',
      capaAlt: 'A Pulo link page with about 5 million clicks',
      ressalva: 'Measured on a local development machine.',
      pagina: {
        meta: '03 · link shortener · 2026',
        resumo:
          'A URL shortener with analytics that counts every human click once, keeps bots and WhatsApp previews apart, and keeps redirects fast.',
        demo: 'live, with a demo account and fictional data',
        garantiaTitulo: 'The worker dies. No click counts twice.',
        demonstracao: {
          botao: 'Kill the worker',
          rodando: 'Running…',
          deNovo: 'Kill it again',
          antes: 'Press the button: the worker writes a batch of clicks and dies before acknowledging the read.',
          durante: 'Worker A dies between the COMMIT and the XACK. XAUTOCLAIM hands the batch to worker B…',
          depois: 'Every click written, no duplicates. Worker B recognized by id each event that A had already written.',
          esquerda: 'clicks enter the Redis Stream',
          direita: 'written once in PostgreSQL',
          prova:
            'In the integration test, 300 events enter the stream. The first worker dies right after the COMMIT; the second one recovers the pending entries with `XAUTOCLAIM`. The table ends with exactly 300 rows, and the aggregates match it.',
          palcoAntes: 'Clicks waiting in the Redis Stream, with two workers and PostgreSQL',
          palcoDepois: 'Worker A died; worker B finished the job and PostgreSQL has no duplicates',
          rotulos: { stream: 'stream', a: 'worker A', b: 'worker B', banco: 'PostgreSQL', caiu: 'died before XACK' },
        },
        comoTitulo: 'Fast on redirect, exact on counting',
        como: [
          '**Redirect in a single script.** Cache-aside, a 30 s negative cache, a token bucket and the `GET` run in one Lua script in Redis.',
          '**Exactly once.** The click goes to a Redis Stream; the worker is idempotent by event id and writes the aggregates in the same statement as the raw row.',
          '**No IP stored.** The visitor becomes an HMAC-SHA256 with a daily salt, because of LGPD (Brazil’s data protection law). Bots and previews are classified and counted apart.',
        ],
        numeros: [
          { valor: '6.42 ms', texto: 'cached redirect p95, at 10,129 req/s in one process' },
          { valor: '0.19 ms', texto: 'to 0.59 ms for a link dashboard with 5 million clicks, against 28 to 122 ms for COUNT on the raw table' },
          { valor: '100,000', texto: 'events processed by 4 workers in 12.7 to 14.6 s, with no deadlock across 7 rounds' },
          { valor: '538', texto: 'unit tests, plus 172 integration, 8 consistency and 17 E2E' },
        ],
        numerosRessalva:
          'Measured on a local development machine: Ryzen 5 5500, Windows 11, PostgreSQL and Redis on Docker Desktop.',
        naoMedido:
          '**Not measured:** the consistency suite (8 of 8) was not run again in the last phase; the number is the one recorded in `docs/performance.md`. The cold account view takes 319 ms, a declared weak spot.',
        stack:
          'Node 22 · Fastify 5 · Drizzle ORM · Redis 7 · PostgreSQL 16 · React 19 · Vite 8 · TanStack Router and Query · Recharts · Vitest · fast-check · Playwright with axe · autocannon',
        capturasAlt: [
          "Pulo's link list, with the clicks and rules for each one",
          'A link page on mobile, with humans, bots and previews counted apart',
          "Pulo's home page on mobile: shortening a link and downloading the QR code",
          'A link page in dark theme: humans, bots and previews apart, clicks per day and countries',
        ],
      },
    },
    confere: {
      nome: 'Confere',
      kicker: '04 · AI résumé checker',
      numero: '78 = 78',
      numeroLegenda: 'the same score when name, gender or age change*',
      frase:
        'Paste the job post, upload the résumé and see each requirement next to the passage that proves it, or the lack of one.',
      garantia: 'No quote, no credit. The score is computed in code, not by the AI.',
      stackCurta: 'Python · FastAPI · pgvector · Next.js',
      capaAlt: "Confere's home page with a sample analysis",
      ressalva:
        '*Measured on the rules, with fictional cases written by the author. It does not measure a language model.',
      pagina: {
        meta: '04 · AI résumé checker · 2026',
        resumo:
          'Paste the job post, upload the résumé and see each requirement next to the passage that proves it, or the lack of one. The AI reads the résumé; the code gives the score.',
        demo: 'live, in a rule-based demo mode with no AI',
        garantiaTitulo: '4 versions of a résumé. One score.*',
        demonstracao: {
          botao: 'Compare the 4 versions',
          rodando: 'Comparing…',
          deNovo: 'Compare again',
          antes: 'Press the button to run the four versions through the same rules.',
          durante: 'The header is removed by anonymization, and the score is computed in code…',
          depois: 'All four versions score 78. Difference: 0.*',
          esquerda: 'name, gender, age, marital status and contacts change',
          direita: 'one score, computed in code',
          prova:
            'In the eval, a base résumé for a data analyst job and three variants (a 58-year-old man, a 27-year-old woman, a Vietnamese name) expect the same score: 78. *Measured on the rules, with fictional cases written by the author. It does not measure a language model.',
          palcoAntes: 'Four versions of the same résumé, each with a different header',
          palcoDepois: 'The four versions became a single score: 78',
          rotulos: { base: 'base', c1: 'man, 58', c2: 'woman, 27', c3: 'Vietnamese name', anon: 'anonymization', nota: 'score' },
        },
        comoTitulo: "The AI doesn't decide the score",
        como: [
          '**No quote, no credit.** Every extracted item carries the literal quote from the résumé, checked against the text. A requirement with no quote is left out.',
          '**Anonymized before reading.** Name, email, phone, CPF (Brazilian tax ID), age and gender are removed before the AI sees the text (ADR 0004).',
          '**Score in code.** Required items weigh 70 %, nice-to-haves 20 % and seniority 10 %, in a fixed formula (ADR 0003).',
        ],
        numeros: [
          { valor: '44/46', texto: 'prompt-injection variants detected, with 0 false positives in 89 legitimate sentences' },
          { valor: '204/204', texto: 'annotated personal data items removed by anonymization' },
          { valor: '0.97', texto: 'precision and 1.00 recall on skills, with rules' },
          { valor: '882', texto: 'tests: 846 fast and 36 integration' },
        ],
        numerosRessalva:
          'The numbers measure the rules and the surrounding code, on 30 fictional cases written by the author. They do not measure a language model.',
        naoMedido:
          "**Not measured:** the language model's extraction (precision, recall, score in range and real injection resistance), the cost and the latency per analysis. It was also never tested on real people's résumés.",
        stack:
          'Python · FastAPI · SQLAlchemy 2 · PostgreSQL with pgvector · Redis · Next.js 16 · React 19 · pytest · strict mypy · Playwright with axe',
        capturasAlt: [
          "Confere's home page with a sample analysis",
          'An analysis result: score 62 and each requirement next to the passage that proves it, or "not found"',
          'Two versions of the résumé compared for the same job: the score goes from 62 to 90',
          'Recruiter mode: anonymized candidates with score, requirements and the quote for each, with the decision always human',
        ],
      },
    },
  },
  pagina: {
    voltar: '← all projects',
    papelRotulo: 'Role',
    papel: 'directing the AI agents, written decisions and tests',
    codigoRotulo: 'Code',
    demoRotulo: 'Demo',
    demoAviso: 'Free hosting: the first visit can take up to a minute while the server wakes up.',
    licencaRotulo: 'License',
    licenca: 'MIT',
    garantiaRotulo: 'The guarantee',
    comoRotulo: 'How',
    numerosRotulo: 'Numbers',
    capturasRotulo: 'Screenshots',
    naoMedidoRotulo: 'Not measured',
    proximo: 'Next',
    metaTituloSufixo: 'Eduardo Felix',
  },
  tb: {
    titulo: 'Work',
    intro: 'Beyond the portfolio projects: what I do at work and the project that closed my technical degree.',
    epays: {
      meta: 'Now · Epays, Colombo, Brazil',
      gota: 'Epays',
      gotaData: 'since Aug 2025',
      cargo: 'Junior full-stack',
      libTitulo: 'Component library',
      lib: "I maintain a React component library built with Vite, used across the company's internal products.",
      epjotaTitulo: 'Epjota',
      epjota:
        'I contribute to Epjota, which manages service invoices (NFS-e) and fiscal reports between companies and service providers.',
      stack: 'React · TypeScript · Vite · Sass · C# · PostgreSQL · Docker · Redis',
      ressalva: 'Company code: no screenshots or internal numbers here.',
    },
    tcc: {
      meta: 'Final project · IT technical degree, IFPR',
      nome: 'SportLink',
      frase:
        'A system for people who play sports: athlete profiles, courts and reviews, competitions, matches, rankings, achievements and chat.',
      partes: 'Three parts that talk through the same API:',
      web: '**Web** · Next.js, deployed on Vercel',
      app: '**App** · React Native with Expo',
      api: '**API** · Python with FastAPI',
      repositorio: 'repository →',
      aoVivo: 'See SportLink live →',
    },
  },
  so: {
    titulo: 'About',
    texto1:
      "I'm Eduardo Felix, a junior full-stack developer in the Curitiba area, Brazil. I work at Epays, on a React component library used across internal products and on Epjota, a service-invoice (NFS-e) workflow.",
    texto2:
      "In my portfolio projects I direct AI agents, write down every decision and write tests that prove the main guarantees. When something wasn't measured, the README says so.",
    uso: 'What I use',
    usoItens: [
      ['Back-end', 'Node.js, TypeScript, Fastify, NestJS, Python with FastAPI, C# and ASP.NET'],
      ['Front-end', 'React, Next.js, Vite, TanStack Query, Tailwind, i18n, accessibility tested with axe'],
      ['Mobile', 'React Native and Expo; Flutter in personal projects'],
      ['Data', 'PostgreSQL, Redis, Prisma, Drizzle, SQLAlchemy, SQL Server'],
      ['Testing', 'Vitest, fast-check, Playwright, Testing Library, pytest'],
      ['Applied AI', 'versioned evals, prompt-injection defense, anonymization'],
      ['Languages', 'Portuguese (native), English (full professional), Spanish (professional)'],
    ],
    trajetoria: 'Career',
    formacao: 'Education',
    empregos: [
      ['Aug 2025 – now', 'Epays', 'junior full-stack'],
      ['May 2025 – Aug 2025', 'Epays', 'front-end'],
      ['Feb 2025 – May 2025', 'Floox', 'front-end, React Native app'],
      ['Dec 2024 – Feb 2025', 'LUGARH', 'front-end, React and i18n'],
      ['Sep 2024 – Dec 2024', 'Floox', 'front-end, app foundation from scratch'],
      ['Jan 2024 – Oct 2024', 'BNE', 'full-stack, C# and SQL Server'],
    ],
    cursos: [
      ['2026 – 2028', 'PUCPR', 'Systems Analysis and Development, in progress'],
      ['2022 – 2025', 'IFPR', 'IT technical degree'],
    ],
  },
  ct: {
    titulo: 'Contact',
    github: '→ GitHub',
    linkedin: '→ LinkedIn',
    cvPt: '→ currículo em PDF (PT)',
    cvEn: '→ résumé in PDF (EN)',
  },
  rodape: {
    assinatura: 'Eduardo Felix · Curitiba area, Brazil · 2026',
    site: 'Static site built with Next.js.',
    codigo: 'Code on GitHub',
    topo: 'back to top ↑',
  },
};
