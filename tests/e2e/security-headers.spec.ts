import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const config = JSON.parse(readFileSync(new URL('../../edgeone.json', import.meta.url), 'utf8'));
const headers = Object.fromEntries(config.headers[0].headers.map(
  ({ key, value }: { key: string; value: string }) => [key.toLowerCase(), value],
));

test('candidate edge headers preserve mobile navigation, comments and game scripts', async ({ page }) => {
  const errors: string[] = [];
  const violations: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (/Content Security Policy|MIME type.*executable/.test(message.text())) violations.push(message.text());
  });
  // Astro preview does not apply vendor headers. Explicitly inject the actual
  // candidate configuration; production header acceptance is a separate check.
  await page.route('http://localhost:4321/**', async route => {
    const response = await route.fetch();
    await route.fulfill({ response, headers: { ...response.headers(), ...headers } });
  });
  await page.setViewportSize({ width: 390, height: 844 });
  const response = await page.goto('/posts/ai-learning-roadmap/');
  expect(response?.headers()['content-security-policy']).toBe(headers['content-security-policy']);
  await page.locator('.artalk').scrollIntoViewIfNeeded();
  await expect(page.locator('.atk-textarea')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/games/');
  await expect(page.locator('.game-showcase')).toHaveCount(4);
  const card = page.locator('#game-blind-box-survival');
  await card.getByRole('button', { name: '播放《末日开箱客》演示视频' }).click();
  await expect.poll(() => card.locator('video').evaluate((node: HTMLVideoElement) => node.readyState >= 1)).toBe(true);
  expect(violations).toEqual([]);
  expect(errors).toEqual([]);
});
