import type { MetadataRoute } from 'next';
import { rota } from '@/i18n';
import { SITE_URL, SLUGS } from '@/data/projetos';

export const dynamic = 'force-static';

const abs = (caminho: string) => new URL(caminho, SITE_URL).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = [
    { pt: rota.home('pt'), en: rota.home('en'), prioridade: 1 },
    ...SLUGS.map((s) => ({ pt: rota.projeto('pt', s), en: rota.projeto('en', s), prioridade: 0.8 })),
  ];
  return paginas.flatMap(({ pt, en, prioridade }) => {
    const languages = { 'pt-BR': abs(pt), en: abs(en) };
    return [
      { url: abs(pt), priority: prioridade, alternates: { languages } },
      { url: abs(en), priority: prioridade, alternates: { languages } },
    ];
  });
}
