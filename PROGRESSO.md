# Progresso do portfólio

Modo econômico: uma fase por sessão. Para retomar, abra uma sessão nesta pasta e diga "continue pelo PROGRESSO.md".

## Fase 0 — Coleta (concluída em 2026-11-18)

### Feito
- `content/conteudo.md`: identidade, os 4 projetos (Sobra, Pontual, Pulo, Confere), competências ligadas aos projetos, linha do tempo, contato e 16 pendências. Toda afirmação tem a fonte entre colchetes.
- `docs/referencias.md` + `docs/referencias/`: capturas desktop, celular e desktop longa de Vanholtz e Sternlicht, uma captura do hero do Sharlee feita com GPU, e os princípios em comum.
- `linkedin.pdf`: perfil exportado. Está no `.gitignore` (dados pessoais), então não vai para o repositório.

### Decisões
- O portfólio fica em `C:\Users\eduar\portfolio`, com repositório git próprio e separado dos 4 projetos.
- GitHub de origem: Felixdario.
- Marcadores do conteúdo: `[fonte: ...]`, `[EM CONSTRUÇÃO]` e `[PENDENTE: ...]`.
- Para checar mojibake, use `grep -c 'Ã[^O]\|â€\|Â'`. O `Ã` sozinho também acusa a palavra "CONSTRUÇÃO".

### Bloqueios e limites
- Sharlee: em headless, a captura mostra só o preloader. No navegador com GPU, o conteúdo só aparece depois de uma interação. Scroll, páginas internas e celular não foram vistos.
- Nenhum projeto tem demo publicada. Todos os links de demo estão `[EM CONSTRUÇÃO]`.

## Revisão do conteúdo pelo dono (concluída em 2026-11-18)

### Feito
- Todas as `[PENDENTE]` de `content/conteudo.md` foram respondidas pelo dono e marcadas como `[DECIDIDO: ...]`. O resumo fica na seção 6 do arquivo.
- O "Sobre mim" ganhou uma versão curta (é a que vai para o site). A versão longa ficou como referência.

### Decisões
- Função: opção 1 ("APIs em Node.js e TypeScript, interfaces em React e apps em React Native").
- Localização: Curitiba e região, PR.
- Ordem dos projetos: Sobra, Pontual, Pulo, Confere.
- Formação aparece só com anos.
- Flutter continua nas competências.
- Os números da Epays não entram.
- Sem demos ao vivo: cada projeto mostra repositório e capturas, com as capas sugeridas copiadas para dentro de `portfolio/`.
- Sem foto. O currículo para download será um currículo próprio (PDF em PT e EN, sem foto), feito a partir de `content/conteudo.md`; o PDF do LinkedIn não é usado no site.
- Site em PT e EN desde o início.
- Licença MIT em todos os projetos.

### Fora deste repositório (antes de divulgar)
- Adicionar MIT a Pontual, Pulo e Confere.
- Confere: atualizar o README ("nunca foi enviado"), enviar o commit pendente e conferir o CI.
- Sobra: corrigir o link interno para "Limitações conhecidas".
- `perfil-github/docs/links.txt`: trocar Agenda por Pontual.

### Como verificar
- `grep -n "PENDENTE" content/conteudo.md` deve achar só a linha da convenção (linha 9).
- `grep -c 'Ã[^O]\|â€\|Â' content/conteudo.md` deve dar 0.

## Fase 1 — Design: duas direções (concluída em 2026-11-18, aguardando a escolha do dono)

### Feito
- `docs/direcoes.md`: duas direções com tipografia, paleta, composição, "coisa viva", movimento e riscos.
  - **A. Instrumento quieto:** EB Garamond, cinza frio + cobalto, coluna estreita; demonstração "20 pedidos → 1 reserva".
  - **B. Palco dividido:** Work Sans, verde-preto + osso + jade, captura do projeto fixa à direita e índice que troca o palco.
- `docs/direcoes/a-instrumento.html` e `b-palco.html`: hero de cada uma, com o seletor PT/EN funcionando, e capturas em 1440x900 e 390x844.
- `.taste-skill/`: as folhas de direção sorteadas pelo `draw.mjs` (para reimprimir: `draw.mjs --show`).
- **Prévia no Claude Design** (o dono prefere ver por aí, não pelo HTML): https://claude.ai/artifact/RMdAvcdDbUFF1qm6bAPZfq. Canvas privado com 4 pranchetas (A e B, desktop 1440x900 e celular 390x844) e uma nota por direção. A demonstração dos 20 pedidos e o índice que troca o palco funcionam no modo Play. As próximas prévias de design vão para lá.

### Decisões
- A ideia comum: cada projeto tem uma garantia e o teste que a prova. Veio dos números de `content/conteudo.md`.
- A terceira direção sorteada (*dark-room*) ficou de fora porque depende de fotos, e o portfólio só tem capturas de tela.
- `impeccable` não foi carregada (modo econômico).

### Bloqueios e limites
- O gate (`inspect.mjs`, `lint.mjs`) não rodou nos rascunhos. Fica para a página final.
- No Chrome headless, `--window-size=390` renderiza com ~500px. Para a captura de celular, use um iframe de 390px.

### Revisão do dono (2026-11-18)
- O dono **rejeitou A e B** e pediu para seguir o padrão do Sharlee (https://itssharl.ee/): formas 3D orgânicas em tons pastel, fundo claro com grão, título largo em caixa-alta misturando contorno e preenchimento, subtítulo curto e dois links com seta.
- Foi criada a **direção C, Formas orgânicas**, no mesmo canvas (primeira linha): Unbounded + Nunito, tubos pastel em SVG com reflexos, grão, parallax das formas com o mouse e alternância de tema claro/escuro. Formas, monograma e textos são próprios. A e B continuam no canvas só como histórico.
- Isso contraria regras da `design-taste-frontend` (sem gradientes, centralizado), mas a preferência explícita do dono vale mais.
- **Segunda revisão:** o dono achou a C uma cópia do Sharlee. Ele quer a mesma *sensação* (fluida, macia, viva com o mouse), não as mesmas formas nem o mesmo layout. A C foi refeita como **"Lâmpada de lava"**:
  - cada projeto é uma gota de líquido colorido (Sobra lima, Pontual rosa, Pulo água, Confere lavanda) que flutua e se funde com as outras (filtro SVG "gooey");
  - o cursor é uma gota que gruda nas outras, e passar o mouse num projeto faz a gota dele crescer e ir ao centro;
  - o nome "Eduardo Felix" fica enorme (Bricolage Grotesque 800) e inverte de cor onde o líquido passa (`mix-blend-mode: difference`);
  - fundo noturno com grão, com alternância para o tema claro. Textos em Nunito.

- **Aprovada:** em 2026-11-18 o dono aprovou a direção C, "Lâmpada de lava". A e B ficam no canvas só como histórico.

## Fase 2 — Estrutura e stack (concluída em 2026-11-18, aguardando a revisão do dono)

### Feito
- **Canvas** (mesmo link da Fase 1), nova linha no topo, "Fase 2 · Lâmpada de lava no resto do site", com 4 pranchetas interativas (modo Play):
  - Projetos (home), desktop: cada projeto é uma linha com a sua gota e, dentro dela, o número da garantia (1087, 20→1, 6,42 ms, 0*). Hover/foco faz a gota crescer e engolir as gotinhas.
  - Página de projeto do Pontual, desktop: demonstração "Enviar os 20 pedidos" com gotas (1 se funde no horário, 19 voltam cinzas), 3 camadas, 4 números, 3 capturas, "não medido" e próximo projeto.
  - Sobre, contato e rodapé, desktop: o e-mail é o maior texto; o cursor vira gota.
  - Celular (390 px) com projetos, sobre e contato empilhados.
- As capturas foram enviadas ao canvas. As 3 do Pontual (`painel-detalhe`, `fluxo-horarios`, `painel-agenda`) foram copiadas para `docs/direcoes/img/pontual-*.png`.
- `content/textos-site.md`: todos os textos do site em PT e EN, por chave.
- `docs/estrutura.md`: mapa do site, demonstrações das outras 3 páginas de projeto, stack e fallback da animação.

### Decisões
- Stack: Next.js 16 com `output: 'export'`, TypeScript estrito, CSS Modules, textos em `src/i18n/pt.ts` e `en.ts` sem biblioteca de i18n, `next/font`, imagens WebP geradas com `sharp`, Vitest + Playwright com axe.
- Rotas: `/` e `/projetos/<slug>` em PT; `/en/` e `/en/projects/<slug>` em EN.
- Fallback: sem JS, as gotas ficam paradas e a demonstração mostra o resultado final; com movimento reduzido, nada flutua.
- O asterisco do Confere ("medido nas regras, com casos fictícios") aparece junto do número, sempre.

### Bloqueios e limites
- As pranchetas não foram conferidas em captura (a regra do canvas é não renderizar sem o dono pedir). Pode haver texto cortado ou sobreposto, sobretudo no celular (altura estimada em 2800 px).
- Só a página do Pontual foi desenhada; as outras três estão descritas em `docs/estrutura.md`.
- O caso "R$ 100 em 3 parcelas" do Sobra precisa ser conferido nos testes do projeto antes de virar demonstração.

### Revisão do dono (2026-11-18)
- O dono gostou das pranchetas e pediu para incluir o trabalho e o TCC. Foi criada a prancheta **Trabalho e TCC (home)**, à direita da nota da Fase 2: Epays (biblioteca de componentes React e Epjota, gota âmbar) e SportLink, o TCC do IFPR (web, app e API em três gotas coral, com o botão "Ver o SportLink no ar"). O celular ganhou a mesma seção (altura agora 3700 px). No Sobre, o rótulo "Trabalho" virou "Trajetória".
- Textos em `content/textos-site.md` (seção "Trabalho e TCC"); fatos do SportLink em `content/conteudo.md` (seção 4).

### Revisão final da Fase 2 (2026-11-18)
- Números e fatos conferidos nos READMEs e testes dos projetos; todos batem.
- Corrigido: demonstração do Sobra (R$ 10,00 em 3 → 3,34 + 3,33 + 3,33, caso real de `allocate`), demonstração do Pulo (teste "crash entre o COMMIT e o XACK") e a linha "Papel" do Pontual.
- **Checagem visual das pranchetas: pulada a pedido do dono** (o canvas exige login no navegador do app). Pode haver texto cortado, sobretudo no celular; a checagem fica para a página construída na Fase 3, com Playwright e o gate.

### Hospedagem (decidida em 2026-11-18)
- **Vercel**, servindo o export estático (`out/`).

### Próximo passo
1. Revisão do dono no canvas: feita.
2. Fase 3: feita (abaixo).

## Fase 3 — Construção (concluída em 2026-11-18, aguardando a revisão do dono)

### Feito
- Projeto Next.js 16.4 na raiz, com `output: 'export'` e `trailingSlash`: 12 páginas estáticas em `out/`
  (`/`, `/en/`, `/projetos/<slug>/`, `/en/projects/<slug>/`). TypeScript 6 estrito, CSS Modules, sem Tailwind.
- Textos em `src/i18n/pt.ts` e `en.ts`, com o mesmo tipo (`src/i18n/tipos.ts`). Dados fixos em `src/data/projetos.ts`.
- Lâmpada de lava: um laço só (`src/lava/motor.ts`, ~30 fps), que pausa com a aba oculta e quando a cena sai da tela.
  Cenas: hero (gotas dos projetos, cursor-gota, hover/foco na lista), linhas de projeto, Epays e SportLink, contato,
  cabeçalho de cada página de projeto.
- Quatro demonstrações, cada uma ligada a um teste real (detalhes em `content/textos-site.md`, seção "Fase 3"):
  Sobra (R$ 10,00 em 3), Pontual (20 pedidos → 1 reserva), Pulo (worker cai entre COMMIT e XACK), Confere (4 versões → 78).
  No celular, cada palco troca para um layout vertical.
- Fallback: sem JS, o HTML traz as gotas paradas e cada demonstração no estado final; com movimento reduzido, nada
  flutua e o botão pula para o resultado. As entradas das seções (`data-entra`) só escondem quando há JS.
- Tema escuro por padrão, claro no botão, salvo em `localStorage` e aplicado antes da pintura.
- Capturas: copiadas para `assets/capturas/<projeto>/` (PNG original) e convertidas por `npm run imagens`
  (`scripts/imagens.mjs`, sharp) para `public/img/*.webp`. Quatro por página (Confere: capa + 3).
- Testes: `npm test` (Vitest, 9 testes: mesmas chaves PT/EN, sem mojibake, alt por captura, asterisco do Confere,
  imagens existentes, repositórios certos) e `npm run e2e` (Playwright com o Chrome instalado, 52 testes: axe em
  10 páginas × claro/escuro × 1440/390 px, sem rolagem lateral, imagens carregadas, sem erros no console,
  hreflang e seletor de idioma, demonstração, movimento reduzido, sem JS, tema salvo, menu). Tudo passando.
- Servidor estático para conferir o export: `npm run serve` (http://localhost:4321) e `.claude/launch.json`.
- Capturas de conferência: `tests/visual/capturar.mjs` e `tests/visual/demo.mjs` (roda cada demonstração até o fim).

### Gate da design-taste-frontend
- `lint.mjs src`: 0 FAIL, 0 WARN (com exceções marcadas `taste-skill-ignore`, todas justificadas na linha).
- `inspect.mjs` (home e as 4 páginas): restam só 2 FAIL, os dois **do design aprovado nas pranchetas**:
  os kickers ("01 · finanças pessoais", "A garantia", "Como") e os fios entre as linhas de projeto, trajetória e números.
  Removê-los muda a direção aprovada; fica para o dono decidir.
- WARN que ficam, com a defesa: tinta osso #ece9e1 (é a da direção C), nome e e-mail com `mix-blend-mode: difference`
  (é o efeito central da lâmpada de lava), sem vídeo (não existe gravação dos projetos), monospace só em `<code>`,
  muitos tamanhos de fonte, margem direita de 30 px em 768 px (o nome gigante em 15vw chega perto da borda).
- Corrigido por causa do gate: Trabalho e Sobre em uma coluna até 1000 px (o título quebrava em 3 linhas em 768),
  texto mínimo de 13 px, títulos da garantia encurtados, quarta captura por página, entradas das seções,
  símbolos ✓/✕ trocados (o ✕ do menu virou ícone SVG).

### Decisões
- Duas raízes de layout (`app/(pt)` e `app/(en)`) para o `<html lang>` certo em cada idioma, sem biblioteca de i18n.
- Links dos currículos em PDF e "Código no GitHub" do rodapé só aparecem quando existirem
  (`CURRICULO` e `REPO_DO_SITE` em `src/data/projetos.ts`; `CURRICULO` ainda é `null`).
- `SITE_URL` (variável de ambiente) define o domínio do canonical e do hreflang; sem ela, usa localhost.

### Bloqueios e limites
- Não testado em aparelho real nem em Safari/Firefox (só Chrome no Windows, emulando 390 px).
- Desempenho do filtro gooey não foi medido (o risco de >8 ms por quadro em tela grande continua em aberto).
- Publicado em https://eduardofelixdev.vercel.app; o repositório está em https://github.com/Felixdario/portifolio.

### Antes de publicar
1. Revisão do dono no site (`npm run build` e `npm run serve`), sobretudo kickers e fios (ver o gate).
2. Criar o repositório no GitHub, ligar na Vercel (framework Next.js, saída `out/`) e definir `SITE_URL`;
   (`REPO_DO_SITE` já aponta para o repositório.)
3. Fazer os currículos em PDF (PT e EN), pôr em `public/` e preencher `CURRICULO`.
4. Pendências fora deste repositório (seção "Fora deste repositório"): MIT em Pontual, Pulo e Confere (o site já diz MIT), README do Confere, link do Sobra, links.txt.
5. Conferir de novo os números nos READMEs dos projetos.

## Publicação dos 4 projetos (concluída em 2026-11-22, tudo em planos grátis)

| Projeto | Site (Vercel) | API (Render, plano Free) | Banco e fila |
| - | - | - | - |
| Pontual | https://pontual-zeta.vercel.app/b/navalha-e-cafe | pontual-api-88zx.onrender.com | Neon `pontual` |
| Sobra | https://sobra-chi.vercel.app | sobra-api.onrender.com | SQLite no Render (recriado a cada início) |
| Confere | https://confere-six.vercel.app | confere-api-uo27.onrender.com (API + worker arq) | Neon `confere` + Upstash Redis `confere` |
| Pulo | https://pulo-two.vercel.app | pulo-api-h6ex.onrender.com e pulo-redirect.onrender.com (redirect + worker) | Neon `pulo` + Render Key Value `pulo-kv` |

- Os bancos Neon foram criados pela integração da Vercel (Storage), na região EUA leste, como as APIs.
- Cada site usa proxy same-origin `/api` (rewrites do Next ou `vercel.json`), para os cookies ficarem first-party.
- Testado no ar: Pontual (página e horários), Sobra (login demo e F5 mantendo a sessão), Confere (análise nova
  de ponta a ponta), Pulo (encurtar, redirect 302 e contador ao vivo subindo).
- Mudanças feitas nos repositórios para o deploy: Pontual (porta via `PORT`), Sobra (`AUTH_COOKIE_PATH_PREFIX`),
  Confere (URL do banco para asyncpg e `WORKER_INTERVALO_S`), Pulo (remove `channel_binding` da URL).

### Limites conhecidos
- Planos grátis do Render: a API dorme após 15 min sem uso; a primeira visita espera 30 a 60 s.
- Upstash grátis: só 1 banco (é do Confere) e 500 mil comandos/mês; o worker consulta a fila a cada 2 s.
- Pulo: o Key Value grátis tem 25 MB e não persiste
  (stream limitado a 20.000 entradas com `CLICKS_MAXLEN`).
- Confere: sem o modelo de embeddings (só taxonomia). PDF com texto em imagem ou desenho (Canva e afins)
  é recusado com explicação (ver abaixo); não há OCR.
- Os dados demo do Pontual ficam com as datas do último deploy.

### Correções depois da publicação (2026-11-23)
- **Pulo, POST em link 307/308:** preservava o método só no GET; agora o POST num link sem senha
  responde 307/308 direto ao destino (commit `c312d53`, 3 testes de integração).
- **Pulo, IP do visitante:** no Render quem conecta é `127.0.0.1` e a cadeia é cliente → Cloudflare →
  rede 10.x. Com `TRUST_PROXY=10.0.0.0/8`, todo visitante virava `127.0.0.1` (bucket e visitante único
  compartilhados, regra por país sem efeito). `TRUST_PROXY` agora tem loopback, 10/8 e as faixas da
  Cloudflare, no redirect e na API; o `.env.example` do Pulo documenta isso. Testado: `demo-pais` → `/pt`.
- **Pulo, geolocalização:** o build baixa a base DB-IP Lite (`geo:download`) e `GEO_*_MMDB` apontam
  para `/opt/render/project/src/data/geo/`.
- **Confere, PDF com texto em imagem ou desenho:** página com menos de 200 caracteres e muito conteúdo
  visual entra em `paginas_sem_texto`; se todas as páginas caem nisso, o upload é recusado com
  explicação, em vez de nota 0 (commit `0844726`, 4 testes). Testado no ar: um PDF fictício desenhado
  (1 linha de texto e 600 curvas) recebe "Quase nada deste PDF pôde ser lido…" em vez de nota 0.
- **Portfólio:** cada projeto ganhou "→ ver no ar" na home e o link da demo na ficha da página, com o
  aviso de que a primeira visita pode levar até um minuto.

### Próximo passo
Antes de divulgar:
1. Currículos em PDF (PT e EN) em `public/` e `CURRICULO` preenchido em `src/data/projetos.ts`.
2. Conferir de novo os números nos READMEs dos projetos.

Feito em 2026-11-23: licença MIT no Pontual, Pulo e Confere; link "no ar" nos READMEs dos 4 projetos
e no README do perfil (com o link do portfólio).
