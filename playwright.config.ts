import { defineConfig } from '@playwright/test';

// E2E runs against the production build so route, metadata, and sitemap
// behavior match what the Worker deployment serves.
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  fullyParallel: true,
  retries: 0,
  use: {
    baseURL: 'http://localhost:4321',
    // Optional installed browser for machines without the pinned Playwright binary.
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
  },
  webServer: {
    command: 'node node_modules/astro/astro.js build && node node_modules/astro/astro.js preview --port 4321',
    url: 'http://localhost:4321/',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
