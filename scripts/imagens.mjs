// Converte as capturas de assets/capturas/<projeto>/*.png em WebP para public/img/.
// Desktop: recorta o topo em 16:10 e gera 1440 e 800 px de largura.
// Celular (mais alto que largo): mantém a proporção e gera a largura nativa.
// Uso: npm run imagens
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ORIGEM = 'assets/capturas';
const DESTINO = 'public/img';

await mkdir(DESTINO, { recursive: true });

for (const projeto of await readdir(ORIGEM)) {
  for (const arquivo of await readdir(path.join(ORIGEM, projeto))) {
    if (!arquivo.endsWith('.png')) continue;
    const entrada = path.join(ORIGEM, projeto, arquivo);
    const nome = `${projeto}-${arquivo.replace(/\.png$/, '')}`;
    const { width, height } = await sharp(entrada).metadata();
    const celular = width < 900;
    if (celular) {
      await sharp(entrada).webp({ quality: 90, smartSubsample: true }).toFile(path.join(DESTINO, `${nome}.webp`));
    } else {
      const alto = Math.min(height, Math.round(width / 1.6));
      for (const largura of [1440, 800]) {
        await sharp(entrada)
          .extract({ left: 0, top: 0, width, height: alto })
          .resize({ width: largura })
          .webp({ quality: 90, smartSubsample: true })
          .toFile(path.join(DESTINO, `${nome}${largura === 800 ? '-800' : ''}.webp`));
      }
    }
    console.log(nome, celular ? 'celular' : 'desktop');
  }
}
