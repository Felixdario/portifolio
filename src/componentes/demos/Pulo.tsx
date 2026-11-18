'use client';
// "Derrubar o worker": o worker A grava um lote e cai entre o COMMIT e o XACK;
// o XAUTOCLAIM devolve o lote ao worker B, que reconhece os eventos pelo id e não grava de novo.
import { useId, useRef } from 'react';
import type { TextosDemo } from '@/i18n/tipos';
import { Gosma } from '../Gosma';
import { atributo, circulo, idSeguro } from '@/lava/motor';
import { Palco, lerp, trecho, useDemo, useQuadroDemo } from './Palco';
import styles from '../projeto.module.css';

type P = { x: number; y: number };
const N = 6; // gotas por lote: 2 lotes de 6 representam os 300 eventos do teste

function geometria(v: boolean) {
  return v
    ? { w: 360, h: 600, stream: { x: 180, y: 70 }, a: { x: 90, y: 270 }, b: { x: 270, y: 270 }, banco: { x: 180, y: 470 }, rw: 44, rb: [58, 80] as const }
    : { w: 1312, h: 440, stream: { x: 140, y: 220 }, a: { x: 560, y: 120 }, b: { x: 560, y: 320 }, banco: { x: 1090, y: 220 }, rw: 58, rb: [66, 120] as const };
}

const via = (o: P, m: P, d: P, k1: number, k2: number) =>
  k2 > 0 ? { x: lerp(m.x, d.x, k2), y: lerp(m.y, d.y, k2) } : { x: lerp(o.x, m.x, k1), y: lerp(o.y, m.y, k1) };

function cena(v: boolean, p: number, t: number) {
  const g = geometria(v);
  const r = v ? 11 : 15;
  const fila = (i: number): P => {
    const ang = i * 1.05 + t * 0.6;
    const d = v ? 26 : 34;
    return { x: g.stream.x + Math.cos(ang) * d * (i % 2 ? 1 : 0.55), y: g.stream.y + Math.sin(ang) * d * 0.8 };
  };
  const gotas: { x: number; y: number; r: number; dup?: boolean }[] = [];
  // Lote 1: stream → A → banco (gravado), entre 0 e 0,3.
  for (let i = 0; i < N; i++) {
    const s = 0.02 * i;
    const k1 = trecho(p, s, 0.14 + s);
    const k2 = trecho(p, 0.15 + s, 0.28 + s);
    const pos = via(fila(i), g.a, g.banco, k1, k2);
    gotas.push({ ...pos, r: r * (1 - k2) });
  }
  // Pendências do lote 1: reaparecem em A, o XAUTOCLAIM leva a B, e chegam ao banco como duplicadas.
  for (let i = 0; i < N; i++) {
    const s = 0.015 * i;
    const nasce = trecho(p, 0.42, 0.46);
    const k1 = trecho(p, 0.46 + s, 0.56 + s);
    const k2 = trecho(p, 0.57 + s, 0.66 + s);
    const pos = via(g.a, g.b, g.banco, k1, k2);
    gotas.push({ ...pos, r: r * 0.8 * nasce * (1 - trecho(p, 0.63 + s, 0.68 + s)), dup: true });
  }
  // Lote 2: stream → B → banco, entre 0,68 e 1.
  for (let i = 0; i < N; i++) {
    const s = 0.02 * i;
    const k1 = trecho(p, 0.66 + s, 0.78 + s);
    const k2 = trecho(p, 0.79 + s, 0.9 + s);
    const pos = via(fila(N + i), g.b, g.banco, k1, k2);
    gotas.push({ ...pos, r: r * (1 - k2) });
  }
  const gravado = (trecho(p, 0.15, 0.36) + trecho(p, 0.79, 1)) / 2;
  return {
    g,
    gotas,
    banco: lerp(g.rb[0], g.rb[1], gravado),
    caiu: p > 0.32,
    queda: trecho(p, 0.32, 0.42),
    b: trecho(p, 0.38, 0.46),
  };
}

export function DemoPulo({ t, titulo, rotulo }: { t: TextosDemo; titulo: string; rotulo: string }) {
  const uid = idSeguro(useId());
  const palco = useRef<HTMLDivElement>(null);
  const { fase, vertical, p, avancar, enviar } = useDemo(palco, 4.2);
  const els = useRef<(SVGCircleElement | null)[]>([]);
  const banco = useRef<SVGCircleElement>(null);
  const a = useRef<SVGCircleElement>(null);
  const b = useRef<SVGCircleElement>(null);
  const aviso = useRef<SVGTextElement>(null);

  useQuadroDemo(palco, avancar, (tt) => {
    const c = cena(vertical, p.current, tt);
    c.gotas.forEach((d, i) => {
      circulo(els.current[i], d.x, d.y, d.r);
    });
    circulo(banco.current, c.g.banco.x, c.g.banco.y, c.banco);
    circulo(a.current, c.g.a.x, c.g.a.y, c.g.rw * (1 - 0.35 * c.queda));
    atributo(a.current, 'fill', c.caiu ? 'var(--cinza)' : 'var(--pulo)');
    circulo(b.current, c.g.b.x, c.g.b.y, c.g.rw * (0.5 + 0.5 * c.b));
    atributo(b.current, 'opacity', (0.35 + 0.65 * c.b).toFixed(2));
    atributo(aviso.current, 'opacity', c.queda.toFixed(2));
  });

  const c = cena(vertical, p.current, 0);
  const g = c.g;
  const dy = vertical ? g.rw + 24 : g.rw + 28;
  return (
    <Palco t={t} titulo={titulo} rotulo={rotulo} cor="var(--pulo)" fase={fase} enviar={enviar} palco={palco}>
      <svg viewBox={`0 0 ${g.w} ${g.h}`} className={styles.palcoSvg} role="img" aria-label={fase === 'depois' ? t.palcoDepois : t.palcoAntes}>
        <defs>
          <Gosma id={`${uid}g`} desvio={vertical ? 7 : 9} corte="24 -10" />
        </defs>
        <circle ref={a} cx={g.a.x} cy={g.a.y} r={g.rw * (1 - 0.35 * c.queda)} fill={c.caiu ? 'var(--cinza)' : 'var(--pulo)'} />
        <circle ref={b} cx={g.b.x} cy={g.b.y} r={g.rw * (0.5 + 0.5 * c.b)} fill="var(--pulo)" opacity={0.35 + 0.65 * c.b} />
        <g filter={`url(#${uid}g)`}>
          <circle ref={banco} cx={g.banco.x} cy={g.banco.y} r={c.banco} fill="var(--pulo)" />
          {c.gotas.map((d, i) => (
            <circle key={i} ref={(el) => void (els.current[i] = el)} cx={d.x} cy={d.y} r={d.r} fill={d.dup ? 'var(--cinza)' : 'var(--pulo)'} />
          ))}
        </g>
        <text x={g.stream.x} y={g.stream.y + (vertical ? 58 : 76)} textAnchor="middle" className={styles.svgPequeno}>
          {t.rotulos.stream}
        </text>
        <text x={g.a.x} y={g.a.y - dy + (vertical ? 4 : 0)} textAnchor="middle" className={styles.svgPequeno}>
          {t.rotulos.a}
        </text>
        <text ref={aviso} x={g.a.x} y={g.a.y + dy} textAnchor="middle" className={styles.svgAviso} opacity={c.queda}>
          {t.rotulos.caiu}
        </text>
        <text x={g.b.x} y={g.b.y + dy} textAnchor="middle" className={styles.svgPequeno}>
          {t.rotulos.b}
        </text>
        <text x={g.banco.x} y={g.banco.y + 8} textAnchor="middle" className={`${styles.svgMedio} ${styles.sobreGota}`}>
          {t.rotulos.banco}
        </text>
      </svg>
    </Palco>
  );
}
