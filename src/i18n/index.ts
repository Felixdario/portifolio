import { pt } from './pt';
import { en } from './en';
import type { Dicionario, Locale, Slug } from './tipos';

export const DICIONARIOS: Record<Locale, Dicionario> = { pt, en };

export function dic(locale: Locale): Dicionario {
  return DICIONARIOS[locale];
}

/** Rotas: PT na raiz, EN em /en/. Sempre com barra no fim (trailingSlash). */
export const rota = {
  home: (l: Locale) => (l === 'pt' ? '/' : '/en/'),
  projeto: (l: Locale, slug: Slug) => (l === 'pt' ? `/projetos/${slug}/` : `/en/projects/${slug}/`),
};

export const outro = (l: Locale): Locale => (l === 'pt' ? 'en' : 'pt');
