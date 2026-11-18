// Textos em português. Fonte: content/textos-site.md (fatos em content/conteudo.md).
import type { Dicionario } from './tipos';

const papel = 'direção dos agentes de IA, decisões registradas e testes';

export const pt: Dicionario = {
  htmlLang: 'pt-BR',
  metaTitulo: 'Eduardo Felix · desenvolvedor full-stack júnior',
  metaDescricao:
    'Desenvolvedor full-stack júnior em Curitiba e região. APIs em Node.js e TypeScript, interfaces em React, apps em React Native, e um teste para cada garantia.',
  lugar: 'Curitiba e região, PR',
  idioma: { rotulo: 'EN', nome: 'Read in English' },
  tema: { claro: 'Usar tema claro', escuro: 'Usar tema escuro' },
  menu: { abrir: 'Menu', fechar: 'Fechar', titulo: 'Navegação' },
  pularParaConteudo: 'Pular para o conteúdo',
  nav: { projetos: 'Projetos', trabalho: 'Trabalho', sobre: 'Sobre', contato: 'Contato' },
  hero: {
    nome: 'Eduardo Felix',
    frase:
      'Desenvolvedor full-stack júnior. APIs em Node.js e TypeScript, interfaces em React, apps em React Native, e um teste para cada garantia.',
    fraseCurta:
      'Desenvolvedor full-stack júnior: Node.js, React e React Native, com um teste para cada garantia.',
    linkProjetos: '→ ver projetos',
    linkSobre: '→ sobre mim',
    listaRotulo: 'Projetos em destaque',
    fatos: {
      sobra: 'finanças, 1087 testes',
      pontual: 'agenda, 20 pedidos e 1 reserva',
      pulo: 'links, cada clique uma vez',
      confere: 'currículos com IA',
    },
  },
  pj: {
    titulo: 'Projetos',
    intro: 'Quatro projetos de 2026. Cada um promete uma coisa, e um teste prova que ela vale.',
    ver: '→ ver o projeto',
    repo: '→ repositório',
  },
  projetos: {
    sobra: {
      nome: 'Sobra',
      kicker: '01 · finanças pessoais',
      numero: '1087',
      numeroLegenda: 'testes passando',
      frase:
        'Controle financeiro pessoal: o app mobile lança o gasto na hora, e o painel web mostra para onde foi o dinheiro do mês.',
      garantia: 'Dinheiro guardado em centavos inteiros. Nada passa por float.',
      stackCurta: 'TypeScript · Fastify · Prisma · React · Expo',
      capaAlt: 'Painel web do Sobra com o resumo de outubro',
      pagina: {
        meta: '01 · finanças pessoais · 2026',
        resumo:
          'Controle financeiro pessoal que responde quanto você tem agora, para onde foi o dinheiro este mês e quanto sobra. O app mobile lança o gasto na hora; o painel web explica o mês.',
        demo: 'roda localmente, com usuário demo e dados fictícios',
        garantiaTitulo: 'R$ 10,00 em 3. A soma ainda dá 10,00.',
        demonstracao: {
          botao: 'Dividir em 3',
          rodando: 'Dividindo…',
          deNovo: 'Dividir de novo',
          antes: 'Aperte o botão para dividir R$ 10,00 em três partes.',
          durante: 'Os 1000 centavos viram três partes inteiras…',
          depois: '3,34 + 3,33 + 3,33 = 10,00. O centavo que sobra vai para a primeira parte.',
          esquerda: 'com float, cada parte é 3,3333333333333335, e arredondar as três dá 9,99',
          direita: 'em centavos inteiros: 334 + 333 + 333 = 1000',
          prova:
            'É o caso de `allocate(cents(1000), 3)` nos testes do pacote shared, que espera [334, 333, 333]. Um teste de propriedade confere, com totais e pesos aleatórios, que a soma das partes é sempre o total.',
          palcoAntes: 'Uma gota de R$ 10,00 pronta para ser dividida em três',
          palcoDepois: 'R$ 10,00 dividido em três gotas: 3,34, 3,33 e 3,33',
          rotulos: { total: 'R$ 10,00', soma: 'soma: 10,00' },
        },
        comoTitulo: 'Três decisões que seguram o resto',
        como: [
          '**Centavos inteiros.** `BigInt` no banco e arredondamento meio-para-o-par. Nenhum valor passa por float (ADR-008 e ADR-010).',
          '**Um contrato só.** O mesmo schema Zod valida a entrada na API, filtra a saída, gera o OpenAPI e confere a resposta no web e no mobile.',
          '**Sessão que se defende.** Refresh token rotativo: reapresentar um token já usado derruba a família inteira daquele login.',
        ],
        numeros: [
          { valor: '1087', texto: 'testes, todos passando: shared 331, tokens 225, i18n 41, client 63, api 165, web 100 e mobile 162' },
          { valor: '0', texto: 'violações de axe no Chrome real, nos temas claro e escuro, em 1440 e 390 px' },
          { valor: '34', texto: 'decisões registradas por escrito em `docs/decisoes.md`' },
          { valor: '3', texto: 'toques para lançar um gasto: só valor e categoria são obrigatórios' },
        ],
        naoMedido:
          '**Não medido:** o app mobile foi validado no Expo web e nos testes com Jest, não num aparelho real. O caminho com PostgreSQL (Docker) não foi testado, e a instalação foi testada só no Windows 11.',
        stack:
          'TypeScript 6 · Fastify 5 · Prisma 7 · Zod 4 · React 19 · Vite 8 · TanStack Query · Expo SDK 58 · React Native 0.88 · Vitest · Jest · axe-core',
        capturasAlt: [
          'Painel web do Sobra no tema escuro, com o saldo de outubro e o gráfico de receitas e despesas',
          'App do Sobra lançando um gasto de R$ 45,90: escolha da categoria',
          'Resumo de outubro no app, com o saldo, para onde foi o dinheiro e os orçamentos',
          'Orçamentos de outubro no painel web, com o que está perto do limite e o que passou',
        ],
      },
    },
    pontual: {
      nome: 'Pontual',
      kicker: '02 · agendamento online',
      numero: '20→1',
      numeroLegenda: '20 pedidos no mesmo horário, 1 reserva',
      frase:
        'Agendamento para barbearias, salões e clínicas: o cliente reserva pelo celular e o estabelecimento acompanha num painel.',
      garantia: 'O mesmo horário nunca é marcado duas vezes, nem quando dois clientes confirmam juntos.',
      stackCurta: 'NestJS · PostgreSQL · Prisma · Next.js',
      capaAlt: 'Painel do Pontual com o detalhe de um agendamento',
      pagina: {
        meta: '02 · agendamento online · 2026',
        resumo:
          'Agendamento online que não deixa marcar duas vezes o mesmo horário. O cliente reserva sozinho pelo celular, e a barbearia, o salão ou a clínica acompanha a agenda num painel.',
        demo: 'roda localmente, com conta demo e dados fictícios',
        garantiaTitulo: '20 pedidos para o mesmo horário. 1 reserva.',
        demonstracao: {
          botao: 'Enviar os 20 pedidos',
          rodando: 'Enviando…',
          deNovo: 'Enviar de novo',
          antes: 'Aperte o botão para mandar os 20 pedidos juntos.',
          durante: 'Os 20 pedidos chegam ao mesmo tempo…',
          depois: '1 reserva confirmada. 19 pedidos recusados com 409 HORARIO_INDISPONIVEL.',
          esquerda: '20 clientes confirmam juntos',
          direita: 'recusados com 409 e 5 horários livres',
          prova:
            'No teste de integração, os 20 pedidos chegam ao PostgreSQL ao mesmo tempo, em 10 rodadas. Todas terminam com 1 reserva e 19 recusas.',
          palcoAntes: '20 pedidos prontos para o mesmo horário de terça às 14:00',
          palcoDepois: '1 pedido ocupou o horário de terça às 14:00; 19 foram recusados',
          rotulos: { dia: 'terça', hora: '14:00' },
        },
        comoTitulo: 'Barrado em três camadas',
        como: [
          '**Domínio puro.** As regras recebem o "agora" como parâmetro. Cada caso de borda vira um teste que dá sempre o mesmo resultado.',
          '**Trava na transação.** Antes de ler a agenda, a transação pega uma trava por profissional e por cliente (`pg_advisory_xact_lock`).',
          '**Regra no próprio banco.** Uma constraint `EXCLUDE USING gist` no PostgreSQL, escrita à mão numa migration, porque o Prisma não modela esse tipo.',
        ],
        numeros: [
          { valor: '0', texto: 'sobreposições e 0 deadlocks em 15 rodadas de 40 operações misturadas' },
          { valor: '24', texto: 'regras de negócio, cada uma ligada aos testes que a cobrem' },
          { valor: '363', texto: 'testes: 199 da API, 4 shared, 33 web, 114 de integração e 13 E2E' },
          { valor: '2', texto: 'falhas reais achadas por um validador independente, as duas corrigidas' },
        ],
        naoMedido:
          '**Não medido:** a API não tem build de produção empacotado; roda com SWC transpilando na carga.',
        stack:
          'NestJS 11 · Prisma 7 · PostgreSQL 17 · Next 16 · React 19 · TanStack Query · Tailwind 4 · Vitest · fast-check · Playwright com axe',
        capturasAlt: [
          'Painel do estabelecimento com a agenda do dia',
          'Cliente escolhendo um horário pelo celular',
          'Recusa de horário indisponível com sugestões de outros horários',
          'Agenda do dia no tema escuro, com o detalhe de um atendimento e o bloco de preparo e limpeza',
        ],
      },
    },
    pulo: {
      nome: 'Pulo',
      kicker: '03 · encurtador de links',
      numero: '6,42 ms',
      numeroLegenda: 'p95 do redirect com cache',
      frase: 'Encurtador de URLs com analytics, sem deixar o redirecionamento lento.',
      garantia: 'Cada clique humano é contado uma vez. Robôs e prévias do WhatsApp ficam à parte.',
      stackCurta: 'Fastify · Redis Streams · PostgreSQL · React',
      capaAlt: 'Página de um link do Pulo com cerca de 5 milhões de cliques',
      ressalva: 'Medido numa máquina local de desenvolvimento.',
      pagina: {
        meta: '03 · encurtador de links · 2026',
        resumo:
          'Encurtador de URLs com analytics que conta cada clique humano uma vez, com robôs e prévias do WhatsApp à parte, sem deixar o redirecionamento lento.',
        demo: 'roda localmente, com conta demo e dados fictícios',
        garantiaTitulo: 'Cai o worker. Nenhum clique em dobro.',
        demonstracao: {
          botao: 'Derrubar o worker',
          rodando: 'Rodando…',
          deNovo: 'Derrubar de novo',
          antes: 'Aperte o botão: o worker grava um lote de cliques e cai antes de confirmar a leitura.',
          durante: 'O worker A cai entre o COMMIT e o XACK. O XAUTOCLAIM entrega o lote ao worker B…',
          depois: 'Todos os cliques gravados, nenhum duplicado. O worker B reconheceu pelo id cada evento que o A já tinha gravado.',
          esquerda: 'cliques entram no Redis Stream',
          direita: 'gravados uma vez no PostgreSQL',
          prova:
            'No teste de integração, 300 eventos entram no stream. O primeiro worker cai logo depois do COMMIT; o segundo recupera as pendências pelo `XAUTOCLAIM`. A tabela termina com exatamente 300 linhas, e os agregados batem com ela.',
          palcoAntes: 'Cliques esperando no Redis Stream, com dois workers e o PostgreSQL',
          palcoDepois: 'O worker A caiu; o worker B terminou o trabalho e o PostgreSQL ficou sem duplicados',
          rotulos: { stream: 'stream', a: 'worker A', b: 'worker B', banco: 'PostgreSQL', caiu: 'caiu antes do XACK' },
        },
        comoTitulo: 'Rápido no redirect, exato na contagem',
        como: [
          '**Redirect num script só.** Cache-aside, cache negativo de 30 s, token bucket e o `GET` rodam num único script Lua no Redis.',
          '**Exatamente uma vez.** O clique vai para um Redis Stream; o worker é idempotente pelo id do evento e grava os agregados na mesma instrução que a linha bruta.',
          '**Sem IP gravado.** O visitante vira um HMAC-SHA256 com sal diário, por causa da LGPD. Robôs e prévias são classificados e contados à parte.',
        ],
        numeros: [
          { valor: '6,42 ms', texto: 'p95 do redirect com cache, com 10.129 req/s num processo' },
          { valor: '0,19 ms', texto: 'a 0,59 ms para o painel de um link com 5 milhões de cliques, contra 28 a 122 ms do COUNT na tabela bruta' },
          { valor: '100.000', texto: 'eventos processados por 4 workers em 12,7 a 14,6 s, sem deadlock em 7 rodadas' },
          { valor: '536', texto: 'testes unitários, mais 169 de integração, 8 de consistência e 17 E2E' },
        ],
        numerosRessalva:
          'Medido numa máquina local de desenvolvimento: Ryzen 5 5500, Windows 11, PostgreSQL e Redis no Docker Desktop.',
        naoMedido:
          '**Não medido:** a consistência (8 de 8) não foi rodada de novo na última fase; o número é o registrado em `docs/performance.md`. A visão da conta fria leva 319 ms, ponto fraco declarado.',
        stack:
          'Node 22 · Fastify 5 · Drizzle ORM · Redis 7 · PostgreSQL 16 · React 19 · Vite 8 · TanStack Router e Query · Recharts · Vitest · fast-check · Playwright com axe · autocannon',
        capturasAlt: [
          'Lista de links do Pulo, com os cliques e as regras de cada um',
          'Página de um link no celular, com humanos, robôs e prévias contados à parte',
          'Página inicial do Pulo no celular: encurtar um link e baixar o QR code',
          'Página de um link no tema escuro: humanos, bots e prévias à parte, cliques por dia e países',
        ],
      },
    },
    confere: {
      nome: 'Confere',
      kicker: '04 · currículos com IA',
      numero: '0',
      numeroLegenda: 'de diferença na nota ao trocar nome, gênero ou idade*',
      frase:
        'Cole a vaga, envie o currículo e veja cada requisito com o trecho que o comprova, ou a falta dele.',
      garantia: 'Sem trecho, não conta. A nota é calculada em código, não pela IA.',
      stackCurta: 'Python · FastAPI · pgvector · Next.js',
      capaAlt: 'Página inicial do Confere com um exemplo de análise',
      ressalva:
        '*Medido nas regras, com casos fictícios escritos pelo autor. Não mede um modelo de linguagem.',
      pagina: {
        meta: '04 · currículos com IA · 2026',
        resumo:
          'Cole a vaga, envie o currículo e veja cada requisito com o trecho que o comprova, ou a falta dele. A IA lê o currículo; quem dá a nota é o código.',
        demo: 'roda localmente, num modo de demonstração por regras, sem chave de API',
        garantiaTitulo: '4 versões do currículo. A mesma nota.*',
        demonstracao: {
          botao: 'Comparar as 4 versões',
          rodando: 'Comparando…',
          deNovo: 'Comparar de novo',
          antes: 'Aperte o botão para passar as quatro versões pelas mesmas regras.',
          durante: 'O cabeçalho sai na anonimização, e a nota é calculada em código…',
          depois: 'As quatro versões tiram 78. Diferença: 0.*',
          esquerda: 'muda o nome, o gênero, a idade, o estado civil e os contatos',
          direita: 'uma nota, calculada em código',
          prova:
            'No eval, um currículo-base para uma vaga de analista de dados e três variantes (homem de 58 anos, mulher de 27, nome vietnamita) esperam a mesma nota: 78. *Medido nas regras, com casos fictícios escritos pelo autor. Não mede um modelo de linguagem.',
          palcoAntes: 'Quatro versões do mesmo currículo, cada uma com outro cabeçalho',
          palcoDepois: 'As quatro versões viraram uma só nota: 78',
          rotulos: { base: 'base', c1: 'homem, 58', c2: 'mulher, 27', c3: 'nome vietnamita', anon: 'anonimização', nota: 'nota' },
        },
        comoTitulo: 'A IA não decide a nota',
        como: [
          '**Sem trecho, não conta.** Todo item extraído traz a citação literal do currículo, conferida no texto. Requisito sem trecho fica de fora.',
          '**Anonimizado antes da leitura.** Nome, e-mail, telefone, CPF, idade e gênero saem antes de a IA ver o texto (ADR 0004).',
          '**Nota em código.** Obrigatórios valem 70 %, desejáveis 20 % e senioridade 10 %, numa fórmula fixa (ADR 0003).',
        ],
        numeros: [
          { valor: '44/46', texto: 'variantes de prompt injection detectadas, com 0 falsos positivos em 89 frases legítimas' },
          { valor: '204/204', texto: 'dados pessoais anotados removidos na anonimização' },
          { valor: '0,97', texto: 'de precisão e 1,00 de cobertura de competências, com regras' },
          { valor: '871', texto: 'testes: 835 rápidos e 36 de integração' },
        ],
        numerosRessalva:
          'Os números medem as regras e o código ao redor, sobre 30 casos fictícios escritos pelo autor. Não medem um modelo de linguagem.',
        naoMedido:
          '**Não medido:** a extração feita pelo modelo de linguagem (precisão, cobertura, nota na faixa e resistência real a injection), o custo e a latência por análise. Também não houve teste com currículos reais de pessoas.',
        stack:
          'Python · FastAPI · SQLAlchemy 2 · PostgreSQL com pgvector · Redis · Next.js 16 · React 19 · pytest · mypy estrito · Playwright com axe',
        capturasAlt: [
          'Página inicial do Confere com um exemplo de análise',
          'Resultado de uma análise: nota 62 e cada requisito com o trecho que o comprova, ou "não consta"',
          'Comparação de duas versões do currículo para a mesma vaga: a nota sobe de 62 para 90',
          'Modo recrutador: candidatos anonimizados com nota, requisitos e o trecho de cada um, e a decisão sempre humana',
        ],
      },
    },
  },
  pagina: {
    voltar: '← todos os projetos',
    papelRotulo: 'Papel',
    papel,
    codigoRotulo: 'Código',
    demoRotulo: 'Demo',
    licencaRotulo: 'Licença',
    licenca: 'MIT',
    garantiaRotulo: 'A garantia',
    comoRotulo: 'Como',
    numerosRotulo: 'Números',
    capturasRotulo: 'Capturas',
    naoMedidoRotulo: 'Não medido',
    proximo: 'Próximo',
    metaTituloSufixo: 'Eduardo Felix',
  },
  tb: {
    titulo: 'Trabalho',
    intro: 'Além dos projetos de portfólio: o que faço na empresa e o projeto com que terminei o técnico.',
    epays: {
      meta: 'Hoje · Epays, Colombo (PR)',
      gota: 'Epays',
      gotaData: 'desde ago/2025',
      cargo: 'Full-stack júnior',
      libTitulo: 'Biblioteca de componentes',
      lib: 'Mantenho uma biblioteca de componentes React com Vite, usada nos produtos internos da empresa.',
      epjotaTitulo: 'Epjota',
      epjota:
        'Contribuo com o Epjota, que gerencia o fluxo de notas fiscais de serviço (NFS-e) e os relatórios fiscais entre empresas e prestadores.',
      stack: 'React · TypeScript · Vite · Sass · C# · PostgreSQL · Docker · Redis',
      ressalva: 'Código da empresa: aqui não entram capturas nem números internos.',
    },
    tcc: {
      meta: 'TCC · Técnico em Informática, IFPR',
      nome: 'SportLink',
      frase:
        'Um sistema para quem pratica esporte: perfis de atletas, quadras e avaliações, competições, partidas, ranking, conquistas e conversas.',
      partes: 'Três partes que conversam pela mesma API:',
      web: '**Web** · Next.js, publicado na Vercel',
      app: '**App** · React Native com Expo',
      api: '**API** · Python com FastAPI',
      repositorio: 'repositório →',
      aoVivo: 'Ver o SportLink no ar →',
    },
  },
  so: {
    titulo: 'Sobre',
    texto1:
      'Sou Eduardo Felix, desenvolvedor full-stack júnior em Curitiba e região. Trabalho na Epays, com uma biblioteca de componentes React usada em produtos internos e com o Epjota, fluxo de notas fiscais de serviço.',
    texto2:
      'Nos meus projetos de portfólio, dirijo agentes de IA, registro as decisões por escrito e escrevo testes que provam as garantias principais. Quando algo não foi medido, o README diz.',
    uso: 'O que uso',
    usoItens: [
      ['Back-end', 'Node.js, TypeScript, Fastify, NestJS, Python com FastAPI, C# e ASP.NET'],
      ['Front-end', 'React, Next.js, Vite, TanStack Query, Tailwind, i18n, acessibilidade testada com axe'],
      ['Mobile', 'React Native e Expo; Flutter em projetos pessoais'],
      ['Dados', 'PostgreSQL, Redis, Prisma, Drizzle, SQLAlchemy, SQL Server'],
      ['Testes', 'Vitest, fast-check, Playwright, Testing Library, pytest'],
      ['IA aplicada', 'evals versionadas, defesa contra prompt injection, anonimização'],
      ['Idiomas', 'português nativo, inglês profissional pleno, espanhol profissional'],
    ],
    trajetoria: 'Trajetória',
    formacao: 'Formação',
    empregos: [
      ['ago/2025 – hoje', 'Epays', 'full-stack júnior'],
      ['mai/2025 – ago/2025', 'Epays', 'front-end'],
      ['fev/2025 – mai/2025', 'Floox', 'front-end, app React Native'],
      ['dez/2024 – fev/2025', 'LUGARH', 'front-end, React e i18n'],
      ['set/2024 – dez/2024', 'Floox', 'front-end, base do app do zero'],
      ['jan/2024 – out/2024', 'BNE', 'full-stack, C# e SQL Server'],
    ],
    cursos: [
      ['2026 – 2028', 'PUCPR', 'Análise e Desenvolvimento de Sistemas, em andamento'],
      ['2022 – 2025', 'IFPR', 'Técnico em Informática'],
    ],
  },
  ct: {
    titulo: 'Contato',
    github: '→ GitHub',
    linkedin: '→ LinkedIn',
    cvPt: '→ currículo em PDF (PT)',
    cvEn: '→ résumé in PDF (EN)',
  },
  rodape: {
    assinatura: 'Eduardo Felix · Curitiba e região, PR · 2026',
    site: 'Site em Next.js, estático.',
    codigo: 'Código no GitHub',
    topo: 'voltar ao topo ↑',
  },
};
