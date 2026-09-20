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
  for (const [slug, batch, figure] of [
    ['ab-testing-statistics', '02', 'ab-confidence.svg'],
    ['opencv-image-interpolation-mask-roi-watermark-grayscale-tutorial', '02', 'watermark.png'],
    ['opencv-practical-projects', '02', 'counting.png'],
    ['time-series-analysis', '03', 'forecast-protocols.svg'],
    ['anomaly-detection-practice', '03', 'causal-anomaly.svg'],
    ['automl-optuna-tuning', '03', 'search-budget.svg'],
  ]) {
    const response = await page.goto(`${origin}/posts/${slug}/`, { waitUntil:'domcontentloaded', timeout:60000 });
    assert.equal(response?.status(), 200);
    const source = `/examples/blog-review-${batch}/${figure}`;
    const plot = page.locator(`img[src="${source}"]`).first();
    await plot.scrollIntoViewIfNeeded();
    await page.waitForFunction(src => {
      const image = document.querySelector(`img[src="${src}"]`);
      return image?.complete && image.naturalWidth > 0;
    }, source);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${slug}: mobile overflow`);
    results.push({ url:page.url(), title:await page.title(), status:response.status() });
  }
  const reviewArtifacts = await page.request.get(`${origin}/examples/blog-review-02/results.json`);
  assert.equal(reviewArtifacts.status(), 200);
  const review = await reviewArtifacts.json();
  assert.equal(review.vision.synthetic_disk_count, 3);
  assert.equal(review.article_classifier.cases_passed, 6);
  assert(Math.abs(review.statistics.two_sided_p - .06674827835535253) < 1e-10);
  const validationArtifacts = await page.request.get(`${origin}/examples/blog-review-03/results.json`);
  assert.equal(validationArtifacts.status(), 200);
  const validation = await validationArtifacts.json();
  assert.equal(validation.forecasting.future_invariance, true);
  assert.equal(validation.anomalies.centered_window_failed_invariance, true);
  assert.equal(validation.search.test_evaluations, 1);
  const comments = await page.evaluate(async () => {
    try {
      const url = new URL('https://lz1031-waline.vercel.app/api/comment');
      url.searchParams.set('path', location.pathname);
      url.searchParams.set('pageSize', '1');
      const response = await fetch(url, { signal:AbortSignal.timeout(15000) });
      const body = await response.json();
      return { status:response.status, errno:body.errno, scope:'Read only; no comment submitted' };
    } catch (error) {
      return { error:String(error), scope:'Read request failed; no comment submitted' };
    }
  });
  console.log(JSON.stringify({ verifiedAt:new Date().toISOString(), results, artifacts:'available', comments },null,2));
} finally {
  await browser.close();
}
