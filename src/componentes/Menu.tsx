'use client';
import { useRef } from 'react';
import styles from './topo.module.css';

type Props = {
  abrir: string;
  fechar: string;
  titulo: string;
  itens: { href: string; texto: string }[];
  idioma: { href: string; texto: string; nome: string; lang: string };
};

/** Folha com as âncoras da home e o seletor de idioma, num <dialog> nativo. */
export function Menu({ abrir, fechar, titulo, itens, idioma }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const fecharMenu = () => ref.current?.close();
  return (
    <>
      <button type="button" className={styles.link} aria-haspopup="dialog" onClick={() => ref.current?.showModal()}>
        {abrir}
      </button>
      <dialog
        ref={ref}
        className={styles.folha}
        aria-label={titulo}
        onClick={(e) => {
          if (e.target === ref.current) fecharMenu();
        }}
      >
        <div className={styles.folhaDentro}>
          <button type="button" className={styles.fechar} onClick={fecharMenu}>
            {fechar}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <nav aria-label={titulo}>
            <ul className={styles.folhaLista}>
              {itens.map((i) => (
                <li key={i.href}>
                  <a href={i.href} onClick={fecharMenu}>
                    {i.texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className={styles.folhaIdioma} href={idioma.href} hrefLang={idioma.lang} lang={idioma.lang}>
            {idioma.nome} →
          </a>
        </div>
      </dialog>
    </>
  );
}
