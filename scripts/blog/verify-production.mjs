import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

// Read-only smoke test. Does not submit comments or change remote settings.
const origin = 'https://zk.lz1031.workers.dev';
const browser = await chromium.launch({ channel:process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
try {
  const page = await browser.newPage({ viewport:{ width:390, height:844 } });
  const results = [];
  for (const path of ['/posts/learning-paths/', '/posts/deep-learning-01-training-loop/']) {
    const response = await page.goto(origin + path, { waitUntil:'domcontentloaded', timeout:60000 });
    assert.equal(response?.status(), 200, `${path}: HTTP status`);
    if (path.includes('learning-paths')) {
      assert.equal(await page.locator('#deep-learning ol li').count(), 10);
      assert.equal(await page.locator('h1').textContent(), '从一个问题开始，沿一条路线学下去');
    } else {
      await page.locator('.article-image-open').first().waitFor();
      await page.locator('.article-image-open').first().click();
      assert.equal(await page.locator('dialog').evaluate(node => node.open), true);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('dialog').evaluate(node => node.open), false);
      const plot = page.locator('img[src="/examples/blog/training-loss.svg"]').first();
      await plot.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => {
        const image = document.querySelector('img[src="/examples/blog/training-loss.svg"]');
        return image?.complete && image.naturalWidth > 0;
      });
    }
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile overflow');
    results.push({ url:page.url(), title:await page.title(), status:response.status() });
  }
  const artifacts = await page.request.get(`${origin}/examples/blog/results.json`);
  assert.equal(artifacts.status(), 200);
  const data = await artifacts.json();
  assert.equal(data.environment.device, 'cpu');
  assert.equal(data.threshold.validation_threshold, .65);
  console.log(JSON.stringify({ verifiedAt:new Date().toISOString(), results, artifacts:'available' },null,2));
} finally {
  await browser.close();
}
