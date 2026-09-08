import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

test('every published post has a built page, valid article links and no math errors', () => {
  const root = resolve('src/content/posts');
  const files = readdirSync(root).filter(name => name.endsWith('.md'));
  expect(files.length).toBeGreaterThan(0);
  for (const file of files) {
    const source = readFileSync(resolve(root, file), 'utf8');
    if (/^draft:\s*true\s*$/m.test(source.split(/^---\s*$/m)[1] ?? '')) continue;
    const slug = file.slice(0, -3);
    const target = resolve('dist/posts', slug, 'index.html');
    expect(existsSync(target), `${file}: missing built page`).toBe(true);
    const html = readFileSync(target, 'utf8');
    expect(html, `${file}: math parse error`).not.toMatch(/class="[^"]*\bkatex-error\b/);
    for (const match of html.matchAll(/href="(\/posts\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
      const pathname = decodeURIComponent(match[1]).replace(/^\//, '').replace(/\/$/, '');
      expect(existsSync(resolve('dist', pathname, 'index.html')),
        `${file}: broken article link ${match[1]}`).toBe(true);
    }
  }
});

test('attention formulas render with local fonts on mobile', async ({ page }) => {
  await page.route('**/api/comment**', route => route.fulfill({ status: 503, body: '{}' }));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/posts/deep-learning-07-transformer-attention/');
  await expect(page.locator('.prose .katex').first()).toBeVisible();
  await expect(page.locator('.prose .katex-error')).toHaveCount(0);
  expect(await page.locator('.prose .katex-display').count()).toBeGreaterThan(2);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('16px KaTeX_Main'))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('math works even when an old post says math false', async ({ page }) => {
  await page.route('**/api/comment**', route => route.fulfill({ status: 503, body: '{}' }));
  await page.goto('/posts/gnn-graph-neural-network/');
  await expect(page.locator('.prose .katex').first()).toBeVisible();
  await expect(page.locator('.prose .katex-error')).toHaveCount(0);
});

test('comment errors stay visible and a retry can recover', async ({ page }) => {
  let available = false;
  await page.route('**/api/comment**', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(available
      ? { errno: 0, data: { count: 0, totalPages: 0, pageSize: 10, curPage: 1, data: [] } }
      : { errno: 500, errmsg: 'Database unavailable' }),
  }));
  await page.goto('/posts/deep-learning-07-transformer-attention/');
  await expect(page.locator('.comments-status')).toContainText('目前无法提交');
  await expect(page.locator('.waline-wrap')).toBeHidden();
  available = true;
  await page.getByRole('button', { name: '重新检查' }).click();
  await expect(page.locator('.waline-wrap')).toBeVisible();
  await expect(page.locator('.wl-editor')).toBeVisible();
  await expect(page.locator('.comments-status')).toBeHidden();
});
