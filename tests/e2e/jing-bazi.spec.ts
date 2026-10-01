import { expect, test, type Page } from '@playwright/test';

async function fillBirth(
  page: Page,
  birth: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
  },
) {
  await page.locator('#bazi-year').fill(birth.year);
  await page.locator('#bazi-month').fill(birth.month);
  await page.locator('#bazi-day').fill(birth.day);
  await page.locator('#bazi-hour').fill(birth.hour);
  await page.locator('#bazi-minute').fill(birth.minute);
}

const GOLDEN = { year: '1986', month: '5', day: '29', hour: '0', minute: '0' };

test.describe('Jingxin yixue reference room', () => {
  test('lists five elements and eight trigrams with cycle notes', async ({ page }) => {
    await page.goto('/jing/yixue/');
    await expect(page.locator('.jing-element-node')).toHaveCount(5);
    await expect(page.locator('.jing-gua')).toHaveCount(8);
    await expect(page.locator('.jing-gua').first()).toContainText('乾');
    await expect(page.locator('#wuxing-sheng')).toHaveText('火');
    await expect(page.locator('#wuxing-ke')).toHaveText('土');
  });
});

test.describe('Jingxin bazi room', () => {
  test('computes the frozen 1986-05-29 golden chart locally', async ({ page }) => {
    await page.goto('/jing/bazi/');
    await fillBirth(page, GOLDEN);
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('#bazi-result')).toBeVisible();
    await expect(page.locator('#bazi-summary-text')).toContainText('丙寅 / 癸巳 / 癸酉 / 壬子');
    await expect(page.locator('#bazi-pillars')).toContainText('丙寅');
    await expect(page.locator('#bazi-pillars')).toContainText('癸巳');
    await expect(page.locator('#bazi-pillars')).toContainText('癸酉');
    await expect(page.locator('#bazi-pillars')).toContainText('壬子');
    await expect(page.locator('#bazi-pillars')).toContainText('日主');

    await expect(page.locator('[data-bazi-view="basic"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#bazi-sec-luck')).toBeHidden();
    await page.locator('[data-bazi-view="pro"]').click();
    await expect(page.locator('#bazi-sec-luck')).toBeVisible();
    await expect(page.locator('#bazi-pillars')).toContainText('旬空');
    await expect(page.locator('#bazi-dayun-timeline button')).toHaveCount(8);
    await expect(page.locator('#bazi-luck-meta')).toContainText('1989-03-08');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page
      .locator('#bazi-result')
      .screenshot({ path: test.info().outputPath('bazi-pro-desktop.png') });
  });

  test('sends no request containing birth data', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (req) => requests.push(req.url()));
    await page.goto('/jing/bazi/');
    await fillBirth(page, GOLDEN);
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#bazi-result')).toBeVisible();

    for (const url of requests) {
      expect(url).not.toMatch(/1986|year=|month=|day=|hour=|minute=|longitude=/);
      expect(url.startsWith('http://localhost:4321')).toBe(true);
    }
  });

  test('refresh clears every birth field and the result', async ({ page }) => {
    await page.goto('/jing/bazi/');
    await fillBirth(page, GOLDEN);
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#bazi-result')).toBeVisible();

    await page.reload();
    await expect(page.locator('#bazi-year')).toHaveValue('');
    await expect(page.locator('#bazi-month')).toHaveValue('');
    await expect(page.locator('#bazi-result')).toBeHidden();
  });

  test('out-of-range input shows a visible error and no result', async ({ page }) => {
    await page.goto('/jing/bazi/');
    await fillBirth(page, { ...GOLDEN, year: '1899' });
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('#bazi-error')).toBeVisible();
    await expect(page.locator('#bazi-error')).toContainText('1900');
    await expect(page.locator('#bazi-result')).toBeHidden();
  });

  test('requires every time field and can fill the local current time', async ({ page }) => {
    await page.goto('/jing/bazi/');
    await fillBirth(page, { ...GOLDEN, minute: '' });
    await page.locator('#bazi-submit').click();
    await expect(page.locator('#bazi-error')).toContainText('完整填写');
    await expect(page.locator('#bazi-result')).toBeHidden();

    await page.locator('#bazi-now').click();
    await expect(page.locator('#bazi-year')).not.toHaveValue('');
    await expect(page.locator('#bazi-minute')).not.toHaveValue('');
    await expect(page.locator('#bazi-status')).toContainText('本机此刻');
  });

  test('true-solar mode reveals place controls and labels the summary', async ({ page }) => {
    await page.goto('/jing/bazi/');
    await expect(page.locator('#bazi-place')).toBeHidden();
    await page.locator('#bazi-calibration summary').click();
    await page.locator('input[name="timeMode"][value="true-solar"]').check();
    await expect(page.locator('#bazi-place')).toBeVisible();

    await page.locator('#bazi-city').selectOption({ label: '乌鲁木齐（87.62°E）' });
    await fillBirth(page, {
      year: '2024',
      month: '1',
      day: '1',
      hour: '12',
      minute: '0',
    });
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('#bazi-summary-text')).toContainText('真太阳时');
    await expect(page.locator('#bazi-summary-text')).toContainText('87.62');
    await expect(page.locator('#bazi-derivation')).toContainText('经度修正');
  });

  test('copy summary button produces a notebook-ready line', async ({ browser }) => {
    const context = await browser.newContext({
      permissions: ['clipboard-read', 'clipboard-write'],
    });
    const page = await context.newPage();
    await page.goto('/jing/bazi/');
    await fillBirth(page, GOLDEN);
    await page.locator('button[type="submit"]').click();
    await page.locator('#bazi-copy').click();
    await expect(page.locator('#bazi-copy-state')).toContainText('已复制');

    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('丙寅 / 癸巳 / 癸酉 / 壬子');
    expect(clip).not.toContain('1986');
    await context.close();
  });

  test('result region is usable at 390px without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/jing/bazi/');
    await fillBirth(page, GOLDEN);
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#bazi-result')).toBeVisible();
    await page.locator('[data-bazi-view="pro"]').click();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    await page
      .locator('#bazi-result')
      .screenshot({ path: test.info().outputPath('bazi-pro-mobile.png') });
  });

  test('matches solar and lunar input and rejects an impossible leap month', async ({ page }) => {
    await page.goto('/jing/bazi/');
    await page.locator('input[name="inputMode"][value="lunar"]').check();
    for (const [field, content] of Object.entries({
      year: '1986',
      month: '4',
      day: '21',
      hour: '0',
      minute: '0',
    })) {
      await page.locator(`#bazi-lunar-${field}`).fill(content);
    }
    await page.locator('#bazi-submit').click();
    await expect(page.locator('#bazi-summary-text')).toContainText('丙寅 / 癸巳 / 癸酉 / 壬子');
    await page.locator('#bazi-leap-month').check();
    await page.locator('#bazi-submit').click();
    await expect(page.locator('#bazi-error')).toContainText('不存在');
  });

  test('supports direct pillars and does not invent a luck timeline', async ({ page }) => {
    await page.goto('/jing/bazi/');
    await page.locator('input[name="inputMode"][value="pillars"]').check();
    for (const [key, pillar] of Object.entries({
      year: '丙寅',
      month: '癸巳',
      day: '癸酉',
      hour: '壬子',
    })) {
      await page.locator(`#bazi-${key}-pillar`).fill(pillar);
    }
    await page.locator('#bazi-submit').click();
    await page.locator('[data-bazi-view="pro"]').click();
    await expect(page.locator('#bazi-luck-empty')).toBeVisible();
    await expect(page.locator('#bazi-luck-wrap')).toBeHidden();
    await expect(page.locator('#bazi-relation-nodes button')).toHaveCount(4);
    await page.locator('#bazi-year-pillar').fill('甲丑');
    await page.locator('#bazi-submit').click();
    await expect(page.locator('#bazi-error')).toContainText('六十甲子');
  });

  test('selects Dayun, Liunian and Liuyue and explains the current structure', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/jing/bazi/');
    await fillBirth(page, GOLDEN);
    await page.locator('#bazi-submit').click();
    await page.locator('[data-bazi-view="pro"]').click();
    await page.locator('#bazi-dayun-timeline [data-dayun="1"]').click();
    await expect(page.locator('#bazi-liunian-timeline')).toContainText('1999');
    await page.locator('#bazi-liunian-timeline [data-liunian="2"]').click();
    await page.locator('.bazi-month-panel summary').click();
    await page.locator('#bazi-liuyue-timeline [data-liuyue="0"]').click();
    await expect(page.locator('#bazi-relation-nodes button')).toHaveCount(7);
    await page.locator('[data-relation-index]').first().click();
    await expect(page.locator('#bazi-relation-nodes .is-highlighted')).not.toHaveCount(0);
    await page.locator('#bazi-ask-current').click();
    await expect(page.locator('#jing-ask-answer')).toContainText('当前盘面');
    await expect(page.locator('#jing-ask-answer')).toContainText('2001');
    await expect(page.locator('#jing-ask-answer')).toContainText('流月');
    await page.keyboard.press('Escape');
    await expect(page.locator('#jing-ask-drawer')).toBeHidden();
    expect(errors).toEqual([]);
  });

  test('minute uncertainty is explicit and reset restores editable fields', async ({ page }) => {
    await page.goto('/jing/bazi/');
    await fillBirth(page, { ...GOLDEN, minute: '' });
    await page.locator('#bazi-unknown-minute').check();
    await page.locator('#bazi-submit').click();
    await expect(page.locator('#bazi-reminders')).toContainText('分钟未知');
    await page.locator('button[type="reset"]').click();
    await expect(page.locator('#bazi-minute')).toBeEnabled();
    await expect(page.locator('#bazi-result')).toBeHidden();
  });

  test('downloads a code-built privacy image', async ({ page }) => {
    await page.goto('/jing/bazi/');
    await fillBirth(page, GOLDEN);
    await page.locator('#bazi-submit').click();
    const download = page.waitForEvent('download');
    await page.locator('#bazi-share-image').click();
    expect((await download).suggestedFilename()).toMatch(/^jing-bazi-\d+\.png$/);
  });
});
