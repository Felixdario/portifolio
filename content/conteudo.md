# Conteúdo do portfólio (rascunho para revisão do dono)

Convenções deste arquivo:

- `[fonte: ...]` no fim da linha diz de onde veio a afirmação. Caminhos relativos a `C:\Users\eduar\`.
  `linkedin.pdf` = `portfolio/linkedin.pdf`; `api.github.com` = `https://api.github.com/users/Felixdario/repos`
  consultado em 2026-11-18.
- `[EM CONSTRUÇÃO]` = não existe ainda (demo, captura, link).
- `[PENDENTE: ...]` = exige decisão ou confirmação do dono.
- `[DECIDIDO: ...]` = decisão do dono em 2026-11-18 (resumo na seção 6).
- Texto sem fonte é redação deste rascunho (títulos, frases de ligação), não fato.

---

## 1. Identidade

- **Nome:** Eduardo Felix [fonte: perfil-github/README.md; linkedin.pdf]
- **Usuário no GitHub:** Felixdario [fonte: api.github.com; linkedin.pdf]
- **Localização:**
  - "Curitiba e região, Paraná" [fonte: perfil-github/README.md]
  - "Colombo, Paraná, Brasil" [fonte: linkedin.pdf]
  - [DECIDIDO: o site mostra "Curitiba e região, Paraná"]
- **Cargo atual:** Full-Stack Developer Junior na Epays, desde agosto de 2025 [fonte: linkedin.pdf; perfil-github/README.md]
- **Título que já aparece nas fontes:**
  - "Desenvolvedor full-stack júnior em Curitiba e região" [fonte: perfil-github/README.md]
  - "Full-Stack Developer focused on React ecosystem · Building scalable interfaces and APIs that work in production" [fonte: linkedin.pdf]

**Função em uma frase** [DECIDIDO: opção 1]:

1. "Desenvolvedor full-stack júnior: APIs em Node.js e TypeScript, interfaces em React e apps em React Native." (adaptada de [fonte: perfil-github/README.md])
2. "Desenvolvedor full-stack que prova as garantias de cada projeto com testes." (adaptada de "as garantias principais têm teste" [fonte: perfil-github/README.md])
3. "Desenvolvedor full-stack júnior focado no ecossistema React, do banco à interface." (adaptada de [fonte: linkedin.pdf])

---

## 2. Projetos

Os quatro projetos foram construídos com agentes de IA sob a direção do dono, com as decisões registradas
por escrito (ADRs e registros de decisão) e testes que provam o resultado [fonte: perfil-github/README.md].
Ordem declarada nos READMEs: Sobra 1 de 4, Pontual 2 de 4, Pulo 3 de 4 [fonte: financas/README.md; agenda/README.md; encurtador/README.md].
Confere não diz a posição. [DECIDIDO: no site a ordem é Sobra, Pontual, Pulo, Confere.]

Nenhum dos quatro tem demo publicada: todos rodam localmente com conta demo e dados sintéticos
[fonte: financas/README.md; agenda/README.md; encurtador/README.md; curriculo/README.md].

### 2.1 Sobra (pasta `financas`)

- **Nome:** Sobra [fonte: financas/README.md]
- **Frase-resumo:** Controle financeiro pessoal que responde quanto você tem agora, para onde foi o dinheiro este mês e quanto sobra; app mobile para lançar o gasto na hora e painel web para entender o mês. [fonte: financas/README.md]
- **Problema:** lançar o gasto na hora pelo celular e entender o mês no painel web. [fonte: perfil-github/README.md]
- **Decisões técnicas:**
  - Dinheiro em centavos inteiros, `BigInt` no banco, arredondamento meio-para-o-par; nada passa por float (ADR-008, ADR-010). [fonte: financas/README.md]
  - Isolamento entre usuários no banco com FKs compostas `(id, userId)`; recurso alheio responde 404, nunca 403 (ADR-010). [fonte: financas/README.md]
  - Refresh token rotativo com detecção de reuso: reapresentar um token já usado derruba a família inteira daquele login (ADR-012). [fonte: financas/README.md]
  - Sessão do web em cookie `httpOnly` com CSRF double-submit; mobile guarda o refresh no Keychain/Keystore (ADR-034). [fonte: financas/README.md]
  - Contrato Zod único entre API, web e mobile: valida a entrada, filtra a saída, gera o OpenAPI e valida a resposta no cliente (ADR-009, ADR-014). [fonte: financas/README.md]
  - Cliente compartilhado com refresh single-flight e atualização otimista com rollback (ADR-023); um teste de integração mostra que, sem o single-flight, três requisições concorrentes derrubam a sessão. [fonte: financas/README.md]
  - Datas como texto `YYYY-MM-DD` no fuso de São Paulo (ADR-007, ADR-011). [fonte: financas/README.md]
  - Tokens de design com testes de contraste WCAG nos dois temas e paleta de gráficos testada para daltonismo (ADR-022). [fonte: financas/README.md]
  - Lançar gasto em 3 toques: só valor e categoria são obrigatórios (ADR-030). [fonte: financas/README.md]
  - 34 decisões registradas em `docs/decisoes.md`. [fonte: financas/README.md]
- **O que demonstra:** monorepo com API, web e mobile sob um contrato tipado; segurança de sessão (rotação, reuso, cookie httpOnly + CSRF); cuidado com dinheiro e datas; acessibilidade e pior caso testados. [fonte: financas/README.md; perfil-github/README.md]
- **Números:**
  - 1087 testes, todos passando (shared 331, tokens 225, i18n 41, client 63, api 165, web 100, mobile 162). [fonte: financas/README.md]
  - 0 violações de axe numa passada no Chrome real com `@axe-core/playwright` (claro/escuro, 1440/390 px). [fonte: financas/README.md]
- **Não medido / não testado:**
  - App mobile validado só no Expo web e nos testes com Jest; não foi aberto num aparelho real. [fonte: financas/README.md]
  - Caminho com PostgreSQL (Docker) não testado. [fonte: financas/README.md]
  - Fluxo de instalação testado só no Windows 11. [fonte: financas/README.md]
- **Stack:** TypeScript 6 estrito; API Fastify 5, Prisma 7 (SQLite via driver adapter), Zod 4, argon2id, Swagger UI; web React 19, Vite 8, React Router 7, TanStack Query e Table, visx, CSS Modules, Sonner; mobile Expo SDK 58, React Native 0.88, Expo Router, Reanimated 4, Gesture Handler 3; testes Vitest, Testing Library, axe-core, Jest; pnpm 10, ESLint 10, Prettier, GitHub Actions. [fonte: financas/README.md]
- **Links:**
  - Repositório: https://github.com/Felixdario/Sobra [fonte: git remote de financas; api.github.com]
  - Demo: [EM CONSTRUÇÃO] (só local, `http://localhost:5173` com o usuário demo) [fonte: financas/README.md]
- **Capturas disponíveis** (em `financas/docs/screenshots/`; dados do usuário demo, sintéticos [fonte: financas/README.md]):
  - Destaques usados no README: `web/painel-outubro-claro-desktop.png`, `mobile/resumo-outubro-claro.png`, `mobile/transacoes-claro.png`, `mobile/resumo-outubro-escuro.png`, `web/painel-outubro-escuro-desktop.png`, `web/importar-previa-claro-desktop.png`, `mobile/lancar-valor.png`, `mobile/lancar-categoria.png`, `mobile/lancar-salvo.png` [fonte: financas/README.md]
  - Web (29 arquivos): `categorias-escuro-desktop`, `contas-escuro-desktop`, `en-budgets-light-desktop`, `en-dashboard-october-light-desktop`, `en-preferences-light-desktop`, `en-transactions-light-desktop`, `importar-previa-claro-desktop`, `importar-previa-escuro-mobile`, `login-claro-desktop`, `login-escuro-mobile`, `orcamentos-claro-desktop`, `orcamentos-escuro-mobile`, `painel-novembro-parcial-claro-desktop`, `painel-outubro-claro-desktop`, `painel-outubro-claro-mobile`, `painel-outubro-escuro-desktop`, `painel-outubro-escuro-mobile`, `pior-caso-*` (antes/depois de categorias, contas, painel, transações), `transacoes-claro-desktop`, `transacoes-edicao-claro-desktop`, `transacoes-escuro-mobile` (todos `.png`) [fonte: listagem de financas/docs/screenshots/web]
  - Mobile (26 arquivos): `editar`, `en-ajustes`, `en-lancar`, `en-login`, `en-resumo`, `en-transacoes`, `fonte-ampliada`, `lancar-categoria`, `lancar-salvo`, `lancar-valor`, `login`, `pior-caso-*` (antes/depois de fonte, lançar, resumo, transações), `resumo-novembro-parcial`, `resumo-outubro-claro`, `resumo-outubro-escuro`, `transacoes-claro`, `transacoes-deslize`, `transacoes-escuro`, `transacoes-filtros-ativos`, `transacoes-filtros` (todos `.png`) [fonte: listagem de financas/docs/screenshots/mobile]
  - Vídeo: [EM CONSTRUÇÃO] (nenhum encontrado)
- **Status:** publicado no GitHub, licença MIT, último commit em 2026-11-05. [fonte: financas/README.md; git log de financas; api.github.com]

### 2.2 Pontual (pasta `agenda`)

- **Nome:** Pontual [fonte: agenda/README.md]
- **Frase-resumo:** Agendamento online que não deixa marcar duas vezes o mesmo horário. [fonte: agenda/README.md]
- **Problema:** barbearias, salões e clínicas precisam de reserva online sem conflito de horário, mesmo quando dois clientes confirmam ao mesmo tempo; o cliente reserva sozinho pelo celular e o estabelecimento acompanha a agenda num painel. [fonte: perfil-github/README.md; agenda/README.md]
- **Decisões técnicas:**
  - Conflito barrado em três camadas: domínio puro, transação com `pg_advisory_xact_lock` por profissional (e por cliente) antes de ler, e constraint `EXCLUDE USING gist` no PostgreSQL. [fonte: agenda/README.md]
  - Intervalos semiabertos `[início, fim)`; o agendamento ocupa o bloco com preparo e limpeza (RN-01, RN-06, D-02). [fonte: agenda/README.md]
  - Domínio puro que recebe o "agora" como parâmetro, para cada caso de borda virar teste determinístico; só `infra/relogio.ts` lê `Date.now()`. [fonte: agenda/README.md]
  - Constraint de exclusão numa migration SQL escrita à mão, porque o Prisma não modela `EXCLUDE` (D-13). [fonte: agenda/README.md]
  - Idempotência com `Idempotency-Key` por tentativa de confirmação, válida por 24 h (RN-22). [fonte: agenda/README.md]
  - Recusa 409 `HORARIO_INDISPONIVEL` com até 5 próximos horários livres; o front traduz cada código de erro em mensagem e ação. [fonte: agenda/README.md]
  - Front com proxy same-origin para cookie de sessão first-party (D-17). [fonte: agenda/README.md]
- **O que demonstra:** regras de negócio modeladas por inteiro (24 regras, RN-01 a RN-24, rastreadas até os testes); garantia de horário único no banco provada sob concorrência; interface nos dois lados (reserva no celular e painel no balcão). [fonte: agenda/README.md]
- **Números:**
  - 20 pedidos simultâneos para o mesmo horário dão 1 reserva e 19 recusas, em 10 rodadas. [fonte: agenda/README.md]
  - Carga mista de 15 rodadas × 40 operações: 0 sobreposições, 0 deadlocks, 0 exceções. [fonte: agenda/README.md]
  - Testes da última execução: API 199 (186 unit + 13 de propriedades), shared 4, web 33, integração 114 em 15 arquivos, E2E 13 (dos quais 4 de acessibilidade). [fonte: agenda/README.md]
  - Validador independente achou 2 falhas reais na fase de persistência (RN-17 burlado sob concorrência; instantes dependentes do fuso da sessão do PostgreSQL), ambas corrigidas. [fonte: agenda/README.md]
- **Não medido / limitações:** a API não tem build empacotado de produção (roda com SWC transpilando na carga; D-10, D-19). [fonte: agenda/README.md]
- **Stack:** Node 22, TypeScript 6.0, pnpm 10; NestJS 11, Prisma 7.10, PostgreSQL 17, Luxon 3.7, argon2; Next 16.4, React 19.3, TanStack Query 5, Tailwind 4.3, base-ui 1.9, next-intl 4, Zod 4.6, react-hook-form; Vitest 5, fast-check 4, Playwright 1.65 com axe-core. [fonte: agenda/README.md]
- **Links:**
  - Repositório: https://github.com/Felixdario/Pontual [fonte: git remote de agenda; api.github.com]
  - Demo: [EM CONSTRUÇÃO] (só local, `http://localhost:3000/b/navalha-e-cafe`) [fonte: agenda/README.md]
- **Capturas disponíveis** (em `agenda/docs/screenshots/`): `painel-detalhe.png`, `fluxo-horarios.png`, `fluxo-revisao.png`, `recusa-409.png`, `painel-agenda.png`, `dia-40-atendimentos.png`, `painel-escuro.png` [fonte: agenda/README.md; listagem de agenda/docs/screenshots]
  - Vídeo: [EM CONSTRUÇÃO] (nenhum encontrado)
- **Status:** publicado no GitHub; licença ainda não escolhida (sem arquivo de licença); último commit em 2026-11-09. [fonte: agenda/README.md; git log de agenda; api.github.com]

### 2.3 Pulo (pasta `encurtador`)

- **Nome:** Pulo [fonte: encurtador/README.md]
- **Frase-resumo:** Encurtador de URLs com analytics que conta cada clique humano uma vez, com robôs e prévias de WhatsApp à parte. [fonte: encurtador/README.md]
- **Problema:** contar cada clique humano uma vez, com robôs e prévias à parte, sem deixar o redirecionamento lento. [fonte: perfil-github/README.md]
- **Decisões técnicas:**
  - Slug aleatório de 7 caracteres base62 com `crypto.randomBytes`; a unicidade é decidida pelo índice único do Postgres com `ON CONFLICT`, sem `SELECT` antes (ADR 0001). [fonte: encurtador/README.md]
  - Redirect 302 por padrão, cache-aside com write-through sem corrida, cache negativo de 30 s, token bucket e `GET` num único script Lua (ADR 0002). [fonte: encurtador/README.md]
  - Pipeline exatamente uma vez com Redis Streams, worker idempotente pelo id do evento e agregados gravados na mesma instrução que a linha bruta (ADR 0003). [fonte: encurtador/README.md]
  - Dashboard lê só agregados, nunca faz `COUNT` na bruta (ADR 0006); bruta particionada por mês pela retenção (ADR 0005); BRIN e índice cobrindo rejeitados com número. [fonte: encurtador/README.md]
  - Privacidade (LGPD): o IP nunca é gravado; visitante vira HMAC-SHA256 com sal diário. [fonte: encurtador/README.md]
  - API com 27 operações em `/v1`, erros em `application/problem+json`, paginação por cursor, `Idempotency-Key`, ETag, escopos e rate limit. [fonte: encurtador/README.md]
- **O que demonstra:** IDs únicos sem coordenação, redirect rápido, pipeline exatamente uma vez e consultas sobre muitos cliques, cada um com ADR e número medido. [fonte: encurtador/README.md]
- **Números** (medidos numa máquina local de desenvolvimento: AMD Ryzen 5 5500, Windows 11, Postgres e Redis no Docker Desktop [fonte: encurtador/README.md]):
  - Redirect com cache: p95 de 6,42 ms e 10.129 req/s num processo. [fonte: encurtador/README.md]
  - Com 5 M de cliques, o painel de um link lê agregados em 0,19–0,59 ms quente, contra 28–122 ms do `COUNT` na bruta. [fonte: encurtador/README.md]
  - 4 workers processam 100.000 eventos em 12,7–14,6 s, sem deadlock em 7 rodadas. [fonte: encurtador/README.md]
  - Testes: 536 unitários, integração 42 + 34 + 25 + 68, consistência 8, E2E 17 (dos quais 10 de acessibilidade). [fonte: encurtador/README.md]
- **Não medido / limitações:**
  - A consistência (8 de 8) não foi rodada de novo na última fase; o número é o registrado em `docs/performance.md`. [fonte: encurtador/README.md]
  - A visão da conta fria leva 319 ms; ponto fraco declarado. [fonte: encurtador/README.md]
- **Stack:** Node 22, TypeScript 6.0, pnpm 10; Fastify 5, Drizzle ORM 0.45, postgres.js, ioredis, Zod 4, jose, argon2; PostgreSQL 16, Redis 7; React 19, Vite 8, TanStack Router e Query, Base UI, Recharts 3, d3-geo; Vitest 5, fast-check 4, Playwright 1.65 com axe-core, autocannon. [fonte: encurtador/README.md]
- **Links:**
  - Repositório: https://github.com/Felixdario/Pulo [fonte: git remote de encurtador; api.github.com]
  - Demo: [EM CONSTRUÇÃO] (só local, `http://localhost:5173`) [fonte: encurtador/README.md]
- **Capturas disponíveis** (em `encurtador/docs/screenshots/`, 18 arquivos [fonte: encurtador/README.md]): `link-5m-1440-claro.png` (captura do topo, pior caso com cerca de 5 M de cliques), `landing-1440-claro.png`, `landing-1440-escuro.png`, `landing-390-claro.png`, `landing-390-escuro.png`, `landing-erro-390-claro.png`, `dashboard-1440-claro.png`, `dashboard-1440-escuro.png`, `dashboard-390-claro.png`, `dashboard-390-escuro.png`, `link-1440-claro.png`, `link-1440-escuro.png`, `link-390-claro.png`, `link-390-escuro.png`, `chaves-1440-claro.png`, `chaves-1440-escuro.png`, `chaves-390-claro.png`, `chaves-390-escuro.png`; também `encurtador/docs/design/favicon.svg` [fonte: listagem de encurtador/docs]
  - Vídeo: [EM CONSTRUÇÃO] (nenhum encontrado)
- **Status:** publicado no GitHub; licença "a definir" (sem arquivo de licença); último commit em 2026-11-11. [fonte: encurtador/README.md; git log de encurtador; api.github.com]

### 2.4 Confere (pasta `curriculo`)

- **Nome:** Confere [fonte: curriculo/README.md]
- **Frase-resumo:** "Seu currículo, conferido." Cole a vaga, envie o currículo e veja cada requisito com o trecho que o comprova, ou a falta dele. [fonte: curriculo/README.md]
- **Problema:** dizer o quanto um currículo atende uma vaga sem que a IA invente competências, seja enganada por texto escondido ou pese nome, gênero e idade. [fonte: perfil-github/README.md]
- **Decisões técnicas:**
  - A nota é calculada em código, não pela IA: obrigatórios 70 %, desejáveis 20 %, senioridade 10 % (ADR 0003). [fonte: curriculo/README.md]
  - "Sem trecho, não conta": todo item extraído traz a citação literal do currículo, conferida no texto. [fonte: curriculo/README.md]
  - Anonimização antes da leitura (nome, e-mail, telefone, CPF, idade, gênero etc.) (ADR 0004). [fonte: curriculo/README.md]
  - Texto oculto no PDF achado desenhando cada página duas vezes com o pdfium, com e sem o texto. [fonte: curriculo/README.md]
  - Detector de instruções para a IA em português, inglês, espanhol e francês, com normalização (NFKC, homóglifos, leetspeak). [fonte: curriculo/README.md]
  - Modo demonstração por regras, sem chave e sem custo, por decisão de não gastar com a API (ADR 0006, D-46). [fonte: curriculo/README.md]
  - Modo recrutador com visão anonimizada e decisão sempre humana, com justificativa. [fonte: curriculo/README.md]
- **O que demonstra:** IA aplicada com evals versionadas, defesa contra prompt injection, anonimização e controle de viés; honestidade sobre o que não foi medido. [fonte: curriculo/README.md; perfil-github/README.md]
- **Números** (medem as regras e o código ao redor, sobre um dataset escrito pelo próprio autor; não medem um modelo de linguagem [fonte: curriculo/README.md]):
  - 30 casos fictícios nas evals (16 base, 8 contrafactuais, 6 de injection). [fonte: curriculo/README.md]
  - Detector de injection: 44 de 46 variantes detectadas, 0 falsos positivos em 89 frases legítimas. [fonte: curriculo/README.md]
  - Precisão / cobertura de competências com regras: 0,97 / 1,00; nota dentro da faixa em 93,8 % (15 de 16). [fonte: curriculo/README.md]
  - Diferença de nota nos contrafactuais (nome, gênero, idade): 0. [fonte: curriculo/README.md]
  - Dados pessoais anotados removidos: 100 % (204 de 204). [fonte: curriculo/README.md]
  - 835 testes rápidos (`make check`) e 36 testes de integração. [fonte: curriculo/README.md]
  - Taxonomia com 133 competências. [fonte: curriculo/README.md]
- **Não medido** (manter assim no site):
  - Precisão e cobertura da extração feita pelo modelo: não medidas. [fonte: curriculo/README.md]
  - Nota na faixa, resistência real a injection e diferença contrafactual com o modelo: não medidas. [fonte: curriculo/README.md]
  - Custo por análise, latência, acerto do prompt caching: não medidos. [fonte: curriculo/README.md]
  - Calibração dos limiares de similaridade: não feita (τ continua 0,85 e 0,70). [fonte: curriculo/README.md]
  - Teste com currículos reais de pessoas: não feito. [fonte: curriculo/README.md]
  - CI no GitHub: o README local diz que nunca rodou; o repositório foi publicado em 2026-11-18 e o resultado do primeiro CI ainda precisa ser conferido. [fonte: curriculo/README.md; curriculo/PROGRESSO.md]
- **Stack:** Python, FastAPI, SQLAlchemy 2, Alembic, arq, PostgreSQL com pgvector, Redis; Next.js 16 e React 19; pytest, ruff, mypy estrito, ESLint, Playwright e axe. [fonte: curriculo/README.md; perfil-github/README.md]
- **Links:**
  - Repositório: https://github.com/Felixdario/Confere [fonte: git remote de curriculo; api.github.com]
  - Demo: [EM CONSTRUÇÃO] (só local, `http://localhost:3010`) [fonte: curriculo/README.md]
- **Capturas disponíveis** (em `curriculo/docs/capturas/`): `landing.png`, `resultado.png`, `comparacao.png`, `recrutador.png`, `landing-exemplo.png` [fonte: curriculo/README.md; listagem de curriculo/docs/capturas]
  - Vídeo: [EM CONSTRUÇÃO] (nenhum encontrado)
- **Status:** 8 fases concluídas; publicado no GitHub em 2026-11-18; CI a conferir; sem arquivo de licença. [fonte: curriculo/PROGRESSO.md; api.github.com]

---

## 3. Competências

### Back-end
- Node.js e TypeScript — Sobra, Pontual, Pulo [fonte: financas/README.md; agenda/README.md; encurtador/README.md]; Epays e LUGARH [fonte: linkedin.pdf]
- Fastify — Sobra, Pulo [fonte: financas/README.md; encurtador/README.md]
- NestJS — Pontual [fonte: agenda/README.md]
- Python com FastAPI — Confere [fonte: curriculo/README.md]; SportLink API [fonte: perfil-github/README.md]
- Python com Starlette — prospecta [fonte: perfil-github/README.md]
- C#, ASP.NET MVC, Razor — BNE [fonte: linkedin.pdf]; C# também na Epays [fonte: linkedin.pdf]
- REST com OpenAPI/Swagger — Sobra, Pontual, Pulo, Confere [fonte: financas/README.md; agenda/README.md; encurtador/README.md; curriculo/README.md]; APIs REST no BNE [fonte: linkedin.pdf]
- SSE (eventos ao vivo) — Pulo, Confere [fonte: encurtador/README.md; curriculo/README.md]
- Filas: Redis Streams (Pulo), arq (Confere) [fonte: encurtador/README.md; curriculo/README.md]
- Autenticação: JWT curto + refresh rotativo com detecção de reuso, cookie httpOnly + CSRF — Sobra, Pulo, Confere [fonte: financas/README.md; encurtador/README.md; curriculo/README.md]
- Concorrência e idempotência (advisory locks, `EXCLUDE`, `Idempotency-Key`) — Pontual, Pulo [fonte: agenda/README.md; encurtador/README.md]
- OCR e extração de documentos — BNE, Floox [fonte: linkedin.pdf]
- Integrações com serviços de terceiros — BNE [fonte: linkedin.pdf]

### Front-end
- React — Sobra, Pontual, Pulo, Confere [fonte: financas/README.md; agenda/README.md; encurtador/README.md; curriculo/README.md]; Epays, LUGARH [fonte: linkedin.pdf]
- Biblioteca de componentes React com Vite — Epays [fonte: linkedin.pdf]
- Next.js — Pontual, Confere [fonte: agenda/README.md; curriculo/README.md]; SportLink web, Oceanic.ui [fonte: perfil-github/README.md]
- Vite — Sobra, Pulo [fonte: financas/README.md; encurtador/README.md]; Epays [fonte: linkedin.pdf]
- TanStack Query — Sobra, Pontual, Pulo [fonte: financas/README.md; agenda/README.md; encurtador/README.md]
- Tailwind CSS — Pontual [fonte: agenda/README.md]
- Material UI — LUGARH [fonte: linkedin.pdf]; Oceanic.ui [fonte: perfil-github/README.md]
- Sass — Epays [fonte: linkedin.pdf]
- Internacionalização (i18n) — Sobra (pt-BR/en-US), Pontual (pt-BR/en) [fonte: financas/README.md; agenda/README.md]; LUGARH (inglês, português e espanhol) [fonte: linkedin.pdf]
- Acessibilidade testada com axe (WCAG) — Sobra, Pontual, Pulo, Confere [fonte: financas/README.md; agenda/README.md; encurtador/README.md; curriculo/README.md]

### Mobile
- React Native e Expo — Sobra [fonte: financas/README.md]; SportLink mobile [fonte: perfil-github/README.md]
- React Native com fluxos offline e sincronização — Floox [fonte: linkedin.pdf]
- Flutter (projetos pessoais) — citado no LinkedIn [fonte: linkedin.pdf] [DECIDIDO: manter, como projetos pessoais, mesmo sem repositório nas fontes]

### IA aplicada
- Evals versionadas, defesa contra prompt injection, anonimização, embeddings locais, saída estruturada da API da Anthropic — Confere [fonte: perfil-github/README.md; curriculo/README.md]
  - Observação: o caminho com a API da Anthropic está escrito e testado sem rede, mas nunca rodou contra o modelo. [fonte: curriculo/README.md]
- Desenvolvimento com agentes de IA sob direção própria, com ADRs e testes — os quatro projetos [fonte: perfil-github/README.md]

### Banco de dados
- PostgreSQL — Pontual (`EXCLUDE USING gist`), Pulo (partição, índices medidos), Confere (pgvector) [fonte: agenda/README.md; encurtador/README.md; curriculo/README.md]; Epays [fonte: linkedin.pdf]
- SQL Server e modelagem relacional — BNE [fonte: linkedin.pdf]
- Prisma — Sobra, Pontual [fonte: financas/README.md; agenda/README.md]
- Drizzle — Pulo [fonte: encurtador/README.md]
- SQLAlchemy e Alembic — Confere [fonte: curriculo/README.md]
- Redis — Pulo, Confere [fonte: encurtador/README.md; curriculo/README.md]; Epays [fonte: linkedin.pdf]
- SQLite — Sobra [fonte: financas/README.md]

### Qualidade e testes
- Vitest — Sobra, Pontual, Pulo [fonte: financas/README.md; agenda/README.md; encurtador/README.md]
- Testes de propriedade com fast-check — Pontual, Pulo [fonte: agenda/README.md; encurtador/README.md]
- Playwright (E2E) — Pontual, Pulo, Confere [fonte: agenda/README.md; encurtador/README.md; curriculo/README.md]
- Testing Library e Jest (jest-expo) — Sobra [fonte: financas/README.md]
- pytest, ruff, mypy estrito — Confere [fonte: curriculo/README.md]
- hypothesis — listado no perfil do GitHub [fonte: perfil-github/README.md]
- Benchmark com autocannon e `EXPLAIN (ANALYZE, BUFFERS)` — Pulo [fonte: encurtador/README.md]

### DevOps
- GitHub Actions — Sobra, Pulo, Pontual [fonte: financas/README.md; encurtador/README.md; perfil-github/README.md]
- Docker Compose — Pontual, Pulo, Confere [fonte: agenda/README.md; encurtador/README.md; curriculo/README.md]; Docker na Epays [fonte: linkedin.pdf]
- Vercel — SportLink web, Oceanic.ui [fonte: perfil-github/README.md; api.github.com]

### Idiomas
- Português (nativo), inglês (profissional pleno), espanhol (profissional) [fonte: linkedin.pdf; perfil-github/README.md]

---

## 4. Sobre mim

### Linha do tempo

| Período | O quê | Onde | Fonte |
| - | - | - | - |
| 2022 – 2025 | Técnico em Informática (Information Technology Project Management) | IFPR, Colombo | [fonte: linkedin.pdf] |
| jan/2024 – out/2024 | Full-Stack Developer: C#, ASP.NET MVC, Razor, SQL Server, OCR, APIs REST, sistema de gestão de RH | BNE - Banco Nacional de Empregos, Curitiba | [fonte: linkedin.pdf] |
| set/2024 – dez/2024 | Front-End Developer: base de um app React Native do zero (navegação, autenticação, layouts), OCR, offline-first | Floox, Curitiba | [fonte: linkedin.pdf] |
| dez/2024 – fev/2025 | Front-End Developer: React com MUI, i18n em inglês, português e espanhol, integração com Node.js e API do BNE, suporte a clientes em inglês e espanhol | LUGARH, Curitiba e região | [fonte: linkedin.pdf] |
| fev/2025 – mai/2025 | Front-End Developer: novos fluxos no app React Native, extração de documentos, fluxos offline e sincronização | Floox, Colombo | [fonte: linkedin.pdf] |
| mai/2025 – ago/2025 | Front-End Developer: features e correções em apps React, integração com APIs REST | Epays, Colombo | [fonte: linkedin.pdf] |
| ago/2025 – hoje | Full-Stack Developer Junior: biblioteca de componentes React com Vite usada em produtos internos; contribui com o Epjota (fluxo de NFS-e e relatórios fiscais) | Epays, Colombo | [fonte: linkedin.pdf; perfil-github/README.md] |
| 2026 – 2028 (em andamento) | Análise e Desenvolvimento de Sistemas | PUCPR | [fonte: linkedin.pdf] |
| 2026 | Quatro projetos de portfólio: Sobra, Pontual, Pulo, Confere | GitHub | [fonte: git log dos quatro repositórios; api.github.com] |

Divergências entre as fontes [DECIDIDO: formação aparece só com anos; experiência mantém mês/ano]:
- IFPR: "2022–2025" no README do perfil, "fevereiro de 2022 - dezembro de 2025" no LinkedIn. [fonte: perfil-github/README.md; linkedin.pdf]
- PUCPR: "2026–2028" no README do perfil, "janeiro de 2026 - julho de 2028" no LinkedIn. [fonte: perfil-github/README.md; linkedin.pdf]

Outros projetos citados (fora dos quatro principais):
- SportLink: TCC do técnico no IFPR, com web em Next.js na Vercel, app em React Native com Expo e API em Python com FastAPI. [fonte: perfil-github/README.md]
- Oceanic.ui: site de design system em Next.js com Radix e Material UI, na Vercel. [fonte: perfil-github/README.md]
- prospecta: ferramenta em Python (Starlette e SQLite) que busca empresas pela API do Google Places. [fonte: perfil-github/README.md]

### Rascunho de texto pessoal (baseado só nas fontes) [DECIDIDO: versão curta abaixo; o histórico fica na linha do tempo]

Versão curta (a que vai para o site):

> Sou Eduardo Felix, desenvolvedor full-stack júnior em Curitiba e região. Trabalho na Epays, com
> uma biblioteca de componentes React usada em produtos internos e com o Epjota, fluxo de notas
> fiscais de serviço. Nos meus projetos de portfólio, dirijo agentes de IA, registro as decisões
> por escrito e escrevo testes que provam as garantias principais.

Versão longa (referência, não vai para o site):

> Sou Eduardo Felix, desenvolvedor full-stack júnior em Curitiba e região. Hoje trabalho na Epays,
> onde mantenho uma biblioteca de componentes React com Vite usada em produtos internos e contribuo
> com o Epjota, sistema de fluxo de notas fiscais de serviço. Antes, passei pelo back-end em C# no
> BNE, criei do zero a base de um app React Native na Floox e cuidei de internacionalização na
> LUGARH. Sou técnico em Informática pelo IFPR e curso Análise e Desenvolvimento de Sistemas na
> PUCPR.
>
> Nos meus quatro projetos de portfólio, trabalhei com agentes de IA sob a minha direção, registrei
> as decisões por escrito e escrevi testes que provam as garantias principais. Quando algo não foi
> medido, o README diz isso.

Fontes do rascunho: [fonte: perfil-github/README.md; linkedin.pdf; curriculo/README.md]

Não usado no rascunho, mas presente no LinkedIn (números da empresa, não do dono): Epays processa mais de 4 milhões de pagamentos de salário via Pix por mês, cerca de R$ 2 bilhões em folha, para mais de 750 clientes corporativos. [fonte: linkedin.pdf] [DECIDIDO: não usar no site]

---

## 5. Contato

- **E-mail:** eduardojosedario@gmail.com [fonte: linkedin.pdf; perfil-github/README.md]
- **GitHub:** https://github.com/Felixdario [fonte: linkedin.pdf; api.github.com]
- **LinkedIn:** https://www.linkedin.com/in/felixdariodev/ [fonte: linkedin.pdf; perfil-github/README.md]
- **Localização:** Curitiba e região, Paraná [fonte: perfil-github/README.md] [DECIDIDO]
- Telefone: não consta nas fontes; não incluir.
- Currículo em PDF para download: [DECIDIDO: o PDF exportado do LinkedIn; hoje ele está no `.gitignore`, então na construção será preciso decidir como publicá-lo (ex.: copiar para a pasta pública do site)]

---

## 6. Decisões do dono (2026-11-18) e pendências

### Decidido
1. Função: "Desenvolvedor full-stack júnior: APIs em Node.js e TypeScript, interfaces em React e apps em React Native."
2. Localização: "Curitiba e região, Paraná".
3. Formação só com anos (IFPR 2022–2025, PUCPR 2026–2028); experiência mantém mês/ano.
4. Ordem dos projetos: Sobra, Pontual, Pulo, Confere.
5. Sem demo ao vivo: cada projeto mostra repositório + capturas. O link de demo não aparece até existir.
6. Vídeos/GIFs: não há; o site não depende deles.
7. Capas: Sobra `web/painel-outubro-claro-desktop.png`; Pontual `painel-detalhe.png`; Pulo `link-5m-1440-claro.png`; Confere `landing-exemplo.png`.
8. Capturas copiadas para dentro de `portfolio/` (e otimizadas na construção), não apontadas para `raw.githubusercontent.com`.
9. Licença: MIT em todos. Pontual, Pulo e Confere precisam receber o arquivo MIT nos próprios repositórios antes da divulgação.
12. Flutter: manter nas competências, como projetos pessoais.
13. Números da Epays: não usar.
14. Sem foto pessoal no site. Currículo para download = PDF do LinkedIn.
15. Site em português e inglês desde o início.
- "Sobre mim": versão curta (seção 4); o histórico fica na linha do tempo.

### Ainda em aberto (fora deste repositório, antes de divulgar)
10. Confere: README local ainda diz que o repositório "nunca foi enviado", mas ele foi publicado em 2026-11-18; o repositório local está 1 commit à frente do remoto e o primeiro CI precisa ser conferido. [fonte: curriculo/README.md; curriculo/PROGRESSO.md; git status de curriculo]
11. Sobra: o README remete a uma seção "Limitações conhecidas" que não existe mais no arquivo (link quebrado interno). [fonte: financas/README.md]
16. O `perfil-github/docs/links.txt` ainda lista `github.com/Felixdario/Agenda` (respondendo 200); o repositório público chama-se Pontual e o README do perfil já usa Pontual. No site, usar só `github.com/Felixdario/Pontual`. [fonte: perfil-github/docs/links.txt; perfil-github/README.md; api.github.com]
- Adicionar licença MIT a Pontual, Pulo e Confere (item 9).
- Tradução para o inglês do conteúdo (item 15): feita na construção, a partir deste arquivo.
