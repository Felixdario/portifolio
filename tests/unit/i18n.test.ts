import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { pt } from '@/i18n/pt';
import { en } from '@/i18n/en';
import { PROJETOS, SLUGS, proximo } from '@/data/projetos';

/** Lista "caminho:tipo" de cada folha, para comparar a forma dos dois dicionários. */
function forma(o: unknown, prefixo = ''): string[] {
  if (Array.isArray(o)) return [`${prefixo}[${o.length}]`, ...o.flatMap((v, i) => forma(v, `${prefixo}[${i}]`))];
  if (o && typeof o === 'object') return Object.entries(o).flatMap(([k, v]) => forma(v, prefixo ? `${prefixo}.${k}` : k));
  return [`${prefixo}:${typeof o}`];
}

function folhas(o: unknown): string[] {
  if (typeof o === 'string') return [o];
  if (o && typeof o === 'object') return Object.values(o).flatMap(folhas);
  return [];
}

describe('dicionários', () => {
  it('PT e EN têm exatamente as mesmas chaves e listas do mesmo tamanho', () => {
    expect(forma(en)).toEqual(forma(pt));
  });

  it('nenhum texto vazio, sem mojibake e sem marcadores de rascunho', () => {
    for (const s of [...folhas(pt), ...folhas(en)]) {
      expect(s.trim()).not.toBe('');
      expect(s).not.toMatch(/Ã[^O]|â€|Â|PENDENTE|EM CONSTRUÇÃO/);
      expect(s).not.toMatch(/lorem ipsum/i);
    }
  });

  it('cada projeto tem uma alt por captura, nos dois idiomas', () => {
    for (const p of PROJETOS) {
      expect(pt.projetos[p.slug].pagina.capturasAlt).toHaveLength(p.capturas.length);
      expect(en.projetos[p.slug].pagina.capturasAlt).toHaveLength(p.capturas.length);
    }
  });

  it('o número da home aparece também nos números da página (mesmo fato)', () => {
    expect(pt.projetos.sobra.pagina.numeros[0].valor).toBe(pt.projetos.sobra.numero);
    expect(pt.projetos.pulo.pagina.numeros[0].valor).toBe(pt.projetos.pulo.numero);
    expect(en.projetos.pulo.pagina.numeros[0].valor).toBe(en.projetos.pulo.numero);
  });

  it('o asterisco do Confere sempre vem com a ressalva', () => {
    for (const d of [pt, en]) {
      const c = d.projetos.confere;
      expect(c.numeroLegenda).toContain('*');
      expect(c.ressalva).toMatch(/^\*/);
      expect(c.pagina.demonstracao.prova).toContain('*');
    }
  });
});

describe('dados', () => {
  it('ordem decidida: Sobra, Pontual, Pulo, Confere', () => {
    expect(SLUGS).toEqual(['sobra', 'pontual', 'pulo', 'confere']);
  });

  it('o próximo projeto dá a volta', () => {
    expect(proximo('confere').slug).toBe('sobra');
    expect(proximo('pontual').slug).toBe('pulo');
  });

  it('toda imagem citada existe em public/img', () => {
    for (const p of PROJETOS) {
      const arquivos = [
        `${p.capa}.webp`,
        `${p.capa}-800.webp`,
        ...p.capturas.flatMap((c) => (c.forma !== 'celular' ? [`${c.arquivo}.webp`, `${c.arquivo}-800.webp`] : [`${c.arquivo}.webp`])),
      ];
      for (const a of arquivos) expect(existsSync(`public/img/${a}`), a).toBe(true);
    }
  });

  it('repositórios usam os nomes públicos (Pontual, não Agenda)', () => {
    expect(PROJETOS.map((p) => p.repo)).toEqual([
      'https://github.com/Felixdario/Sobra',
      'https://github.com/Felixdario/Pontual',
      'https://github.com/Felixdario/Pulo',
      'https://github.com/Felixdario/Confere',
    ]);
  });
});
