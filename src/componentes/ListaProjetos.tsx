'use client';
// Lista de projetos da home. Cada linha tem a gota do projeto com o número que prova a garantia;
// hover ou foco faz a gota crescer e engolir as gotinhas, e as outras linhas ficam mais apagadas.
import { useId, useRef, useState } from 'react';
import { Brilho, Gosma } from './Gosma';
import { aproximar, circulo, elipse, idSeguro, useLava } from '@/lava/motor';
import styles from './home.module.css';

export type LinhaProjeto = {
  slug: string;
  cor: string;
  kicker: string;
  nome: string;
  numero: string;
  numeroLegenda: string;
  frase: string;
  garantia: string;
  stack: string;
  ressalva?: string;
  href: string;
  repo: string;
  capa: string;
  capaAlt: string;
};

type Props = { linhas: LinhaProjeto[]; ver: string; repo: string };

function gotasDaLinha(i: number, t: number, f: number) {
  const ph = i * 1.6;
  const R = 108 * (1 + 0.05 * Math.sin(t * 0.7 + ph)) * (1 + 0.14 * f);
  const cx = 150 + 6 * Math.sin(t * 0.4 + ph);
  const cy = 150 + 6 * Math.cos(t * 0.33 + ph);
  const gotas = [{ x: cx, y: cy, r: R }];
  [0, 2.2, 4.1].forEach((a, k) => {
    const ang = a + t * (0.35 + 0.12 * k) + ph;
    const d = (R + 34 - 10 * k) * (1 - 0.8 * f);
    gotas.push({ x: cx + Math.cos(ang) * d, y: cy + Math.sin(ang) * d * 0.9, r: (26 - 5 * k) * (1 - 0.3 * f) });
  });
  return { gotas, brilho: { x: cx - R * 0.34, y: cy - R * 0.42, rx: R * 0.3, ry: R * 0.16 } };
}

function Gota({ i, cor, ativo, uid }: { i: number; cor: string; ativo: boolean; uid: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const els = useRef<(SVGCircleElement | null)[]>([]);
  const brilho = useRef<SVGEllipseElement>(null);
  const f = useRef(0);
  const alvo = useRef(false);
  alvo.current = ativo;

  useLava(ref, (t, _dt, parado) => {
    f.current = aproximar(f.current, alvo.current ? 1 : 0, 0.1, parado);
    const c = gotasDaLinha(i, t, f.current);
    c.gotas.forEach((g, k) => circulo(els.current[k], g.x, g.y, g.r));
    elipse(brilho.current, c.brilho.x, c.brilho.y, c.brilho.rx, c.brilho.ry);
  });

  const c = gotasDaLinha(i, 0, 0);
  return (
    <svg ref={ref} className={styles.pjSvg} viewBox="0 0 300 300" aria-hidden="true">
      <g filter={`url(#${uid}g)`}>
        {c.gotas.map((g, k) => (
          <circle key={k} ref={(el) => void (els.current[k] = el)} cx={g.x} cy={g.y} r={g.r} fill={cor} />
        ))}
      </g>
      <g filter={`url(#${uid}b)`}>
        <ellipse ref={brilho} cx={c.brilho.x} cy={c.brilho.y} rx={c.brilho.rx} ry={c.brilho.ry} fill="#fff" fillOpacity={0.42} />
      </g>
    </svg>
  );
}

export function ListaProjetos({ linhas, ver, repo }: Props) {
  const uid = idSeguro(useId());
  const [foco, setFoco] = useState(-1);
  return (
    <>
      <svg width="0" height="0" className={styles.defs} aria-hidden="true">
        <defs>
          <Gosma id={`${uid}g`} desvio={14} corte="28 -12" />
          <Brilho id={`${uid}b`} desvio={10} />
        </defs>
      </svg>
      <ul className={styles.pjLista}>
        {linhas.map((p, i) => (
          <li
            key={p.slug}
            className={styles.pj}
            data-entra
            data-apagado={foco >= 0 && foco !== i ? '' : undefined}
            onPointerEnter={() => setFoco(i)}
            onPointerLeave={() => setFoco(-1)}
            onFocus={() => setFoco(i)}
            onBlur={() => setFoco(-1)}
          >
            <div className={styles.pjGota}>
              <Gota i={i} cor={p.cor} ativo={foco === i} uid={uid} />
              <p className={styles.pjNumero}>
                <span className={styles.pjValor}>{p.numero}</span>
                <span className={styles.pjLegenda}>{p.numeroLegenda}</span>
              </p>
            </div>

            <div className={styles.pjTexto}>
              <span className="rotulo">{p.kicker}</span>
              <h3 className={styles.pjNome}>{p.nome}</h3>
              <p className={styles.pjFrase}>{p.frase}</p>
              <p className={styles.pjGarantia}>{p.garantia}</p>
              <p className={styles.pjLinks}>
                <a href={p.href}>
                  {ver}
                  <span className="sr"> · {p.nome}</span>
                </a>
                <a href={p.repo}>
                  {repo}
                  <span className="sr"> · {p.nome}</span>
                </a>
              </p>
              <p className={styles.pjStack}>{p.stack}</p>
              {p.ressalva ? <p className={styles.pjRessalva}>{p.ressalva}</p> : null}
            </div>

            <div className={styles.pjCapa}>
              <img
                src={`/img/${p.capa}-800.webp`}
                srcSet={`/img/${p.capa}-800.webp 800w, /img/${p.capa}.webp 1440w`}
                sizes="(max-width: 760px) 92vw, 440px"
                width={800}
                height={500}
                alt={p.capaAlt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
