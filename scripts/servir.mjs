// Servidor estático mínimo para a pasta out/ (usado pelo Playwright e para conferir o export).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const RAIZ = path.resolve('out');
const PORTA = Number(process.env.PORT ?? 4321);
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.json': 'application/json', '.txt': 'text/plain', '.ico': 'image/x-icon',
};

createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname);
  let arq = path.join(RAIZ, p);
  if (!arq.startsWith(RAIZ)) return res.writeHead(403).end();
  try {
    if ((await stat(arq)).isDirectory()) arq = path.join(arq, 'index.html');
    res.writeHead(200, { 'content-type': TIPOS[path.extname(arq)] ?? 'application/octet-stream' });
    res.end(await readFile(arq));
  } catch {
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end(await readFile(path.join(RAIZ, '404.html')).catch(() => 'não encontrado'));
  }
}).listen(PORTA, () => console.log(`http://localhost:${PORTA}`));
