// Dados que não mudam com o idioma. Os textos ficam em src/i18n/.
import type { Slug } from '@/i18n/tipos';

export type Captura = { arquivo: string; forma: 'desktop' | 'celular' | 'larga' };

export type Projeto = {
  slug: Slug;
  cor: string;
  repo: string;
  /** Demo no ar (Vercel + Render, planos grátis). */
  aoVivo: string;
  capa: string;
  capturas: Captura[];
};

export const PROJETOS: Projeto[] = [
  {
    slug: 'sobra',
    cor: 'var(--sobra)',
    repo: 'https://github.com/Felixdario/Sobra',
    aoVivo: 'https://sobra-chi.vercel.app',
    capa: 'sobra-capa',
    capturas: [
      { arquivo: 'sobra-painel-escuro', forma: 'desktop' },
      { arquivo: 'sobra-lancar-categoria', forma: 'celular' },
      { arquivo: 'sobra-resumo', forma: 'celular' },
      { arquivo: 'sobra-orcamentos', forma: 'larga' },
    ],
  },
  {
    slug: 'pontual',
    cor: 'var(--pontual)',
    repo: 'https://github.com/Felixdario/Pontual',
    aoVivo: 'https://pontual-zeta.vercel.app/b/navalha-e-cafe',
    capa: 'pontual-capa',
    capturas: [
      { arquivo: 'pontual-painel-agenda', forma: 'desktop' },
      { arquivo: 'pontual-fluxo-horarios', forma: 'celular' },
      { arquivo: 'pontual-recusa-409', forma: 'celular' },
      { arquivo: 'pontual-painel-escuro', forma: 'larga' },
    ],
  },
  {
    slug: 'pulo',
    cor: 'var(--pulo)',
    repo: 'https://github.com/Felixdario/Pulo',
    aoVivo: 'https://pulo-two.vercel.app',
    capa: 'pulo-capa',
    capturas: [
      { arquivo: 'pulo-dashboard', forma: 'desktop' },
      { arquivo: 'pulo-link-celular', forma: 'celular' },
      { arquivo: 'pulo-landing-celular', forma: 'celular' },
      { arquivo: 'pulo-link-escuro', forma: 'larga' },
    ],
  },
  {
    slug: 'confere',
    cor: 'var(--confere)',
    repo: 'https://github.com/Felixdario/Confere',
    aoVivo: 'https://confere-six.vercel.app',
    capa: 'confere-capa',
    capturas: [
      { arquivo: 'confere-capa', forma: 'desktop' },
      { arquivo: 'confere-resultado', forma: 'desktop' },
      { arquivo: 'confere-comparacao', forma: 'larga' },
      { arquivo: 'confere-recrutador', forma: 'larga' },
    ],
  },
];

export const SLUGS = PROJETOS.map((p) => p.slug);

export function projeto(slug: Slug): Projeto {
  const p = PROJETOS.find((x) => x.slug === slug);
  if (!p) throw new Error(`projeto desconhecido: ${slug}`);
  return p;
}

export function proximo(slug: Slug): Projeto {
  const i = PROJETOS.findIndex((x) => x.slug === slug);
  return PROJETOS[(i + 1) % PROJETOS.length]!;
}

export const CONTATO = {
  email: 'eduardojosedario@gmail.com',
  github: 'https://github.com/Felixdario',
  linkedin: 'https://www.linkedin.com/in/felixdariodev/',
};

export const SPORTLINK = {
  aoVivo: 'https://sportlink-webapp.vercel.app',
  web: 'https://github.com/Felixdario/sportlink-webapp',
  app: 'https://github.com/Felixdario/sportlink-mobile',
  api: 'https://github.com/Felixdario/sportlink-api',
};

/** Currículos em PDF em public/, gerados por `npm run curriculos` (scripts/curriculos.mjs). Com null, o link some. */
export const CURRICULO: { pt: string | null; en: string | null } = {
  pt: '/eduardo-felix-curriculo-pt.pdf',
  en: '/eduardo-felix-resume-en.pdf',
};

/** Repositório deste site (link "Código no GitHub" do rodapé). Com null, o rodapé mostra o texto sem link. */
export const REPO_DO_SITE: string | null = 'https://github.com/Felixdario/portifolio';

/**
 * Domínio usado no canonical e no hreflang. Ordem: SITE_URL (definida à mão), o domínio de produção que a
 * Vercel passa ao build (VERCEL_PROJECT_PRODUCTION_URL, sem protocolo) e, fora da Vercel, localhost.
 */
export const SITE_URL =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');
