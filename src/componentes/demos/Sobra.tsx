'use client';
// "Dividir em 3": a gota de R$ 10,00 se divide em três gotas inteiras, 3,34 + 3,33 + 3,33.
import { useId, useRef } from 'react';
import type { TextosDemo, Locale } from '@/i18n/tipos';
import { Gosma } from '../Gosma';
import { atributo, circulo, idSeguro } from '@/lava/motor';
import { Palco, lerp, trecho, useDemo, useQuadroDemo } from './Palco';
import styles from '../projeto.module.css';

const PARTES = [334, 333, 333];

function geometria(v: boolean) {
  return v
    ? { w: 360, h: 520, total: { x: 180, y: 130, r: 92 }, partes: [62, 180, 298].map((x) => ({ x, y: 350, r: 42 })), somaY: 460 }
    : { w: 1312, h: 440, total: { x: 250, y: 210, r: 124 }, partes: [720, 940, 1160].map((x) => ({ x, y: 200, r: 82 })), somaY: 370 };
}

function cena(v: boolean, p: number, t: number) {
  const g = geometria(v);
  const bal = (i: number) => 4 * Math.sin(t * 1.2 + i * 2);
  const encolhe = trecho(p, 0.15, 0.8);
  const total = { x: g.total.x, y: g.total.y + bal(9), r: lerp(g.total.r, 0, encolhe) };
  const partes = g.partes.map((alvo, i) => {
    const k = trecho(p, 0.1 + i * 0.08, 0.7 + i * 0.08);
    return {
      x: lerp(g.total.x, alvo.x, k),
      y: lerp(g.total.y, alvo.y, k) + bal(i) * k,
      r: lerp(g.total.r * 0.45, alvo.r, k) * Math.min(1, k * 4),
    };
  });
  return { g, total, partes, rotulos: trecho(p, 0.75, 0.95) };
}

const reais = (centavos: number, l: Locale) => (centavos / 100).toFixed(2).replace('.', l === 'pt' ? ',' : '.');

export function DemoSobra({ t, titulo, rotulo, locale }: { t: TextosDemo; titulo: string; rotulo: string; locale: Locale }) {
  const uid = idSeguro(useId());
  const palco = useRef<HTMLDivElement>(null);
  const { fase, vertical, p, avancar, enviar } = useDemo(palco, 2.4);
  const total = useRef<SVGCircleElement>(null);
  const partes = useRef<(SVGCircleElement | null)[]>([]);
  const rotulosPartes = useRef<SVGGElement>(null);
  const rotuloTotal = useRef<SVGTextElement>(null);

  useQuadroDemo(palco, avancar, (tt) => {
    const c = cena(vertical, p.current, tt);
    circulo(total.current, c.total.x, c.total.y, c.total.r);
    c.partes.forEach((d, i) => circulo(partes.current[i], d.x, d.y, d.r));
    atributo(rotulosPartes.current, 'opacity', c.rotulos.toFixed(2));
    atributo(rotuloTotal.current, 'opacity', (1 - trecho(p.current, 0, 0.3)).toFixed(2));
  });

  const c = cena(vertical, p.current, 0);
  return (
    <Palco t={t} titulo={titulo} rotulo={rotulo} cor="var(--sobra)" fase={fase} enviar={enviar} palco={palco}>
      <svg viewBox={`0 0 ${c.g.w} ${c.g.h}`} className={styles.palcoSvg} role="img" aria-label={fase === 'depois' ? t.palcoDepois : t.palcoAntes}>
        <defs>
          <Gosma id={`${uid}g`} desvio={vertical ? 10 : 14} />
        </defs>
        <g filter={`url(#${uid}g)`}>
          <circle ref={total} cx={c.total.x} cy={c.total.y} r={c.total.r} fill="var(--sobra)" />
          {c.partes.map((d, i) => (
            <circle key={i} ref={(el) => void (partes.current[i] = el)} cx={d.x} cy={d.y} r={d.r} fill="var(--sobra)" />
          ))}
        </g>
        <text ref={rotuloTotal} x={c.g.total.x} y={c.g.total.y + 12} textAnchor="middle" className={`${styles.svgGrande} ${styles.sobreGota}`} opacity={p.current > 0.3 ? 0 : 1}>
          {t.rotulos.total}
        </text>
        <g ref={rotulosPartes} opacity={c.rotulos}>
          {c.g.partes.map((d, i) => (
            <text key={i} x={d.x} y={d.y + 12} textAnchor="middle" className={`${styles.svgGrande} ${styles.sobreGota}`}>
              {reais(PARTES[i]!, locale)}
            </text>
          ))}
          <text x={c.g.partes[1]!.x} y={c.g.somaY} textAnchor="middle" className={styles.svgMedio}>
            {t.rotulos.soma}
          </text>
        </g>
      </svg>
    </Palco>
  );
}
