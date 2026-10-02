import { test, expect } from '@playwright/test';

test('survival trial uses the existing game archive and lazy real media', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  expect((await page.goto('/games/'))?.status()).toBe(200);
  const card = page.locator('#game-blind-box-survival');
  await expect(card.getByRole('heading')).toContainText('末日开箱客');
  await expect(card).toContainText('18+ · 公开测试');
  await expect(card).toContainText('PC Web / HTML5');
  await expect(page.locator('.game-showcase')).toHaveCount(4);
  await expect(card.getByRole('link', { name:'在线游玩' })).toHaveAttribute('href', '/games/blind-box-survival/');
  await expect(card.locator('video')).toHaveCount(0);
  const poster = card.locator('.gs-video-loader img');
  await expect.poll(() => poster.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await card.getByRole('button', { name:'播放《末日开箱客》演示视频' }).click();
  await expect.poll(() => card.locator('video').evaluate((video: HTMLVideoElement) => video.readyState >= 1)).toBe(true);
  await expect(card.locator('video source')).toHaveAttribute('src', '/videos/blind-box-survival-demo.mp4');
  await card.locator('.gs-corner-toggle').click();
  await expect(card.locator('[data-type="shot"]')).toHaveClass(/gs-display--active/);
  expect(errors).toEqual([]);
});

test('survival detail and 390px archive remain readable', async ({ page }) => {
  await page.setViewportSize({ width:390, height:844 });
  await page.goto('/games/');
  const card = page.locator('#game-blind-box-survival');
  await expect(card.getByRole('link', { name:'在线游玩' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await card.getByRole('link', { name:'详情与评论' }).click();
  await expect(page.getByRole('heading', { level:1 })).toContainText('末日开箱客');
  await expect(page.getByRole('link', { name:'开始游戏' })).toHaveAttribute('href', '/games/blind-box-survival/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('published engine shell has no template layout shift or debug build', async ({ request }) => {
  const response = await request.get('/games/blind-box-survival/');
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain('id="release-shell"');
  expect(html).not.toContain('<h1 class="header">');
  const applicationName = html.match(/System\.import\('\.\/(index\.[a-f0-9]+\.js)'\)/);
  expect(applicationName).not.toBeNull();
  const entry = await request.get(`/games/blind-box-survival/${applicationName![1]}`);
  const applicationMatch = (await entry.text()).match(/application\.[a-f0-9]+\.js/);
  expect(applicationMatch).not.toBeNull();
  const application = await request.get(`/games/blind-box-survival/${applicationMatch![0]}`);
  const settingsMatch = (await application.text()).match(/src\/settings(?:\.[a-f0-9]+)?\.json/);
  expect(settingsMatch).not.toBeNull();
  const settingsResponse = await request.get(`/games/blind-box-survival/${settingsMatch![0]}`);
  expect(settingsResponse.status()).toBe(200);
  const settings = await settingsResponse.json();
  expect(settings.engine.debug).toBe(false);
  const effect = await request.get('/games/blind-box-survival/src/effect.bin');
  expect(effect.status()).toBe(200);
  expect((await effect.body()).length).toBeGreaterThan(0);
});
