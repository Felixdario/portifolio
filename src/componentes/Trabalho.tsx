'use client';
// Trabalho e TCC. Epays: uma gota âmbar com peças pequenas (os componentes) que grudam no hover.
// SportLink: três gotas coral (web, app e API) que formam uma só; cada parte da lista faz a sua crescer.
import { useId, useRef, useState } from 'react';
import { Brilho, Gosma } from './Gosma';
import { aproximar, circulo, elipse, idSeguro, useLava } from '@/lava/motor';
import { Rico } from './Rico';
import type { Dicionario } from '@/i18n/tipos';
import styles from './home.module.css';

type Props = {
  t: Dicionario['tb'];
  links: { aoVivo: string; web: string; app: string; api: string };
};

function epays(t: number, f: number) {
  const ax = 240 + 8 * Math.sin(t * 0.4);
  const ay = 240 + 8 * Math.cos(t * 0.33);
  const R = 140 * (1 + 0.04 * Math.sin(t * 0.6)) * (1 + 0.1 * f);
  const gotas = [{ x: ax, y: ay, r: R }];
  for (let i = 0; i < 5; i++) {
    const ang = i * 1.256 + t * 0.3;
    const d = (R + 40 + 10 * Math.sin(t * 0.8 + i)) * (1 - 0.75 * f);
    gotas.push({ x: ax + Math.cos(ang) * d, y: ay + Math.sin(ang) * d, r: 21 - (i % 2) * 6 });
  }
  return { gotas, brilho: { x: ax - R * 0.34, y: ay - R * 0.42, rx: R * 0.3, ry: R * 0.16 } };
}

const BASE_SPORT = [
  { x: 190, y: 150 },
  { x: 320, y: 255 },
  { x: 175, y: 320 },
];

function sport(t: number, f: number[]) {
  return BASE_SPORT.map((o, i) => ({
    x: o.x + 18 * Math.sin(t * 0.35 + i * 2.1),
    y: o.y + 14 * Math.cos(t * 0.3 + i * 1.7),
    r: (100 - i * 8) * (1 + 0.05 * Math.sin(t * 0.6 + i * 2)) * (1 + 0.28 * (f[i] ?? 0)),
  }));
}

export function Trabalho({ t, links }: Props) {
  const uid = idSeguro(useId());
  const [focoEpays, setFocoEpays] = useState(false);
  const [focoParte, setFocoParte] = useState<number | null>(null);
  const svgA = useRef<SVGSVGElement>(null);
  const svgB = useRef<SVGSVGElement>(null);
  const a = useRef<(SVGCircleElement | null)[]>([]);
  const aBrilho = useRef<SVGEllipseElement>(null);
  const b = useRef<(SVGCircleElement | null)[]>([]);
  const bRotulo = useRef<(SVGTextElement | null)[]>([]);
  const fA = useRef(0);
  const fB = useRef([0, 0, 0]);
  const alvoA = useRef(false);
  const alvoB = useRef<number | null>(null);
  alvoA.current = focoEpays;
  alvoB.current = focoParte;

  useLava(svgA, (tt, _dt, parado) => {
    fA.current = aproximar(fA.current, alvoA.current ? 1 : 0, 0.1, parado);
    const c = epays(tt, fA.current);
    c.gotas.forEach((g, k) => circulo(a.current[k], g.x, g.y, g.r));
    elipse(aBrilho.current, c.brilho.x, c.brilho.y, c.brilho.rx, c.brilho.ry);
  });

  useLava(svgB, (tt, _dt, parado) => {
    for (let i = 0; i < 3; i++) fB.current[i] = aproximar(fB.current[i] ?? 0, alvoB.current === i ? 1 : 0, 0.1, parado);
    sport(tt, fB.current).forEach((g, k) => {
      circulo(b.current[k], g.x, g.y, g.r);
      const r = bRotulo.current[k];
      if (r) {
        r.setAttribute('x', g.x.toFixed(1));
        r.setAttribute('y', (g.y + 8).toFixed(1));
      }
    });
  });

  const ea = epays(0, 0);
  const sb = sport(0, [0, 0, 0]);
  const partes = [
    { texto: t.tcc.web, href: links.web, rotulo: 'Web' },
    { texto: t.tcc.app, href: links.app, rotulo: 'App' },
    { texto: t.tcc.api, href: links.api, rotulo: 'API' },
  ];

  return (
    <>
      <svg width="0" height="0" className={styles.defs} aria-hidden="true">
        <defs>
          <Gosma id={`${uid}g`} desvio={18} />
          <Brilho id={`${uid}b`} desvio={12} />
        </defs>
      </svg>

      <article
        className={styles.tbEpays}
        data-entra
        aria-labelledby={`${uid}-epays`}
        onPointerEnter={() => setFocoEpays(true)}
        onPointerLeave={() => setFocoEpays(false)}
        onFocus={() => setFocoEpays(true)}
        onBlur={() => setFocoEpays(false)}
      >
        <div className={styles.tbGotaA}>
          <svg ref={svgA} viewBox="0 0 480 480" aria-hidden="true">
            <g filter={`url(#${uid}g)`}>
              {ea.gotas.map((g, k) => (
                <circle key={k} ref={(el) => void (a.current[k] = el)} cx={g.x} cy={g.y} r={g.r} fill="var(--epays)" />
              ))}
            </g>
            <g filter={`url(#${uid}b)`}>
              <ellipse ref={aBrilho} cx={ea.brilho.x} cy={ea.brilho.y} rx={ea.brilho.rx} ry={ea.brilho.ry} fill="#fff" fillOpacity={0.42} />
            </g>
          </svg>
          <p className={styles.tbGotaTexto} aria-hidden="true">
            <span>{t.epays.gota}</span>
            <small>{t.epays.gotaData}</small>
          </p>
        </div>
        <div>
          <span className="rotulo">{t.epays.meta}</span>
          <h3 id={`${uid}-epays`} className={styles.tbCargo}>
            {t.epays.cargo}
          </h3>
          <div className={styles.tbDuas}>
            <div>
              <h4 className={styles.tbSub}>{t.epays.libTitulo}</h4>
              <p>{t.epays.lib}</p>
            </div>
            <div>
              <h4 className={styles.tbSub}>{t.epays.epjotaTitulo}</h4>
              <p>{t.epays.epjota}</p>
            </div>
          </div>
          <p className={styles.tbStack}>{t.epays.stack}</p>
          <p className={styles.tbRessalva}>{t.epays.ressalva}</p>
        </div>
      </article>

      <article data-entra className={styles.tbTcc} aria-labelledby={`${uid}-tcc`} onPointerLeave={() => setFocoParte(null)}>
        <div>
          <span className="rotulo">{t.tcc.meta}</span>
          <h3 id={`${uid}-tcc`} className={styles.tbNome}>
            {t.tcc.nome}
          </h3>
          <p className={styles.tbFrase}>{t.tcc.frase}</p>
          <p className={styles.tbPartesIntro}>{t.tcc.partes}</p>
          <ul className={styles.tbPartes}>
            {partes.map((p, i) => (
              <li
                key={p.href}
                data-apagado={focoParte !== null && focoParte !== i ? '' : undefined}
                onPointerEnter={() => setFocoParte(i)}
                onFocus={() => setFocoParte(i)}
                onBlur={() => setFocoParte(null)}
              >
                <span className={styles.ponto} style={{ background: 'var(--sport)' }} data-grande={focoParte === i ? '' : undefined} aria-hidden="true" />
                <span>
                  <Rico texto={p.texto} /> ·{' '}
                  <a href={p.href}>
                    {t.tcc.repositorio}
                    <span className="sr"> · {p.rotulo}</span>
                  </a>
                </span>
              </li>
            ))}
          </ul>
          <a className={`botao ${styles.tbAoVivo}`} href={links.aoVivo}>
            {t.tcc.aoVivo}
          </a>
        </div>
        <div className={styles.tbGotaB}>
          <svg ref={svgB} viewBox="0 0 480 440" aria-hidden="true">
            <g filter={`url(#${uid}g)`}>
              {sb.map((g, k) => (
                <circle key={k} ref={(el) => void (b.current[k] = el)} cx={g.x} cy={g.y} r={g.r} fill="var(--sport)" />
              ))}
            </g>
            {sb.map((g, k) => (
              <text
                key={k}
                ref={(el) => void (bRotulo.current[k] = el)}
                x={g.x}
                y={g.y + 8}
                textAnchor="middle"
                className={styles.tbRotuloGota}
              >
                {partes[k]?.rotulo}
              </text>
            ))}
          </svg>
        </div>
      </article>
    </>
  );
}
