import { defineConfig } from '@playwright/test';

// Roda contra o export estático (npm run build antes). Usa o Chrome instalado na máquina.
export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: 'http://localhost:4321', channel: 'chrome' },
  webServer: { command: 'node scripts/servir.mjs', url: 'http://localhost:4321', reuseExistingServer: true },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'celular', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
});
