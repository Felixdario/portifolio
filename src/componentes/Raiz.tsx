import type { ReactNode } from 'react';
import { Bricolage_Grotesque, Nunito } from 'next/font/google';
import type { Locale } from '@/i18n/tipos';
import { dic } from '@/i18n';
import { Entradas } from './Entradas';
import '@/app/estilos.css';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], axes: ['opsz'], variable: '--fonte-bricolage', display: 'swap' });
const nunito = Nunito({ subsets: ['latin'], variable: '--fonte-nunito', display: 'swap' });

// Aplica o tema salvo antes da primeira pintura (sem piscar).
const SCRIPT_TEMA = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('tema');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export function Raiz({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={dic(locale).htmlLang} className={`${bricolage.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA }} />
      </head>
      <body>
        <div id="topo" />
        {children}
        <Entradas />
      </body>
    </html>
  );
}
