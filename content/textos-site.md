# Textos do site (PT e EN)

Fase 2, 2026-11-18. Redação final dos textos que aparecem no site, feita a partir de `content/conteudo.md`.
Os números e fatos vêm de lá (com as fontes). Nada aqui é novo: se um fato mudar, mude primeiro o `conteudo.md`.
Os mesmos textos estão nas pranchetas "Fase 2" do canvas.

Regras de redação: frases curtas, sem jargão de marketing, sem "apaixonado por". Quando um número tem ressalva, a
ressalva vai junto (asterisco no Confere). O inglês é tradução livre, não literal.

---

## Comum

| Chave | PT | EN |
| - | - | - |
| `lugar` | Curitiba e região, PR | Curitiba area, Brazil |
| `idioma` | EN | PT |
| `tema.claro` | Usar tema claro | Use light theme |
| `tema.escuro` | Usar tema escuro | Use dark theme |
| `menu` | Menu | Menu |
| `nav.projetos` | Projetos | Projects |
| `nav.sobre` | Sobre | About |
| `nav.contato` | Contato | Contact |

## Hero

| Chave | PT | EN |
| - | - | - |
| `hero.nome` | Eduardo Felix | Eduardo Felix |
| `hero.frase` | Desenvolvedor full-stack júnior. APIs em Node.js e TypeScript, interfaces em React, apps em React Native, e um teste para cada garantia. | Junior full-stack developer. APIs in Node.js and TypeScript, interfaces in React, apps in React Native, and a test for every guarantee. |
| `hero.frase.curta` (celular) | Desenvolvedor full-stack júnior: Node.js, React e React Native, com um teste para cada garantia. | Junior full-stack developer: Node.js, React and React Native, with a test for every guarantee. |
| `hero.link.projetos` | → ver projetos | → see projects |
| `hero.link.sobre` | → sobre mim | → about me |

## Projetos (home)

| Chave | PT | EN |
| - | - | - |
| `pj.titulo` | Projetos | Projects |
| `pj.intro` | Quatro projetos de 2026. Cada um promete uma coisa, e um teste prova que ela vale. | Four projects from 2026. Each one makes a promise, and a test proves it holds. |
| `pj.ver` | → ver o projeto | → view project |
| `pj.repo` | → repositório | → repository |

### Sobra

| Chave | PT | EN |
| - | - | - |
| `kicker` | 01 · finanças pessoais | 01 · personal finance |
| `numero` | 1087 | 1087 |
| `numero.legenda` | testes passando | tests passing |
| `frase` | Controle financeiro pessoal: o app mobile lança o gasto na hora, e o painel web mostra para onde foi o dinheiro do mês. | Personal finance: the mobile app logs a purchase on the spot, and the web dashboard shows where the month's money went. |
| `garantia` | Dinheiro guardado em centavos inteiros. Nada passa por float. | Money stored as whole cents. Nothing goes through a float. |
| `stack` | TypeScript · Fastify · Prisma · React · Expo | (igual) |
| `capa.alt` | Painel web do Sobra com o resumo de outubro | Sobra's web dashboard with the October summary |

### Pontual

| Chave | PT | EN |
| - | - | - |
| `kicker` | 02 · agendamento online | 02 · online booking |
| `numero` | 20→1 | 20→1 |
| `numero.legenda` | 20 pedidos no mesmo horário, 1 reserva | 20 requests for the same slot, 1 booking |
| `frase` | Agendamento para barbearias, salões e clínicas: o cliente reserva pelo celular e o estabelecimento acompanha num painel. | Booking for barbershops, salons and clinics: customers book from their phone and the business follows along on a dashboard. |
| `garantia` | O mesmo horário nunca é marcado duas vezes, nem quando dois clientes confirmam juntos. | The same slot is never booked twice, even when two customers confirm at once. |
| `stack` | NestJS · PostgreSQL · Prisma · Next.js | (igual) |
| `capa.alt` | Painel do Pontual com o detalhe de um agendamento | Pontual's dashboard showing one appointment in detail |

### Pulo

| Chave | PT | EN |
| - | - | - |
| `kicker` | 03 · encurtador de links | 03 · link shortener |
| `numero` | 6,42 ms | 6.42 ms |
| `numero.legenda` | p95 do redirect com cache | cached redirect, p95 |
| `frase` | Encurtador de URLs com analytics, sem deixar o redirecionamento lento. | A URL shortener with analytics that keeps redirects fast. |
| `garantia` | Cada clique humano é contado uma vez. Robôs e prévias do WhatsApp ficam à parte. | Every human click is counted once. Bots and WhatsApp previews are kept apart. |
| `stack` | Fastify · Redis Streams · PostgreSQL · React | (igual) |
| `capa.alt` | Página de um link do Pulo com cerca de 5 milhões de cliques | A Pulo link page with about 5 million clicks |
| `ressalva` | Medido numa máquina local de desenvolvimento. | Measured on a local development machine. |

### Confere

| Chave | PT | EN |
| - | - | - |
| `kicker` | 04 · currículos com IA | 04 · AI résumé checker |
| `numero` | 0 | 0 |
| `numero.legenda` | de diferença na nota ao trocar nome, gênero ou idade* | score difference when name, gender or age change* |
| `frase` | Cole a vaga, envie o currículo e veja cada requisito com o trecho que o comprova, ou a falta dele. | Paste the job post, upload the résumé and see each requirement next to the passage that proves it, or the lack of one. |
| `garantia` | Sem trecho, não conta. A nota é calculada em código, não pela IA. | No quote, no credit. The score is computed in code, not by the AI. |
| `ressalva` | *Medido nas regras, com casos fictícios escritos pelo autor. Não mede um modelo de linguagem. | *Measured on the rules, with fictional cases written by the author. It does not measure a language model. |
| `stack` | Python · FastAPI · pgvector · Next.js | (igual) |
| `capa.alt` | Página inicial do Confere com um exemplo de análise | Confere's home page with a sample analysis |

## Página de projeto (modelo: Pontual)

As outras três páginas seguem a mesma ordem: cabeçalho, garantia com demonstração, "como", números, capturas,
"não medido", stack e próximo projeto. As demonstrações delas ficam para a construção (ver `docs/estrutura.md`).

| Chave | PT | EN |
| - | - | - |
| `voltar` | ← todos os projetos | ← all projects |
| `meta` | 02 · agendamento online · 2026 | 02 · online booking · 2026 |
| `resumo` | Agendamento online que não deixa marcar duas vezes o mesmo horário. O cliente reserva sozinho pelo celular, e a barbearia, o salão ou a clínica acompanha a agenda num painel. | Online booking that never lets the same slot be taken twice. Customers book on their own from their phone, and the barbershop, salon or clinic follows the schedule on a dashboard. |
| `papel.rotulo` / `papel` | Papel / direção dos agentes de IA, regras, revisão e testes | Role / directing the AI agents, rules, review and tests |
| `codigo.rotulo` | Código | Code |
| `demo.rotulo` / `demo` | Demo / roda localmente, com conta demo e dados fictícios | Demo / runs locally, with a demo account and fictional data |
| `licenca.rotulo` | Licença | License |
| `garantia.rotulo` | A garantia | The guarantee |
| `garantia.titulo` | 20 pedidos para o mesmo horário. 1 reserva. | 20 requests for the same slot. 1 booking. |
| `demo.botao` | Enviar os 20 pedidos | Send the 20 requests |
| `demo.botao.rodando` | Enviando… | Sending… |
| `demo.botao.de-novo` | Enviar de novo | Send again |
| `demo.antes` | Aperte o botão para mandar os 20 pedidos juntos. | Press the button to send all 20 requests at once. |
| `demo.durante` | Os 20 pedidos chegam ao mesmo tempo… | All 20 requests arrive at the same moment… |
| `demo.depois` | 1 reserva confirmada. 19 pedidos recusados com 409 HORARIO_INDISPONIVEL. | 1 booking confirmed. 19 requests refused with 409 HORARIO_INDISPONIVEL. |
| `demo.esquerda` | 20 clientes confirmam juntos | 20 customers confirm together |
| `demo.direita` | recusados com 409 e 5 horários livres | refused with a 409 and 5 open slots |
| `demo.prova` | No teste de integração, os 20 pedidos chegam ao PostgreSQL ao mesmo tempo, em 10 rodadas. Todas terminam com 1 reserva e 19 recusas. | In the integration test, the 20 requests hit PostgreSQL at the same time, over 10 rounds. Every round ends with 1 booking and 19 refusals. |
| `como.rotulo` / `como.titulo` | Como / Barrado em três camadas | How / Blocked at three layers |
| `como.1` | **Domínio puro.** As regras recebem o "agora" como parâmetro. Cada caso de borda vira um teste que dá sempre o mesmo resultado. | **Pure domain.** The rules take "now" as a parameter, so every edge case becomes a test with the same result every time. |
| `como.2` | **Trava na transação.** Antes de ler a agenda, a transação pega uma trava por profissional e por cliente (`pg_advisory_xact_lock`). | **Lock in the transaction.** Before reading the schedule, the transaction takes a lock per professional and per customer (`pg_advisory_xact_lock`). |
| `como.3` | **Regra no próprio banco.** Uma constraint `EXCLUDE USING gist` no PostgreSQL, escrita à mão numa migration, porque o Prisma não modela esse tipo. | **A rule in the database itself.** An `EXCLUDE USING gist` constraint in PostgreSQL, hand-written in a migration because Prisma can't model it. |
| `num.1` | **0** sobreposições e 0 deadlocks em 15 rodadas de 40 operações misturadas | **0** overlaps and 0 deadlocks across 15 rounds of 40 mixed operations |
| `num.2` | **24** regras de negócio, cada uma ligada aos testes que a cobrem | **24** business rules, each linked to the tests that cover it |
| `num.3` | **363** testes: 199 da API, 4 shared, 33 web, 114 de integração e 13 E2E | **363** tests: 199 API, 4 shared, 33 web, 114 integration and 13 E2E |
| `num.4` | **2** falhas reais achadas por um validador independente, as duas corrigidas | **2** real bugs found by an independent validator, both fixed |
| `nao-medido` | **Não medido:** a API não tem build de produção empacotado; roda com SWC transpilando na carga. | **Not measured:** the API has no bundled production build; it runs with SWC transpiling on load. |
| `proximo` | Próximo: Pulo → | Next: Pulo → |
| `capturas.alt` | Painel do estabelecimento com a agenda do dia · Cliente escolhendo um horário pelo celular · Recusa de horário indisponível com sugestões de outros horários | The business dashboard with the day's schedule · A customer picking a slot on their phone · An unavailable-slot refusal suggesting other times |

## Sobre

| Chave | PT | EN |
| - | - | - |
| `so.titulo` | Sobre | About |
| `so.texto.1` | Sou Eduardo Felix, desenvolvedor full-stack júnior em Curitiba e região. Trabalho na Epays, com uma biblioteca de componentes React usada em produtos internos e com o Epjota, fluxo de notas fiscais de serviço. | I'm Eduardo Felix, a junior full-stack developer in the Curitiba area, Brazil. I work at Epays, on a React component library used across internal products and on Epjota, a service-invoice (NFS-e) workflow. |
| `so.texto.2` | Nos meus projetos de portfólio, dirijo agentes de IA, registro as decisões por escrito e escrevo testes que provam as garantias principais. Quando algo não foi medido, o README diz. | In my portfolio projects I direct AI agents, write down every decision and write tests that prove the main guarantees. When something wasn't measured, the README says so. |
| `so.uso` | O que uso | What I use |
| `so.uso.backend` | Node.js, TypeScript, Fastify, NestJS, Python com FastAPI, C# e ASP.NET | Node.js, TypeScript, Fastify, NestJS, Python with FastAPI, C# and ASP.NET |
| `so.uso.frontend` | React, Next.js, Vite, TanStack Query, Tailwind, i18n, acessibilidade testada com axe | React, Next.js, Vite, TanStack Query, Tailwind, i18n, accessibility tested with axe |
| `so.uso.mobile` | React Native e Expo; Flutter em projetos pessoais | React Native and Expo; Flutter in personal projects |
| `so.uso.dados` | PostgreSQL, Redis, Prisma, Drizzle, SQLAlchemy, SQL Server | (igual) |
| `so.uso.testes` | Vitest, fast-check, Playwright, Testing Library, pytest | (igual) |
| `so.uso.ia` | evals versionadas, defesa contra prompt injection, anonimização | versioned evals, prompt-injection defense, anonymization |
| `so.uso.idiomas` | português nativo, inglês profissional pleno, espanhol profissional | Portuguese (native), English (full professional), Spanish (professional) |
| `so.trabalho` | Trabalho | Work |
| `so.formacao` | Formação | Education |

Linha do tempo (o EN troca os meses por abreviações em inglês: aug 2025 – now etc.):

| PT | EN |
| - | - |
| ago/2025 – hoje · **Epays** · full-stack júnior | Aug 2025 – now · **Epays** · junior full-stack |
| mai/2025 – ago/2025 · **Epays** · front-end | May 2025 – Aug 2025 · **Epays** · front-end |
| fev/2025 – mai/2025 · **Floox** · front-end, app React Native | Feb 2025 – May 2025 · **Floox** · front-end, React Native app |
| dez/2024 – fev/2025 · **LUGARH** · front-end, React e i18n | Dec 2024 – Feb 2025 · **LUGARH** · front-end, React and i18n |
| set/2024 – dez/2024 · **Floox** · front-end, base do app do zero | Sep 2024 – Dec 2024 · **Floox** · front-end, app foundation from scratch |
| jan/2024 – out/2024 · **BNE** · full-stack, C# e SQL Server | Jan 2024 – Oct 2024 · **BNE** · full-stack, C# and SQL Server |
| 2026 – 2028 · **PUCPR** · Análise e Desenvolvimento de Sistemas, em andamento | 2026 – 2028 · **PUCPR** · Systems Analysis and Development, in progress |
| 2022 – 2025 · **IFPR** · Técnico em Informática | 2022 – 2025 · **IFPR** · IT technical degree |

## Contato e rodapé

| Chave | PT | EN |
| - | - | - |
| `ct.titulo` | Contato | Contact |
| `ct.email` | (o e-mail de `conteudo.md`, seção 5) | (igual) |
| `ct.github` | → GitHub | → GitHub |
| `ct.linkedin` | → LinkedIn | → LinkedIn |
| `ct.cv` | → currículo em PDF (PT) | → résumé in PDF (EN) |
| `rodape.assinatura` | Eduardo Felix · Curitiba e região, PR · 2026 | Eduardo Felix · Curitiba area, Brazil · 2026 |
| `rodape.site` | Site em Next.js, estático. Código no GitHub | Static site built with Next.js. Code on GitHub |
| `rodape.topo` | voltar ao topo ↑ | back to top ↑ |

Os dois PDFs de currículo continuam `[EM CONSTRUÇÃO]`: o link aparece só quando o arquivo existir.
