import type { Metadata, Viewport } from 'next';
import type { Locale, Slug } from '@/i18n/tipos';
import { dic, rota } from '@/i18n';
import { SITE_URL } from '@/data/projetos';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#15141d' },
    { media: '(prefers-color-scheme: light)', color: '#efece6' },
  ],
};

export function metaHome(locale: Locale): Metadata {
  const t = dic(locale);
  return {
    metadataBase: new URL(SITE_URL),
    icons: { icon: '/favicon.svg' },
    title: t.metaTitulo,
    description: t.metaDescricao,
    alternates: {
      canonical: rota.home(locale),
      languages: { 'pt-BR': rota.home('pt'), en: rota.home('en'), 'x-default': rota.home('pt') },
    },
    openGraph: { title: t.metaTitulo, description: t.metaDescricao, type: 'website', locale: locale === 'pt' ? 'pt_BR' : 'en_US' },
  };
}

export function metaProjeto(locale: Locale, slug: Slug): Metadata {
  const t = dic(locale);
  const p = t.projetos[slug];
  const titulo = `${p.nome} · ${t.pagina.metaTituloSufixo}`;
  return {
    metadataBase: new URL(SITE_URL),
    icons: { icon: '/favicon.svg' },
    title: titulo,
    description: p.pagina.resumo,
    alternates: {
      canonical: rota.projeto(locale, slug),
      languages: { 'pt-BR': rota.projeto('pt', slug), en: rota.projeto('en', slug), 'x-default': rota.projeto('pt', slug) },
    },
    openGraph: { title: titulo, description: p.pagina.resumo, type: 'article', images: [`/img/${slug}-capa.webp`] },
  };
}
