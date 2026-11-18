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

### Próximo passo
1. **Dono:** revisar `content/conteudo.md` e resolver as `[PENDENTE]`. As principais:
   - frase de função;
   - localização (Curitiba e região ou Colombo);
   - tom do texto pessoal;
   - Flutter e os números da Epays.
2. **Fase 1 (Design):** carregar `design-taste-frontend` e `impeccable` (shape), propor 2 direções curtas (tipografia, paleta, ideia de movimento e uma tela de hero cada) e PARAR para o dono escolher.
