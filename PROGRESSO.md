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

### A decidir pelo dono
- Aprovar (ou pedir ajustes) nas 4 pranchetas da Fase 2.
- Hospedagem: Vercel ou GitHub Pages.

### Próximo passo
1. Revisão do dono no canvas.
2. **Fase 3 (Construção):** montar o projeto Next.js na raiz deste repositório, a home completa em PT/EN com a lâmpada de lava e o fallback, a página do Pontual e as outras três a partir do modelo. Rodar o gate (`inspect.mjs`, `lint.mjs`) e o Playwright com axe.
