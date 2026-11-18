'use client';
// Hero da home: cada projeto é uma gota; o cursor é outra gota que gruda nelas.
// Passar o mouse (ou o foco) num projeto da lista faz a gota dele crescer e ir ao centro.
import { useEffect, useId, useRef, useState } from 'react';
import { Brilho, Gosma } from './Gosma';
import { aproximar, atributo, circulo, elipse, idSeguro, useLava } from '@/lava/motor';
import styles from './home.module.css';

type Item = { slug: string; nome: string; fato: string; cor: string; href: string };

type Props = {
  nome: string;
  frase: string;
  fraseCurta: string;
  linkProjetos: string;
  linkSobre: string;
  listaRotulo: string;
  itens: Item[];
};

type Gota = { fx: number; fy: number; r: number; ph: number };

// Posições em frações da "zona" das gotas (a coluna do meio no desktop, uma faixa no celular).
const PRINCIPAIS: Gota[] = [
  { fx: 0.53, fy: 0.33, r: 118, ph: 0 },
  { fx: 0.8, fy: 0.18, r: 96, ph: 1.7 },
  { fx: 0.77, fy: 0.67, r: 106, ph: 3.1 },
  { fx: 0.33, fy: 0.75, r: 84, ph: 4.4 },
];
const GOTINHAS: (Gota & { cor: string })[] = [
  { fx: 0.23, fy: 0.09, r: 34, ph: 0.6, cor: 'var(--sobra)' },
  { fx: 0.93, fy: 0.96, r: 40, ph: 2.2, cor: 'var(--pontual)' },
  { fx: 0.53, fy: 0.98, r: 28, ph: 3.7, cor: 'var(--pulo)' },
  { fx: 0.63, fy: 0.02, r: 30, ph: 5.0, cor: 'var(--confere)' },
  { fx: 0.34, fy: 0.55, r: 24, ph: 1.1, cor: 'var(--epays)' },
];
const CENTRO = { fx: 0.63, fy: 0.45 };

type Zona = { x: number; y: number; w: number; h: number; s: number };
const ZONA_INICIAL: Zona = { x: 500, y: 150, w: 600, h: 550, s: 1 };

function posicao(g: Gota, z: Zona, t: number, k: number) {
  return {
    x: z.x + g.fx * z.w + 64 * z.s * Math.sin(t * 0.33 + g.ph) * k,
    y: z.y + g.fy * z.h + 48 * z.s * Math.cos(t * 0.27 + g.ph * 1.3) * k,
    r: g.r * z.s * (1 + 0.07 * Math.sin(t * 0.6 + g.ph)),
  };
}

function cena(z: Zona, t: number, foco: number[]) {
  const principais = PRINCIPAIS.map((g, i) => {
    const p = posicao(g, z, t, 1);
    const f = foco[i] ?? 0;
    const cx = z.x + CENTRO.fx * z.w;
    const cy = z.y + CENTRO.fy * z.h;
    const x = p.x + (cx - p.x) * f;
    const y = p.y + (cy - p.y) * f;
    const r = p.r * (1 + 0.75 * f);
    return { x, y, r };
  });
  const gotinhas = GOTINHAS.map((g) => posicao(g, z, t, 1.1));
  return { principais, gotinhas };
}

export function Hero(props: Props) {
  const { itens } = props;
  const uid = idSeguro(useId());
  const raiz = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const zonaEl = useRef<HTMLDivElement>(null);
  const filtro = useRef<SVGFEGaussianBlurElement>(null);
  const gotas = useRef<(SVGCircleElement | null)[]>([]);
  const brilhos = useRef<(SVGEllipseElement | null)[]>([]);
  const cursorEl = useRef<SVGCircleElement>(null);
  const [focoAtivo, setFocoAtivo] = useState(-1);
  const focoAlvo = useRef(-1);
  const foco = useRef([0, 0, 0, 0]);
  const zona = useRef<Zona>(ZONA_INICIAL);
  const cursor = useRef({ x: -400, y: -400, tx: -400, ty: -400, r: 0, tr: 0 });

  // Mede a área real e ajusta o viewBox para 1 unidade = 1 px.
  useEffect(() => {
    const medir = () => {
      const s = svg.current?.getBoundingClientRect();
      const zr = zonaEl.current?.getBoundingClientRect();
      if (!s || !zr || !s.width) return;
      const escala = Math.min(zr.width / 600, zr.height / 550) * (s.width < 760 ? 0.85 : 1);
      zona.current = { x: zr.left - s.left, y: zr.top - s.top, w: zr.width, h: zr.height, s: escala };
      atributo(svg.current, 'viewBox', `0 0 ${s.width.toFixed(0)} ${s.height.toFixed(0)}`);
      atributo(filtro.current, 'stdDeviation', (22 * Math.max(0.6, escala)).toFixed(1));
    };
    medir();
    const ro = new ResizeObserver(medir);
    if (raiz.current) ro.observe(raiz.current);
    return () => ro.disconnect();
  }, []);

  useLava(raiz, (t, _dt, parado) => {
    for (let i = 0; i < 4; i++) {
      foco.current[i] = aproximar(foco.current[i] ?? 0, focoAlvo.current === i ? 1 : 0, 0.12, parado);
    }
    const c = cena(zona.current, t, foco.current);
    c.principais.forEach((p, i) => {
      circulo(gotas.current[i], p.x, p.y, p.r);
      elipse(brilhos.current[i], p.x - p.r * 0.32, p.y - p.r * 0.38, p.r * 0.34, p.r * 0.2);
    });
    c.gotinhas.forEach((p, i) => circulo(gotas.current[4 + i], p.x, p.y, p.r));
    const m = cursor.current;
    m.x = aproximar(m.x, m.tx, 0.18, parado);
    m.y = aproximar(m.y, m.ty, 0.18, parado);
    m.r = aproximar(m.r, m.tr, 0.15, parado);
    circulo(cursorEl.current, m.x, m.y, m.r);
  });

  function mover(e: React.PointerEvent) {
    if (e.pointerType !== 'mouse') return;
    const s = svg.current?.getBoundingClientRect();
    if (!s) return;
    const m = cursor.current;
    m.tx = e.clientX - s.left;
    m.ty = e.clientY - s.top;
    m.tr = 38 * zona.current.s;
    if (m.x < -300) {
      m.x = m.tx;
      m.y = m.ty;
    }
  }

  const focar = (i: number) => {
    focoAlvo.current = i;
    setFocoAtivo(i);
  };

  const inicial = cena(ZONA_INICIAL, 0, [0, 0, 0, 0]);

  return (
    <div
      ref={raiz}
      className={styles.hero}
      onPointerMove={mover}
      onPointerLeave={() => (cursor.current.tr = 0)}
    >
      <svg ref={svg} className={styles.heroSvg} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <filter id={`${uid}g`} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur ref={filtro} in="SourceGraphic" stdDeviation="22" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -13" />
          </filter>
          <Brilho id={`${uid}b`} desvio={14} />
        </defs>
        <g filter={`url(#${uid}g)`}>
          {inicial.principais.map((p, i) => (
            <circle key={i} ref={(el) => void (gotas.current[i] = el)} cx={p.x} cy={p.y} r={p.r} fill={itens[i]?.cor} />
          ))}
          {inicial.gotinhas.map((p, i) => (
            <circle key={`d${i}`} ref={(el) => void (gotas.current[4 + i] = el)} cx={p.x} cy={p.y} r={p.r} fill={GOTINHAS[i]?.cor} />
          ))}
          <circle ref={cursorEl} cx={-400} cy={-400} r={0} fill="var(--epays)" />
        </g>
        <g filter={`url(#${uid}b)`}>
          {inicial.principais.map((p, i) => (
            <ellipse
              key={i}
              ref={(el) => void (brilhos.current[i] = el)}
              cx={p.x - p.r * 0.32}
              cy={p.y - p.r * 0.38}
              rx={p.r * 0.34}
              ry={p.r * 0.2}
              fill="#fff"
              fillOpacity={0.45}
            />
          ))}
        </g>
      </svg>

      <div className={styles.heroTexto}>
        <p className={styles.heroFrase}>
          <span className={styles.longa}>{props.frase}</span>
          <span className={styles.curta}>{props.fraseCurta}</span>
        </p>
        <p className={styles.heroLinks}>
          <a href="#projetos">{props.linkProjetos}</a>
          <a href="#sobre">{props.linkSobre}</a>
        </p>
      </div>

      <div ref={zonaEl} className={styles.heroZona} />

      <ul className={styles.heroLista} aria-label={props.listaRotulo}>
        {itens.map((p, i) => (
          <li key={p.slug}>
            <a
              href={p.href}
              className={styles.heroItem}
              data-apagado={focoAtivo >= 0 && focoAtivo !== i ? '' : undefined}
              onPointerEnter={() => focar(i)}
              onPointerLeave={() => focar(-1)}
              onFocus={() => focar(i)}
              onBlur={() => focar(-1)}
            >
              <span className={styles.ponto} style={{ background: p.cor }} aria-hidden="true" />
              <strong>{p.nome}</strong>
              <span>{p.fato}</span>
            </a>
          </li>
        ))}
      </ul>

      <h1 className={styles.heroNome}>{props.nome}</h1>
    </div>
  );
}
