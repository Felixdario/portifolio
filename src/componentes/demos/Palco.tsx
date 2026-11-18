'use client';
// Moldura comum das demonstrações: título, botão, palco, legendas, resultado e prova.
// Sem JS o HTML mostra o estado final; com movimento reduzido o botão pula para o resultado.
import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import type { TextosDemo } from '@/i18n/tipos';
import { movimentoReduzido, useLava } from '@/lava/motor';
import { Rico } from '../Rico';
import styles from '../projeto.module.css';

export type Fase = 'antes' | 'rodando' | 'depois';

export const suave = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(1 - x, 3));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
/** Progresso local de 0 a 1 entre a e b, com easing. */
export const trecho = (p: number, a: number, b: number) => suave((p - a) / (b - a));

/** Estado da demonstração + layout (vertical abaixo de 640 px de largura). */
export function useDemo(palco: RefObject<HTMLDivElement | null>, duracao: number) {
  const [fase, setFase] = useState<Fase>('depois');
  const [vertical, setVertical] = useState(false);
  const p = useRef(1);
  const faseRef = useRef<Fase>('depois');
  faseRef.current = fase;

  useEffect(() => {
    if (!movimentoReduzido()) {
      p.current = 0;
      setFase('antes');
    }
    const el = palco.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setVertical((e?.contentRect.width ?? 1000) < 640));
    ro.observe(el);
    return () => ro.disconnect();
  }, [palco]);

  function avancar(dt: number, parado: boolean) {
    if (faseRef.current !== 'rodando') return;
    p.current = Math.min(1, p.current + (parado ? 1 : dt / duracao));
    if (p.current >= 1) setFase('depois');
  }

  function enviar() {
    if (movimentoReduzido()) {
      p.current = 1;
      setFase('depois');
      return;
    }
    p.current = 0;
    setFase('rodando');
  }

  return { fase, vertical, p, avancar, enviar };
}

type Props = {
  t: TextosDemo;
  titulo: string;
  rotulo: string;
  cor: string;
  fase: Fase;
  enviar: () => void;
  palco: RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

export function Palco({ t, titulo, rotulo, cor, fase, enviar, palco, children }: Props) {
  const resultado = fase === 'depois' ? t.depois : fase === 'rodando' ? t.durante : t.antes;
  const botao = fase === 'depois' ? t.deNovo : fase === 'rodando' ? t.rodando : t.botao;
  return (
    <section className={styles.garantia} aria-labelledby="garantia-titulo">
      <div className={styles.garantiaTopo} data-entra>
        <div>
          <span className="rotulo">{rotulo}</span>
          <h2 id="garantia-titulo" className={`titulo-medio ${styles.garantiaTitulo}`}>
            {titulo}
          </h2>
        </div>
        <button type="button" className="botao" style={{ background: cor }} onClick={enviar} disabled={fase === 'rodando'}>
          {botao}
        </button>
      </div>
      <div ref={palco} className={styles.palco}>
        {children}
      </div>
      <div className={styles.legendas} aria-hidden="true">
        <span>{t.esquerda}</span>
        <span>{t.direita}</span>
      </div>
      <div className={styles.resultado}>
        <p className={styles.resultadoTexto} aria-live="polite">
          {resultado}
        </p>
        <p className={styles.prova}>
          <Rico texto={t.prova} />
        </p>
      </div>
    </section>
  );
}

/** Liga o quadro da demonstração ao laço comum. */
export function useQuadroDemo(
  palco: RefObject<HTMLDivElement | null>,
  avancar: (dt: number, parado: boolean) => void,
  desenhar: (t: number) => void,
) {
  useLava(palco, (t, dt, parado) => {
    avancar(dt, parado);
    desenhar(t);
  });
}
