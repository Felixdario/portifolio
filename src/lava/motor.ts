'use client';
// Um único laço de animação para todas as cenas de lava da página.
// ~30 fps, pausa com a aba oculta e, por cena, quando ela sai da tela (useLava).
// Com prefers-reduced-motion o tempo para: nada flutua, mas hover e foco ainda mudam o tamanho.
import { useEffect, useRef, type RefObject } from 'react';

export type Quadro = (t: number, dt: number, parado: boolean) => void;

const inscritos = new Set<Quadro>();
let raf = 0;
let ultimo = 0;
let tempo = 0;
let parado = false;
let ligado = false;

function laco(agora: number) {
  raf = requestAnimationFrame(laco);
  if (agora - ultimo < 33) return;
  const dt = Math.min(0.05, (agora - ultimo) / 1000);
  ultimo = agora;
  if (!parado) tempo += dt;
  for (const q of inscritos) q(tempo, dt, parado);
}

function iniciar() {
  if (raf || !inscritos.size || document.hidden) return;
  ultimo = performance.now() - 34;
  raf = requestAnimationFrame(laco);
}

function parar() {
  cancelAnimationFrame(raf);
  raf = 0;
}

function ligar() {
  if (ligado) return;
  ligado = true;
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  parado = mq.matches;
  mq.addEventListener('change', (e) => {
    parado = e.matches;
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? parar() : iniciar()));
}

export function movimentoReduzido(): boolean {
  ligar();
  return parado;
}

function inscrever(q: Quadro): () => void {
  ligar();
  inscritos.add(q);
  iniciar();
  return () => {
    inscritos.delete(q);
    if (!inscritos.size) parar();
  };
}

/** Roda `quadro` a cada passo enquanto o elemento estiver perto da tela. */
export function useLava(ref: RefObject<Element | null>, quadro: Quadro) {
  const q = useRef(quadro);
  q.current = quadro;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let sair: (() => void) | null = null;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          sair ??= inscrever((t, dt, p) => q.current(t, dt, p));
        } else {
          sair?.();
          sair = null;
        }
      },
      { rootMargin: '120px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      sair?.();
    };
  }, [ref]);
}

type ComCache = Element & { __v?: string };

/** Atualiza um círculo só quando o valor muda (evita repintar o filtro à toa). */
export function circulo(el: SVGCircleElement | null | undefined, x: number, y: number, r: number) {
  if (!el) return;
  const v = `${x.toFixed(1)} ${y.toFixed(1)} ${Math.max(0, r).toFixed(1)}`;
  const c = el as ComCache;
  if (c.__v === v) return;
  c.__v = v;
  el.setAttribute('cx', x.toFixed(1));
  el.setAttribute('cy', y.toFixed(1));
  el.setAttribute('r', Math.max(0, r).toFixed(1));
}

export function elipse(el: SVGEllipseElement | null | undefined, x: number, y: number, rx: number, ry: number) {
  if (!el) return;
  const v = `${x.toFixed(1)} ${y.toFixed(1)} ${rx.toFixed(1)} ${ry.toFixed(1)}`;
  const c = el as ComCache;
  if (c.__v === v) return;
  c.__v = v;
  el.setAttribute('cx', x.toFixed(1));
  el.setAttribute('cy', y.toFixed(1));
  el.setAttribute('rx', Math.max(0, rx).toFixed(1));
  el.setAttribute('ry', Math.max(0, ry).toFixed(1));
}

export function atributo(el: Element | null | undefined, nome: string, valor: string) {
  if (!el || el.getAttribute(nome) === valor) return;
  el.setAttribute(nome, valor);
}

/** Aproxima `atual` de `alvo`; com movimento reduzido, pula direto. */
export const aproximar = (atual: number, alvo: number, k: number, p: boolean) =>
  p ? alvo : atual + (alvo - atual) * k;

export const fixo = (n: number) => n.toFixed(1);

/** id seguro para url(#...): o useId do React pode ter caracteres especiais. */
export const idSeguro = (id: string) => 'l' + id.replace(/[^a-zA-Z0-9_-]/g, '');
