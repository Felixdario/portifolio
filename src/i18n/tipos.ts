// O mesmo tipo para os dois idiomas: faltar uma chave em pt.ts ou en.ts quebra o build.
// Texto com **negrito** e `código` é interpretado por <Rico>.

export type Locale = 'pt' | 'en';
export type Slug = 'sobra' | 'pontual' | 'pulo' | 'confere';

export type TextosDemo = {
  botao: string;
  rodando: string;
  deNovo: string;
  antes: string;
  durante: string;
  depois: string;
  esquerda: string;
  direita: string;
  prova: string;
  palcoAntes: string;
  palcoDepois: string;
  /** Rótulos curtos desenhados dentro do palco. */
  rotulos: Record<string, string>;
};

export type TextosProjeto = {
  nome: string;
  kicker: string;
  numero: string;
  numeroLegenda: string;
  frase: string;
  garantia: string;
  stackCurta: string;
  capaAlt: string;
  /** Ressalva que acompanha o número da home (asterisco do Confere, máquina local do Pulo). */
  ressalva?: string;
  pagina: {
    meta: string;
    resumo: string;
    demo: string;
    garantiaTitulo: string;
    demonstracao: TextosDemo;
    comoTitulo: string;
    como: [string, string, string];
    numeros: [Numero, Numero, Numero, Numero];
    numerosRessalva?: string;
    naoMedido: string;
    stack: string;
    capturasAlt: string[];
  };
};

export type Numero = { valor: string; texto: string };

export type Dicionario = {
  htmlLang: string;
  metaTitulo: string;
  metaDescricao: string;
  lugar: string;
  idioma: { rotulo: string; nome: string };
  tema: { claro: string; escuro: string };
  menu: { abrir: string; fechar: string; titulo: string };
  pularParaConteudo: string;
  nav: { projetos: string; trabalho: string; sobre: string; contato: string };
  hero: {
    nome: string;
    frase: string;
    fraseCurta: string;
    linkProjetos: string;
    linkSobre: string;
    listaRotulo: string;
    fatos: Record<Slug, string>;
  };
  pj: { titulo: string; intro: string; ver: string; repo: string; aoVivo: string };
  projetos: Record<Slug, TextosProjeto>;
  pagina: {
    voltar: string;
    papelRotulo: string;
    papel: string;
    codigoRotulo: string;
    demoRotulo: string;
    /** Aviso sobre a hospedagem grátis (o servidor dorme e acorda na primeira visita). */
    demoAviso: string;
    licencaRotulo: string;
    licenca: string;
    garantiaRotulo: string;
    comoRotulo: string;
    numerosRotulo: string;
    capturasRotulo: string;
    naoMedidoRotulo: string;
    proximo: string;
    metaTituloSufixo: string;
  };
  tb: {
    titulo: string;
    intro: string;
    epays: {
      meta: string;
      gota: string;
      gotaData: string;
      cargo: string;
      libTitulo: string;
      lib: string;
      epjotaTitulo: string;
      epjota: string;
      stack: string;
      ressalva: string;
    };
    tcc: {
      meta: string;
      nome: string;
      frase: string;
      partes: string;
      web: string;
      app: string;
      api: string;
      repositorio: string;
      aoVivo: string;
    };
  };
  so: {
    titulo: string;
    texto1: string;
    texto2: string;
    uso: string;
    usoItens: [string, string][];
    trajetoria: string;
    formacao: string;
    empregos: [string, string, string][];
    cursos: [string, string, string][];
  };
  ct: {
    titulo: string;
    github: string;
    linkedin: string;
    cvPt: string;
    cvEn: string;
  };
  rodape: { assinatura: string; site: string; codigo: string; topo: string };
};
