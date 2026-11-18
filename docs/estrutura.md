# Fase 2: estrutura e stack

Data: 18/11/2026. Direção aprovada: C, "Lâmpada de lava" (`docs/direcoes.md` e o canvas).

## Mapa do site

```
/                     home PT: hero → projetos → sobre → contato → rodapé
/projetos/sobra       página de projeto (idem pontual, pulo, confere)
/en/                  home EN (mesma ordem)
/en/projects/sobra    página de projeto em EN
```

- PT é o padrão em `/`. O seletor PT/EN leva para a mesma página no outro idioma, e cada página tem `hreflang`.
- O "Menu" do hero abre uma folha com as três âncoras (Projetos, Sobre, Contato) e o seletor de idioma.
- Sem página 404 própria além da padrão do export; sem blog.

## O que foi desenhado (canvas, linha "Fase 2")

| Prancheta | O que mostra |
| - | - |
| Projetos (home) · desktop | Os 4 projetos em linhas. Cada um tem a sua gota com o número que prova a garantia; hover ou foco faz a gota crescer e engolir as gotinhas, e as outras linhas ficam mais apagadas. |
| Página de projeto: Pontual · desktop | Nome enorme com `mix-blend-mode: difference` sobre a gota rosa; garantia com a demonstração "Enviar os 20 pedidos" (20 gotas correm para terça 14:00, 1 se funde e 19 voltam cinzas); 3 camadas; 4 números; 3 capturas; "não medido"; próximo projeto. |
| Sobre, contato e rodapé · desktop | Texto curto, "o que uso", trabalho e formação; o e-mail é o maior texto da seção; o cursor é uma gota que gruda nas gotas paradas. |
| Celular | Projetos, sobre e contato empilhados; tocar no projeto faz a gota dele engolir as gotinhas. |

Os textos estão em `content/textos-site.md` (PT e EN).

## Demonstrações das outras páginas de projeto (para a construção)

Cada página tem a sua "coisa viva", sempre ligada ao teste que prova a garantia:

- **Sobra:** dividir R$ 100,00 em 3 parcelas. Com float aparece 33,333…; em centavos inteiros fica 33,33 + 33,33 + 33,34, e a soma bate. As gotas lima se dividem em três. (Conferir antes se o Sobra tem um teste com esse caso; se não tiver, usar um caso que esteja nos testes.)
- **Pulo:** o mesmo clique enviado 5 vezes (retentativa do worker) vira 1 no contador; um robô e uma prévia do WhatsApp caem numa gota separada.
- **Confere:** o mesmo currículo com três nomes diferentes dá a mesma nota; um requisito sem trecho fica de fora, com "sem trecho, não conta".

## Stack (decidida)

- **Next.js 16 (App Router) com `output: 'export'`**: o `.gitignore` já prevê `.next/` e `out/`. Gera HTML estático por página, sem servidor.
- **TypeScript estrito**, CSS Modules e variáveis CSS para os dois temas (sem Tailwind: a página tem poucos componentes e muitos valores únicos).
- **Textos** em `src/i18n/pt.ts` e `src/i18n/en.ts`, com o mesmo tipo (faltar uma chave quebra o build). Sem biblioteca de i18n: são só duas línguas e rotas fixas.
- **Fontes** com `next/font/google` (Bricolage Grotesque e Nunito, servidas pelo próprio site).
- **Imagens** copiadas dos projetos para `public/img/`, convertidas para WebP em 1x e 2x por um script com `sharp`; `next/image` com `unoptimized` (o export não otimiza em tempo de execução).
- **Lâmpada de lava** como um componente cliente: um `<svg>` com o filtro "gooey" (`feGaussianBlur` + `feColorMatrix`) e círculos movidos por `requestAnimationFrame`, limitado a ~30 fps.
- **Testes:** Vitest para os dados e a i18n (mesmas chaves nos dois idiomas), Playwright com axe nas páginas exportadas (claro/escuro, 1440 e 390 px). Gate da `design-taste-frontend` (`inspect.mjs`, `lint.mjs`) na página final.
- **Hospedagem: a decidir pelo dono** (Vercel ou GitHub Pages; os dois servem o `out/`).

## Fallback da animação

- **Sem JavaScript:** o HTML já vem com as gotas paradas nas posições iniciais (o SVG é renderizado no servidor). Todo o texto e os links funcionam. A demonstração dos 20 pedidos mostra o estado final (1 reserva, 19 recusas) com o texto da prova.
- **`prefers-reduced-motion: reduce`:** as gotas não flutuam e o cursor não vira gota. Hover e foco ainda mudam o tamanho da gota, sem transição. A demonstração pula para o resultado.
- **Desempenho:** o laço pausa quando a seção sai da tela (`IntersectionObserver`) e quando a aba fica oculta (`visibilitychange`). No celular, menos gotas e blur menor.
- **Contraste:** o nome com `difference` é decorativo sobre o líquido; o texto de leitura nunca fica por cima das gotas.

## Riscos

- O filtro gooey custa caro em telas grandes. Se passar de ~8 ms por quadro, trocar por um `<canvas>` com metaballs ou reduzir a área filtrada.
- Os números dos projetos mudam se os testes mudarem. Antes de publicar, conferir cada número no README do projeto.
