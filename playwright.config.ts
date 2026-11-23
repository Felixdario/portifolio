import { defineConfig, devices } from '@playwright/test';

// Roda contra o export estático (npm run build antes). Usa o Chrome instalado na máquina.
// E2E_TODOS=1 também roda no Firefox, no WebKit (motor do Safari) e num iPhone emulado no WebKit;
// precisa de `npx playwright install firefox webkit` uma vez.
const outros = process.env.E2E_TODOS
  ? [
      { name: 'firefox', use: { browserName: 'firefox' as const, viewport: { width: 1440, height: 900 } } },
      { name: 'webkit', use: { browserName: 'webkit' as const, viewport: { width: 1440, height: 900 } } },
      { name: 'iphone', use: { ...devices['iPhone 13'] } },
    ]
  : [];

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: 'http://localhost:4321' },
  webServer: { command: 'node scripts/servir.mjs', url: 'http://localhost:4321', reuseExistingServer: true },
  projects: [
    { name: 'desktop', use: { channel: 'chrome', viewport: { width: 1440, height: 900 } } },
    { name: 'celular', use: { channel: 'chrome', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    ...outros,
  ],
});
