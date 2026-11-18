'use client';
// "Comparar as 4 versões": quatro currículos com cabeçalhos diferentes passam pela anonimização
// e se fundem numa só nota, 78 (caso b03 e contrafactuais c01, c02 e c08 das evals).
import { useId, useRef } from 'react';
import type { TextosDemo } from '@/i18n/tipos';
import { Gosma } from '../Gosma';
import { atributo, circulo, idSeguro } from '@/lava/motor';
import { Palco, lerp, trecho, useDemo, useQuadroDemo } from './Palco';
import styles from '../projeto.module.css';

const CHAVES = ['base', 'c1', 'c2', 'c3'] as const;

function geometria(v: boolean) {
  return v
    ? {
        w: 360,
        h: 580,
        inicio: [56, 140, 224, 308].map((x) => ({ x, y: 64 })),
        rotulo: (x: number, y: number) => ({ x, y: y + 52, ancora: 'middle' as const }),
        anel: { x: 180, y: 280, r: 58 },
        nota: { x: 180, y: 470, r: 86 },
        r: 26,
      }
    : {
        w: 1312,
        h: 440,
        inicio: [70, 163, 257, 350].map((y) => ({ x: 120, y })),
        rotulo: (x: number, y: number) => ({ x: x + 52, y: y + 6, ancora: 'start' as const }),
        anel: { x: 660, y: 220, r: 78 },
        nota: { x: 1080, y: 220, r: 118 },
        r: 34,
      };
}

function cena(v: boolean, p: number, t: number) {
  const g = geometria(v);
  const gotas = g.inicio.map((s, i) => {
    const d = i * 0.05;
    const k1 = trecho(p, d, 0.38 + d);
    const k2 = trecho(p, 0.5 + d * 0.5, 0.82 + d * 0.5);
    const bal = 4 * Math.sin(t * 1.3 + i * 1.7);
    const ang = (i / 4) * Math.PI * 2 + t * 0.4;
    const anel = { x: g.anel.x + Math.cos(ang) * g.anel.r * 0.45, y: g.anel.y + Math.sin(ang) * g.anel.r * 0.45 };
    const x = k2 > 0 ? lerp(anel.x, g.nota.x, k2) : lerp(s.x, anel.x, k1);
    const y = k2 > 0 ? lerp(anel.y, g.nota.y, k2) : lerp(s.y + bal, anel.y, k1);
    return { x, y, r: g.r * (1 - 0.3 * k1) * (1 - k2) };
  });
  const cresce = trecho(p, 0.55, 0.95);
  return { g, gotas, nota: g.nota.r * cresce, rotulos: 1 - trecho(p, 0, 0.2), placar: trecho(p, 0.85, 1) };
}

export function DemoConfere({ t, titulo, rotulo }: { t: TextosDemo; titulo: string; rotulo: string }) {
  const uid = idSeguro(useId());
  const palco = useRef<HTMLDivElement>(null);
  const { fase, vertical, p, avancar, enviar } = useDemo(palco, 3);
  const els = useRef<(SVGCircleElement | null)[]>([]);
  const nota = useRef<SVGCircleElement>(null);
  const rotulos = useRef<SVGGElement>(null);
  const placar = useRef<SVGGElement>(null);

  useQuadroDemo(palco, avancar, (tt) => {
    const c = cena(vertical, p.current, tt);
    c.gotas.forEach((d, i) => circulo(els.current[i], d.x, d.y, d.r));
    circulo(nota.current, c.g.nota.x, c.g.nota.y, c.nota);
    atributo(rotulos.current, 'opacity', c.rotulos.toFixed(2));
    atributo(placar.current, 'opacity', c.placar.toFixed(2));
  });

  const c = cena(vertical, p.current, 0);
  const g = c.g;
  return (
    <Palco t={t} titulo={titulo} rotulo={rotulo} cor="var(--confere)" fase={fase} enviar={enviar} palco={palco}>
      <svg viewBox={`0 0 ${g.w} ${g.h}`} className={styles.palcoSvg} role="img" aria-label={fase === 'depois' ? t.palcoDepois : t.palcoAntes}>
        <defs>
          <Gosma id={`${uid}g`} desvio={vertical ? 9 : 12} />
        </defs>
        <circle cx={g.anel.x} cy={g.anel.y} r={g.anel.r} fill="none" stroke="var(--confere)" strokeWidth="2" strokeDasharray="6 8" opacity={0.8} />
        <text x={g.anel.x} y={g.anel.y + g.anel.r + 28} textAnchor="middle" className={styles.svgPequeno}>
          {t.rotulos.anon}
        </text>
        <g filter={`url(#${uid}g)`}>
          <circle ref={nota} cx={g.nota.x} cy={g.nota.y} r={c.nota} fill="var(--confere)" />
          {c.gotas.map((d, i) => (
            <circle key={i} ref={(el) => void (els.current[i] = el)} cx={d.x} cy={d.y} r={d.r} fill="var(--confere)" />
          ))}
        </g>
        <g ref={rotulos} opacity={c.rotulos}>
          {g.inicio.map((s, i) => {
            const r = g.rotulo(s.x, s.y);
            return (
              <text key={i} x={r.x} y={r.y} textAnchor={r.ancora} className={vertical ? styles.svgMinimo : styles.svgPequeno}>
                {t.rotulos[CHAVES[i]!]}
              </text>
            );
          })}
        </g>
        <g ref={placar} opacity={c.placar}>
          <text x={g.nota.x} y={g.nota.y + (vertical ? 10 : 16)} textAnchor="middle" className={`${styles.svgEnorme} ${styles.sobreGota}`}>
            78
          </text>
          <text x={g.nota.x} y={g.nota.y + (vertical ? 40 : 52)} textAnchor="middle" className={`${styles.svgPequeno} ${styles.sobreGota}`}>
            {t.rotulos.nota}
          </text>
        </g>
      </svg>
    </Palco>
  );
}
