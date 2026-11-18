import { Home } from '@/componentes/Home';
import { metaHome } from '@/componentes/metadados';

export const metadata = metaHome('pt');

export default function Page() {
  return <Home locale="pt" />;
}
