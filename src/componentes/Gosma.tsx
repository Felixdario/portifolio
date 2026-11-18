// Filtro "gooey": desfoca e depois corta o alfa, para os círculos se fundirem como líquido.
export function Gosma({ id, desvio, corte = '30 -13' }: { id: string; desvio: number; corte?: string }) {
  return (
    <filter id={id} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
      <feGaussianBlur in="SourceGraphic" stdDeviation={desvio} result="b" />
      <feColorMatrix in="b" mode="matrix" values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${corte}`} />
    </filter>
  );
}

export function Brilho({ id, desvio }: { id: string; desvio: number }) {
  return (
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation={desvio} />
    </filter>
  );
}
