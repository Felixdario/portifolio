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

### Próximo passo
1. **O dono aprova a direção C** (ou pede ajustes) no canvas do Claude Design.
2. **Fase 2 (Estrutura e stack):** com a direção escolhida, reimprimir a folha completa, escrever o argumento e o texto em PT/EN a partir de `content/conteudo.md` e montar o projeto. A stack ainda não foi decidida; o `.gitignore` já prevê Next.js com export estático (`out/`).
