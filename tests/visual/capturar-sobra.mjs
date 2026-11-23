// Capturas do Sobra em 2× para o portfólio: painel de outubro (claro e escuro) e orçamentos de outubro.
// Antes, no repositório do Sobra: `corepack pnpm bootstrap` e `corepack pnpm dev` (web em :5173).
// Uso: node tests/visual/capturar-sobra.mjs [url-do-web] [mês AAAA-MM]
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:5173';
const mes = process.argv[3] ?? '2026-10';
const destino = 'assets/capturas/sobra';
mkdirSync(destino, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const contexto = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  locale: 'pt-BR',
  reducedMotion: 'reduce',
});
const page = await contexto.newPage();

// Conta demo do seed (só existe no banco local do Sobra); o botão da tela de entrar preenche os campos.
await page.goto(`${base}/entrar`);
await page.getByRole('button', { name: /demonstração/i }).click();
await page.getByRole('button', { name: /^Entrar$/ }).click();
await page.waitForURL((u) => !u.pathname.startsWith('/entrar'));

async function capturar(rota, nome, tema) {
  await page.emulateMedia({ colorScheme: tema, reducedMotion: 'reduce' });
  await page.goto(`${base}${rota}`);
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  // Esconde o seletor de dados de desenvolvimento (break-ui).
  await page.addStyleTag({ content: '[aria-label="Dados de desenvolvimento"]{display:none!important}' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${destino}/${nome}.png`, fullPage: true });
  console.log(`${destino}/${nome}.png`);
}

await capturar(`/?mes=${mes}`, 'capa', 'light');
await capturar(`/?mes=${mes}`, 'painel-escuro', 'dark');
await capturar(`/orcamentos?mes=${mes}`, 'orcamentos', 'light');
await browser.close();
