import type { Slug } from '@/i18n/tipos';
import { SLUGS } from '@/data/projetos';
import { PaginaProjeto } from '@/componentes/PaginaProjeto';
import { metaProjeto } from '@/componentes/metadados';

type Props = { params: Promise<{ slug: Slug }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  return metaProjeto('en', (await params).slug);
}

export default async function Page({ params }: Props) {
  return <PaginaProjeto locale="en" slug={(await params).slug} />;
}
