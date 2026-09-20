import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';

const reviewedPosts = [
  'ab-testing-statistics', 'python-opencv-tips', 'python-opencv-geometry-transform',
  'opencv-image-interpolation-mask-roi-watermark-grayscale-tutorial',
  'opencv-contour-feature-extraction', 'opencv-hough-transform-brightness',
  'opencv-practical-projects', 'speech-recognition-basics',
  'time-series-analysis', 'anomaly-detection-practice', 'automl-optuna-tuning',
  'ml-basics-scikit-learn', 'ml-linear-regression', 'ml-decision-tree', 'ml-kmeans-clustering',
];

for (const slug of reviewedPosts) {
  test(`reviewed article renders with scoped evidence: ${slug}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/api/comment**', route => route.fulfill({ status:503, body:'{}' }));
    await page.setViewportSize({ width:390, height:844 });
    const response = await page.goto(`/posts/${slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(new RegExp(`/posts/${slug}/`));
    await expect(page.locator('h1')).not.toBeEmpty();
    expect((await page.locator('.prose').innerText()).length).toBeGreaterThan(300);
    await expect(page.locator('astro-error-overlay, .katex-error')).toHaveCount(0);
    if (slug.startsWith('ml-')) {
      await expect(page.locator('.prose img[src^="/examples/blog-review-04/"]')).toHaveCount(1);
      await expect(page).toHaveTitle((await page.locator('h1').innerText()).trim());
    }
    for (const image of await page.locator('.prose img[src^="/examples/blog-review-"]').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
    }
    if (slug === 'ml-kmeans-clustering') {
      const button = page.locator('.article-image-open').first();
      await button.evaluate(node => node.scrollIntoView({ block:'center', behavior:'instant' }));
      await page.screenshot({ path:resolve(tmpdir(), 'blog-review-ml-mobile.png') });
      await button.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('src', /clustering-shapes.svg/);
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).not.toBeVisible();
      await expect(button).toBeFocused();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.setViewportSize({ width:1440, height:1000 });
      await button.evaluate(node => node.scrollIntoView({ block:'center', behavior:'instant' }));
      await page.screenshot({ path:resolve(tmpdir(), 'blog-review-ml-desktop.png') });
    }
    if (slug === 'anomaly-detection-practice') {
      await expect(page.locator('.prose img[src^="/examples/blog-review-03/"]')).toHaveCount(2);
      const button = page.locator('.article-image-open').first();
      await button.scrollIntoViewIfNeeded();
      await page.screenshot({ path:resolve(tmpdir(), 'blog-review-anomaly-mobile.png') });
      await button.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(button).toBeFocused();
      await page.setViewportSize({ width:1440, height:1000 });
      await button.evaluate(node => node.scrollIntoView({ block:'center', behavior:'instant' }));
      await page.screenshot({ path:resolve(tmpdir(), 'blog-review-anomaly-desktop.png') });
    }
    if (slug === 'ab-testing-statistics') {
      await expect(page.locator('.prose')).toContainText('0.066748');
      const button = page.locator('.article-image-open').first();
      await button.scrollIntoViewIfNeeded();
      await page.screenshot({ path:resolve(tmpdir(), 'blog-review-statistics-mobile.png') });
      await button.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).not.toBeVisible();
      await expect(button).toBeFocused();
      await page.setViewportSize({ width:1440, height:1000 });
      await button.evaluate(node => node.scrollIntoView({ block:'center' }));
      await page.screenshot({ path:resolve(tmpdir(), 'blog-review-statistics-desktop.png') });
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('second review batch exposes numeric evidence, not full-reproduction claims', async ({ request }) => {
  const response = await request.get('/examples/blog-review-02/results.json');
  expect(response.ok()).toBe(true);
  const data = await response.json();
  expect(data.statistics.two_sided_p).toBeCloseTo(0.066748278, 8);
  expect(data.statistics.newcombe_95_ci[0]).toBeLessThan(0);
  expect(data.vision.synthetic_disk_count).toBe(3);
  expect(data.text_metrics.cer).toBeCloseTo(1/12, 10);
  expect(data.article_classifier.cases_passed).toBe(6);
});

test('third review batch preserves temporal and final-test boundaries', async ({ request }) => {
  const response = await request.get('/examples/blog-review-03/results.json');
  expect(response.ok()).toBe(true);
  const data = await response.json();
  expect(data.forecasting.future_invariance).toBe(true);
  expect(data.forecasting.folds).toHaveLength(3);
  for (const fold of data.forecasting.folds) expect(fold.train_end < fold.test_start).toBe(true);
  expect(data.anomalies.future_invariance).toBe(true);
  expect(data.anomalies.centered_window_failed_invariance).toBe(true);
  expect(data.anomalies.zero_variance_is_unscored).toBe(true);
  expect(data.search.test_evaluations).toBe(1);
  expect(data.search.candidates_per_strategy).toBe(12);
});

test('fourth review batch runs article code and preserves final-test boundaries', async ({ request }) => {
  const response = await request.get('/examples/blog-review-04/results.json');
  expect(response.ok()).toBe(true);
  const data = await response.json();
  expect(data.executed_snippets).toHaveLength(18);
  expect(data.iris.test_prediction_calls).toBe(1);
  expect(data.iris.mixed_missing_and_unknown_passed).toBe(true);
  expect(data.iris.trusted_persistence_roundtrip).toBe(true);
  expect(data.regression.rmse).toBeGreaterThanOrEqual(data.regression.mae);
  expect(data.regression.log_array_shape).toEqual([500, 4]);
  expect(data.trees.wine_test_prediction_calls).toBe(1);
  expect(data.trees.constant_predictions_outside_training_x).toBe(true);
  expect(data.clustering.original_model_K).toBe(2);
  expect(data.clustering.candidate_count).toBe(6);
});

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
    for (const image of html.matchAll(/<img\b[^>]*\bsrc="(\/[^"?#]+)"/g)) {
      expect(existsSync(resolve('dist', decodeURIComponent(image[1]).slice(1))),
        `${file}: missing image ${image[1]}`).toBe(true);
    }
    for (const match of html.matchAll(/href="(\/posts\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
      const pathname = decodeURIComponent(match[1]).replace(/^\//, '').replace(/\/$/, '');
      expect(existsSync(resolve('dist', pathname, 'index.html')),
        `${file}: broken article link ${match[1]}`).toBe(true);
    }
  }
});

test('learning route links, article tools and mobile dialog work', async ({ page, context }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/api/comment**', route => route.fulfill({ status: 503, body: '{}' }));
  await page.goto('/posts/learning-paths/');
  await expect(page).toHaveTitle(/学习路线/);
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('#deep-learning ol li')).toHaveCount(10);
  await page.locator('#deep-learning ol li a').first().click();
  await expect(page).toHaveURL(/deep-learning-01-training-loop/);
  await expect(page.locator('h1')).toContainText('训练循环');
  await expect(page.locator('astro-error-overlay')).toHaveCount(0);
  await page.getByText(/本文目录（/).click();
  const tocLink = page.getByRole('navigation', { name:'本文目录', exact:true }).getByRole('link').first();
  const anchor = await tocLink.getAttribute('href');
  await tocLink.click();
  expect(decodeURIComponent(new URL(page.url()).hash)).toBe(anchor);
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const copy = page.locator('.article-code-copy').first();
  await copy.click();
  await expect(copy).toHaveText('已复制');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('import');
  await page.setViewportSize({ width:390, height:844 });
  const image = page.getByRole('button', { name:/放大图片：一个 batch/ });
  await image.scrollIntoViewIfNeeded();
  await page.screenshot({ path:resolve(tmpdir(), 'blog-reading-mobile.png') });
  await image.click();
  const dialog = page.getByRole('dialog', { name:'图片原尺寸预览' });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img')).toHaveAttribute('src', /training-loop.svg/);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(image).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.setViewportSize({ width:1440, height:1000 });
  await image.evaluate(element => element.scrollIntoView({ block:'center' }));
  await page.screenshot({ path:resolve(tmpdir(), 'blog-reading-desktop.png') });
  expect(errors).toEqual([]);
});

test('copy failure is explained without losing the code', async ({ page }) => {
  await page.route('**/api/comment**', route => route.fulfill({ status:503, body:'{}' }));
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value:{ writeText:async () => { throw new Error('Clipboard access denied'); } },
    });
  });
  await page.goto('/posts/deep-learning-01-training-loop/');
  const button = page.locator('.article-code-copy').first();
  await button.click();
  await expect(button).toHaveText('复制失败，请选择代码复制');
  await expect(page.locator('.article-code-block pre').first()).toContainText('import');
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
