import { expect, test } from '@playwright/test';

test.describe('Jingxin study continuity', () => {
  test('opens the local Ask Classics drawer and refuses high-stakes prediction', async ({
    page,
  }) => {
    await page.goto('/jing/yixue/');
    await page.locator('#jing-ask-toggle').click();
    await expect(page.locator('#jing-ask-drawer')).toBeVisible();
    await page.locator('#jing-ask-input').fill('白话解释十神');
    await page.locator('#jing-ask-submit').click();
    await expect(page.locator('#jing-ask-answer')).toContainText('其他干支相对日主');
    await expect(page.locator('#jing-ask-answer')).toContainText('《渊海子平》');

    await page.locator('#jing-ask-input').fill('这卦能判断股票会不会涨吗');
    await page.locator('#jing-ask-submit').click();
    await expect(page.locator('#jing-ask-answer')).toContainText('不能由传统术数代替专业判断');
  });

  test('daily entry and focus mode remain scene-led and reversible', async ({ page }) => {
    await page.goto('/jing/');
    await expect(page.locator('#jing-today-hall')).toBeVisible();
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
      'href',
      '/jing/jingxin-hall.webmanifest',
    );
    await page.locator('#jing-focus-toggle').click();
    await expect(page.locator('body')).toHaveClass(/jing-focus-mode/);
    await expect(page.locator('#jing-focus-dock')).toBeVisible();
    await page.locator('#jing-focus-exit').click();
    await expect(page.locator('body')).not.toHaveClass(/jing-focus-mode/);
  });

  test('explicitly saves a Bazi case into the existing encrypted notebook', async ({ page }) => {
    await page.goto('/jing/bazi/');
    await page.locator('#bazi-year').fill('1986');
    await page.locator('#bazi-month').fill('5');
    await page.locator('#bazi-day').fill('29');
    await page.locator('#bazi-hour').fill('0');
    await page.locator('#bazi-minute').fill('0');
    await page.locator('#bazi-submit').click();
    await expect(page.locator('#bazi-result')).toBeVisible();
    await page.locator('#bazi-save-case').click();
    await expect(page.locator('#jing-case-dialog')).toBeVisible();
    await page.locator('#jing-case-password').fill('test-pass');
    await page.locator('#jing-case-confirm').fill('test-pass');
    await page.locator('#jing-case-save').click();
    await expect(page.locator('#jing-case-toast')).toContainText('已加密存入');

    await page.goto('/jing/notes/');
    await page.locator('#notes-password').fill('test-pass');
    await page.locator('#notes-unlock-btn').click();
    await expect(page.locator('#notes-case-list li')).toHaveCount(1);
    await expect(page.locator('#notes-case-list')).toContainText('八字 · 丙寅 癸巳 癸酉 壬子');
  });

  test('deep-links to a selected Five Elements topic', async ({ page }) => {
    await page.goto('/jing/yixue/?term=water');
    await expect(page.locator('#wuxing-name')).toHaveText('水');
    await expect(page.locator('.jing-element-node.is-selected')).toContainText('水');
  });

  test('resumes a lunar case without writing birth data to browser storage', async ({
    page,
    context,
  }) => {
    await page.goto('/jing/bazi/');
    await page.locator('input[name="inputMode"][value="lunar"]').check();
    await page.locator('#bazi-label').fill('私密案名');
    for (const [key, content] of Object.entries({
      year: '1986',
      month: '4',
      day: '21',
      hour: '0',
      minute: '0',
    })) {
      await page.locator(`#bazi-lunar-${key}`).fill(content);
    }
    await page.locator('#bazi-submit').click();
    await page.locator('#bazi-save-case').click();
    await page.locator('#jing-case-password').fill('resume-pass');
    await page.locator('#jing-case-confirm').fill('resume-pass');
    await page.locator('#jing-case-save').click();
    await expect(page.locator('#jing-case-toast')).toContainText('已加密存入');
    await page.goto('/jing/notes/');
    await page.locator('#notes-password').fill('resume-pass');
    await page.locator('#notes-unlock-btn').click();
    const newPage = context.waitForEvent('page');
    await page.locator('[data-resume-case]').click();
    const resumed = await newPage;
    await expect(resumed.locator('#bazi-status')).toContainText('恢复输入');
    await expect(resumed.locator('#bazi-lunar-month')).toHaveValue('4');
    await expect(resumed.locator('#bazi-lunar-day')).toHaveValue('21');
    await resumed.locator('#bazi-submit').click();
    await expect(resumed.locator('#bazi-summary-text')).toContainText('丙寅 / 癸巳 / 癸酉 / 壬子');
    await expect(page.locator('#notes-unlock')).toBeVisible();
    await expect(page.locator('#notes-case-list li')).toHaveCount(0);
    const stored = await resumed.evaluate(() =>
      JSON.stringify({
        local: { ...localStorage },
        session: { ...sessionStorage },
      }),
    );
    expect(stored).not.toContain('私密案名');
    expect(stored).not.toContain('1986');
    expect(stored).not.toContain('resume-pass');
    await resumed.reload();
    await expect(resumed.locator('#bazi-lunar-year')).toHaveValue('');
    await expect(resumed.locator('#bazi-result')).toBeHidden();
  });
});
