import type { ReactNode } from 'react';
import { Raiz } from '@/componentes/Raiz';
export { viewport } from '@/componentes/metadados';

export default function Layout({ children }: { children: ReactNode }) {
  return <Raiz locale="pt">{children}</Raiz>;
}
