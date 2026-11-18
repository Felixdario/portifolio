'use client';
// Gotas paradas no canto do contato; o cursor vira uma gota que gruda nelas.
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Gosma } from './Gosma';
import { aproximar, atributo, circulo, idSeguro, useLava } from '@/lava/motor';
import styles from './home.module.css';

const GOTAS = [
  { cor: 'var(--sobra)', fx: 0.78, fy: 0.42, r: 92, ph: 0 },
  { cor: 'var(--pontual)', fx: 0.9, fy: 0.2, r: 58, ph: 1.7 },
  { cor: 'var(--pulo)', fx: 0.66, fy: 0.66, r: 64, ph: 3.1 },
  { cor: 'var(--confere)', fx: 0.92, fy: 0.68, r: 48, ph: 4.4 },
];

type Area = { w: number; h: number; s: number };

function cena(a: Area, t: number) {
  return GOTAS.map((g) => ({
    x: g.fx * a.w + 46 * a.s * Math.sin(t * 0.3 + g.ph),
    y: g.fy * a.h + 36 * a.s * Math.cos(t * 0.25 + g.ph * 1.3),
    r: g.r * a.s * (1 + 0.07 * Math.sin(t * 0.6 + g.ph)),
  }));
}

export function ContatoLava({ children, className }: { children: ReactNode; className?: string }) {
  const uid = idSeguro(useId());
  const raiz = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const els = useRef<(SVGCircleElement | null)[]>([]);
  const cursorEl = useRef<SVGCircleElement>(null);
  const area = useRef<Area>({ w: 1312, h: 520, s: 1 });
  const m = useRef({ x: -400, y: -400, tx: -400, ty: -400, r: 0, tr: 0 });

  useEffect(() => {
    const medir = () => {
      const r = svg.current?.getBoundingClientRect();
      if (!r || !r.width) return;
      const s = r.width < 760 ? 0.55 : Math.min(1, r.width / 1312);
      area.current = { w: r.width, h: r.height, s };
      atributo(svg.current, 'viewBox', `0 0 ${r.width.toFixed(0)} ${r.height.toFixed(0)}`);
    };
    medir();
    const ro = new ResizeObserver(medir);
    if (raiz.current) ro.observe(raiz.current);
    return () => ro.disconnect();
  }, []);

  useLava(raiz, (t, _dt, parado) => {
    cena(area.current, t).forEach((g, i) => circulo(els.current[i], g.x, g.y, g.r));
    const c = m.current;
    c.x = aproximar(c.x, c.tx, 0.18, parado);
    c.y = aproximar(c.y, c.ty, 0.18, parado);
    c.r = aproximar(c.r, c.tr, 0.15, parado);
    circulo(cursorEl.current, c.x, c.y, c.r);
  });

  const inicial = cena({ w: 1312, h: 520, s: 1 }, 0);
  return (
    <div
      ref={raiz}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = svg.current?.getBoundingClientRect();
        if (!r) return;
        const c = m.current;
        c.tx = e.clientX - r.left;
        c.ty = e.clientY - r.top;
        c.tr = 40 * area.current.s;
        if (c.x < -300) {
          c.x = c.tx;
          c.y = c.ty;
        }
      }}
      onPointerLeave={() => (m.current.tr = 0)}
    >
      <svg ref={svg} className={styles.ctSvg} viewBox="0 0 1312 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <Gosma id={`${uid}g`} desvio={20} />
        </defs>
        <g filter={`url(#${uid}g)`}>
          {inicial.map((g, i) => (
            <circle key={i} ref={(el) => void (els.current[i] = el)} cx={g.x} cy={g.y} r={g.r} fill={GOTAS[i]?.cor} />
          ))}
          <circle ref={cursorEl} cx={-400} cy={-400} r={0} fill="var(--epays)" />
        </g>
      </svg>
      {children}
    </div>
  );
}
