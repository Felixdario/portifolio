'use client';
// Gota grande na cor do projeto, atrás do nome da página (que inverte de cor com difference).
import { useEffect, useId, useRef } from 'react';
import { Gosma } from './Gosma';
import { atributo, circulo, idSeguro, useLava } from '@/lava/motor';
import styles from './projeto.module.css';

type Area = { w: number; h: number; s: number };

function cena(a: Area, t: number) {
  // Fica atrás do nome (que inverte de cor), acima do resumo e da ficha: texto de leitura nunca sobre a gota.
  // Entre a barra do topo (até ~72 px) e o resumo/ficha (a partir de ~440 px no desktop).
  const cel = a.w < 760;
  const hx = a.w * (cel ? 0.82 : 0.8) + (cel ? 10 : 36 * a.s) * Math.sin(t * 0.3);
  const hy = (cel ? 172 : 250) + 14 * Math.cos(t * 0.26);
  const s = cel ? 0.42 : a.s;
  return [
    { x: hx, y: hy, r: 140 * s * (1 + 0.05 * Math.sin(t * 0.6)) },
    { x: hx - 190 * s + 24 * s * Math.sin(t * 0.5), y: hy + 80 * s, r: 48 * s },
    { x: hx + 150 * s, y: hy - 50 * s + 14 * s * Math.cos(t * 0.45), r: 34 * s },
    { x: hx - 110 * s, y: hy - 110 * s, r: (22 + 5 * Math.sin(t)) * s },
  ];
}

export function TituloLava({ cor }: { cor: string }) {
  const uid = idSeguro(useId());
  const svg = useRef<SVGSVGElement>(null);
  const els = useRef<(SVGCircleElement | null)[]>([]);
  const area = useRef<Area>({ w: 1440, h: 760, s: 1 });

  useEffect(() => {
    const medir = () => {
      const r = svg.current?.getBoundingClientRect();
      if (!r || !r.width) return;
      area.current = { w: r.width, h: r.height, s: r.width < 760 ? 0.5 : Math.min(1, r.width / 1440) };
      atributo(svg.current, 'viewBox', `0 0 ${r.width.toFixed(0)} ${r.height.toFixed(0)}`);
    };
    medir();
    const ro = new ResizeObserver(medir);
    if (svg.current) ro.observe(svg.current);
    return () => ro.disconnect();
  }, []);

  useLava(svg, (t) => cena(area.current, t).forEach((g, i) => circulo(els.current[i], g.x, g.y, g.r)));

  const inicial = cena({ w: 1440, h: 760, s: 1 }, 0);
  const cores = [cor, cor, 'var(--epays)', cor];
  return (
    <svg ref={svg} className={styles.cabecaSvg} viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <Gosma id={`${uid}g`} desvio={24} />
      </defs>
      <g filter={`url(#${uid}g)`}>
        {inicial.map((g, i) => (
          <circle key={i} ref={(el) => void (els.current[i] = el)} cx={g.x} cy={g.y} r={g.r} fill={cores[i]} />
        ))}
      </g>
    </svg>
  );
}
