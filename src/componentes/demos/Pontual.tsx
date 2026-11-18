'use client';
// "Enviar os 20 pedidos": 20 gotas correm para terça 14:00; 1 se funde no horário, 19 voltam cinzas.
import { useId, useRef } from 'react';
import type { TextosDemo } from '@/i18n/tipos';
import { Gosma } from '../Gosma';
import { atributo, circulo, idSeguro } from '@/lava/motor';
import { Palco, lerp, suave, useDemo, useQuadroDemo } from './Palco';
import styles from '../projeto.module.css';

const VENCEDOR = 7;

function geometria(v: boolean) {
  const inicio: { x: number; y: number }[] = [];
  const pilha: ({ x: number; y: number } | null)[] = [];
  let k = 0;
  for (let i = 0; i < 20; i++) {
    const c = i % (v ? 5 : 4);
    const r = Math.floor(i / (v ? 5 : 4));
    inicio.push(v ? { x: 72 + c * 54 + (r % 2) * 14, y: 46 + r * 38 } : { x: 60 + c * 40 + (r % 2) * 20, y: 110 + r * 46 });
    if (i === VENCEDOR) {
      pilha.push(null);
      continue;
    }
    const c2 = k % (v ? 5 : 4);
    const r2 = Math.floor(k / (v ? 5 : 4));
    k++;
    pilha.push(v ? { x: 72 + c2 * 54 + (r2 % 2) * 14, y: 420 + r2 * 36 } : { x: 1130 + c2 * 40 + (r2 % 2) * 20, y: 110 + r2 * 46 });
  }
  return { inicio, pilha, slot: v ? { x: 180, y: 270, r: 62, anel: 84 } : { x: 656, y: 220, r: 74, anel: 96 }, w: v ? 360 : 1312, h: v ? 580 : 440 };
}

function cena(v: boolean, p: number, t: number) {
  const g = geometria(v);
  let fundido = 0;
  const gotas = g.inicio.map((s, i) => {
    const vai = suave((p - i * 0.012) / 0.4);
    const bal = 4 * Math.sin(t * 1.4 + i);
    const ang = (i / 20) * Math.PI * 2;
    const perto = { x: g.slot.x + Math.cos(ang) * g.slot.anel, y: g.slot.y + Math.sin(ang) * g.slot.anel };
    let x = lerp(s.x, perto.x, vai);
    let y = lerp(s.y + bal, perto.y, vai);
    let r = v ? 12 : 15;
    let cinza = false;
    if (i === VENCEDOR) {
      const m = suave((p - 0.4) / 0.2);
      x = lerp(x, g.slot.x, m);
      y = lerp(y, g.slot.y, m);
      r = lerp(r, 0, m);
      fundido = m;
    } else {
      const volta = suave((p - 0.5) / 0.45);
      const alvo = g.pilha[i]!;
      x = lerp(x, alvo.x, volta);
      y = lerp(y, alvo.y + bal * volta, volta);
      cinza = p > 0.45;
    }
    return { x, y, r, cinza };
  });
  return { g, gotas, fundido };
}

export function DemoPontual({ t, titulo, rotulo }: { t: TextosDemo; titulo: string; rotulo: string }) {
  const uid = idSeguro(useId());
  const palco = useRef<HTMLDivElement>(null);
  const { fase, vertical, p, avancar, enviar } = useDemo(palco, 2.6);
  const els = useRef<(SVGCircleElement | null)[]>([]);
  const slot = useRef<SVGCircleElement>(null);
  const anel = useRef<SVGCircleElement>(null);
  const rotulos = useRef<SVGGElement>(null);

  useQuadroDemo(palco, avancar, (tt) => {
    const c = cena(vertical, p.current, tt);
    c.gotas.forEach((d, i) => {
      circulo(els.current[i], d.x, d.y, d.r);
      atributo(els.current[i], 'fill', d.cinza ? 'var(--cinza)' : 'var(--pontual)');
    });
    circulo(slot.current, c.g.slot.x, c.g.slot.y, lerp(0, c.g.slot.r, c.fundido));
    atributo(anel.current, 'opacity', c.fundido > 0.95 ? '0' : '0.8');
    atributo(rotulos.current, 'data-cheio', c.fundido > 0.5 ? '1' : '0');
  });

  const c = cena(vertical, p.current, 0);
  return (
    <Palco t={t} titulo={titulo} rotulo={rotulo} cor="var(--pontual)" fase={fase} enviar={enviar} palco={palco}>
      <svg viewBox={`0 0 ${c.g.w} ${c.g.h}`} className={styles.palcoSvg} role="img" aria-label={fase === 'depois' ? t.palcoDepois : t.palcoAntes}>
        <defs>
          <Gosma id={`${uid}g`} desvio={vertical ? 8 : 10} corte="24 -10" />
        </defs>
        <circle ref={anel} cx={c.g.slot.x} cy={c.g.slot.y} r={c.g.slot.r} fill="none" stroke="var(--pontual)" strokeWidth="2" strokeDasharray="6 8" opacity={c.fundido > 0.95 ? 0 : 0.8} />
        <g filter={`url(#${uid}g)`}>
          <circle ref={slot} cx={c.g.slot.x} cy={c.g.slot.y} r={lerp(0, c.g.slot.r, c.fundido)} fill="var(--pontual)" />
          {c.gotas.map((d, i) => (
            <circle key={i} ref={(el) => void (els.current[i] = el)} cx={d.x} cy={d.y} r={d.r} fill={d.cinza ? 'var(--cinza)' : 'var(--pontual)'} />
          ))}
        </g>
        <g ref={rotulos} className={styles.slotRotulo} data-cheio={c.fundido > 0.5 ? '1' : '0'}>
          <text x={c.g.slot.x} y={c.g.slot.y - 6} textAnchor="middle" className={styles.svgPequeno}>
            {t.rotulos.dia}
          </text>
          <text x={c.g.slot.x} y={c.g.slot.y + 22} textAnchor="middle" className={styles.svgGrande}>
            {t.rotulos.hora}
          </text>
        </g>
      </svg>
    </Palco>
  );
}
