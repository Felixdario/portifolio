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

### Próximo passo
1. **Fase 1 (Design):** carregar `design-taste-frontend` e `impeccable` (shape), propor 2 direções curtas (tipografia, paleta, ideia de movimento e uma tela de hero cada) e PARAR para o dono escolher. Prever PT/EN no layout (seletor de idioma, textos de tamanhos diferentes).

### Como verificar
- `grep -n "PENDENTE" content/conteudo.md` deve achar só a linha da convenção (linha 9).
- `grep -c 'Ã[^O]\|â€\|Â' content/conteudo.md` deve dar 0.
