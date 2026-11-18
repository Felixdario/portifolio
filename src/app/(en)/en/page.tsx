import { Home } from '@/componentes/Home';
import { metaHome } from '@/componentes/metadados';

export const metadata = metaHome('en');

export default function Page() {
  return <Home locale="en" />;
}
