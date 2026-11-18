'use client';
// Entrada de cada bloco marcado com data-entra: sobe 24 px e aparece, uma vez, ao entrar na tela.
// Só esconde quando há JS (classe .js no <html>); com movimento reduzido, aparece sem deslocar.
import { useEffect } from 'react';

export function Entradas() {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('[data-entra]')];
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          const irmaos = [...(el.parentElement?.children ?? [])].filter((x) => x.hasAttribute('data-entra'));
          el.style.setProperty('--atraso', `${Math.max(0, irmaos.indexOf(el)) * 70}ms`);
          el.dataset.entrou = '';
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
