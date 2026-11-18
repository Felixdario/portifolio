import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import sharp from 'sharp';

const PAGINAS = [
  '/',
  '/projetos/sobra/',
  '/projetos/pontual/',
  '/projetos/pulo/',
  '/projetos/confere/',
  '/en/',
  '/en/projects/sobra/',
  '/en/projects/pontual/',
  '/en/projects/pulo/',
  '/en/projects/confere/',
];

async function rolarTudo(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
}

for (const tema of ['dark', 'light'] as const) {
  for (const url of PAGINAS) {
    test(`${url} · ${tema}: sem violações de axe, sem rolagem lateral, sem erros`, async ({ page }) => {
      const erros: string[] = [];
      page.on('pageerror', (e) => erros.push(String(e)));
      page.on('console', (m) => {
        if (m.type() === 'error') erros.push(m.text());
      });
      await page.addInitScript((t) => localStorage.setItem('tema', t), tema);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(url);
      await expect(page.locator('html')).toHaveAttribute('data-theme', tema);
      await rolarTudo(page);
      await page.waitForLoadState('networkidle');

      const sobra = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(sobra).toBeLessThanOrEqual(0);

      const quebradas = await page.evaluate(() =>
        [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src),
      );
      expect(quebradas).toEqual([]);

      // O nome e o e-mail usam mix-blend-mode: difference; o axe não compõe o blend e erra o contraste.
      const r = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .exclude('h1')
        .exclude('a[href^="mailto:"]')
        .analyze();
      expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([]);
      expect(erros).toEqual([]);
    });
  }
}

test('hreflang e seletor de idioma levam à mesma página no outro idioma', async ({ page }) => {
  await page.goto('/projetos/pulo/');
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', /\/en\/projects\/pulo\/$/);
  await page.getByRole('link', { name: 'Read in English' }).click();
  await expect(page).toHaveURL(/\/en\/projects\/pulo\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pulo');
});

test('demonstração do Pontual: o botão leva ao resultado do teste', async ({ page }) => {
  await page.goto('/projetos/pontual/');
  await expect(page.getByText('Aperte o botão para mandar os 20 pedidos juntos.')).toBeVisible();
  await page.getByRole('button', { name: 'Enviar os 20 pedidos' }).click();
  await expect(page.getByText('1 reserva confirmada. 19 pedidos recusados com 409 HORARIO_INDISPONIVEL.')).toBeVisible({ timeout: 8000 });
  await expect(page.getByRole('button', { name: 'Enviar de novo' })).toBeEnabled();
});

test('com movimento reduzido, a demonstração já mostra o resultado', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/projetos/sobra/');
  const fim = page.getByText('3,34 + 3,33 + 3,33 = 10,00.', { exact: false });
  await expect(fim).toBeVisible();
  await page.getByRole('button', { name: 'Dividir de novo' }).click();
  await expect(fim).toBeVisible();
});

test('sem JavaScript: textos e links funcionam e a demonstração mostra o estado final', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://localhost:4321' });
  const page = await ctx.newPage();
  await page.goto('/projetos/pulo/');
  await expect(page.getByText('Todos os cliques gravados, nenhum duplicado.', { exact: false })).toBeVisible();
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Projetos', level: 2 })).toBeVisible();
  await expect(page.locator('a[href="/projetos/confere/"]').first()).toBeVisible();
  await ctx.close();
});

test('o tema escolhido fica salvo entre páginas', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Usar tema claro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.goto('/projetos/sobra/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('button', { name: 'Usar tema escuro' })).toBeVisible();
});

test('menu abre as âncoras da home e fecha com Esc', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu' }).click();
  const folha = page.getByRole('dialog', { name: 'Navegação' });
  await expect(folha).toBeVisible();
  await expect(folha.getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '#sobre');
  await page.keyboard.press('Escape');
  await expect(folha).toBeHidden();
});

// O axe não compõe mix-blend-mode, então o nome e o e-mail são medidos pelos pixels da tela:
// sem as gotas, o texto tem de se destacar do fundo nos dois temas.
for (const tema of ['dark', 'light'] as const) {
  for (const [url, seletor] of [
    ['/', 'h1'],
    ['/', 'a[href^="mailto:"]'],
    ['/projetos/confere/', 'h1'],
  ] as const) {
    test(`${url} ${seletor} · ${tema}: o texto com difference é legível`, async ({ page }) => {
      await page.addInitScript((t) => localStorage.setItem('tema', t), tema);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(url);
      await page.addStyleTag({ content: 'svg{visibility:hidden!important} [data-entra]{opacity:1!important;transform:none!important}' });
      const el = page.locator(seletor).first();
      await el.scrollIntoViewIfNeeded();
      const png = await el.screenshot();
      const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
      const lum = (i: number) => (0.2126 * data[i]! + 0.7152 * data[i + 1]! + 0.0722 * data[i + 2]!) / 255;
      const fundo = lum(0);
      let fortes = 0;
      for (let i = 0; i < data.length; i += info.channels) if (Math.abs(lum(i) - fundo) > 0.5) fortes++;
      expect(fortes / (info.width * info.height)).toBeGreaterThan(0.08);
    });
  }
}

for (const [tema, cor] of [
  ['dark', 'rgb(246, 163, 199)'],
  ['light', 'rgb(168, 35, 95)'],
] as const) {
  test(`hover dos links muda de cor · ${tema}`, async ({ page, isMobile }) => {
    test.skip(isMobile, 'celular não tem hover');
    await page.addInitScript((t) => localStorage.setItem('tema', t), tema);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const link = page.getByRole('link', { name: '→ ver projetos' });
    const antes = await link.evaluate((el) => getComputedStyle(el).color);
    await link.hover();
    await expect.poll(() => link.evaluate((el) => getComputedStyle(el).color)).toBe(cor);
    expect(antes).not.toBe(cor);
    const menu = page.getByRole('button', { name: 'Menu' });
    await menu.hover();
    await expect.poll(() => menu.evaluate((el) => getComputedStyle(el).color)).toBe(cor);
  });
}
