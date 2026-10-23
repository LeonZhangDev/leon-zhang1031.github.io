import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium, expect } from '@playwright/test';
import { createApplication } from '../server.mjs';
import { loadConfig } from '../config.mjs';
import { mockTool } from '../mock-provider.mjs';
import { newToken } from '../security.mjs';

globalThis.fetch = () => { throw new Error('NETWORK_FORBIDDEN'); };

test('offline Chromium: Tavily mode displays real-tool state, bounded budget, citations and retained mock history', { timeout: 60000 }, async t => {
  const config = { ...loadConfig({ AGENT_MODE: 'qwen', DASHSCOPE_API_KEY: newToken(), QWEN_PRICING_CONFIRMED: 'true',
    AGENT_TOOLS_MODE: 'tavily', TAVILY_API_KEY: `tvly-${newToken()}`, TAVILY_PRICING_CONFIRMED: 'true', TAVILY_FREE_TIER_CONFIRMED: 'true' },
  { allowModelCalls: true, allowWebTools: true }), port: 0, stepDelayMs: 0, dataDir: mkdtempSync(join(tmpdir(), 'tavily-browser-')) };
  const sources = ['https://nodejs.org/en/docs/', 'https://docs.python.org/3/'];
  let decisions = 0, tools = 0;
  const actions = [['search', { query: 'official runtimes' }], ...sources.map(url => ['read_page', { url }]),
    ['save_report', { markdown: `# 调研结果\n\n| 方案 | 来源 |\n| --- | --- |\n| Node | [文档](${sources[0]}) |\n| Python | [文档](${sources[1]}) |\n\n## 未确认事项\n这是离线传输测试，尚未验证实时资料。` }]];
  const app = createApplication(config, { providers: {
    fetchImplementation: async () => {
      const [name, args] = actions[decisions++];
      return new Response(JSON.stringify({ usage: { prompt_tokens: 100, completion_tokens: 20 }, choices: [{ finish_reason: 'tool_calls',
        message: { tool_calls: [{ type: 'function', function: { name, arguments: JSON.stringify(name === 'save_report' ? { recommendations: [], ...args } : args) } }] } }] }));
    },
    webFetchImplementation: async (url, init) => {
      tools++;
      return new Response(JSON.stringify(url.endsWith('/search')
        ? { results: sources.map(url => ({ url, title: '官方文档', content: '待核对摘要' })), usage: { credits: 1 } }
        : { results: [{ url: JSON.parse(init.body).urls[0], raw_content: '离线正文：限制 10 次。' }], failed_results: [], usage: { credits: 0 } }));
    },
  } });
  const old = app.store.createTask({ goal: '历史模拟任务', constraints: '', scenario: 'standard', budgetUnits: 20_000 }, loadConfig({}));
  old.status = 'completed'; old.report = '# 原始模拟报告'; app.store.saveTask(old);
  const oldBody = app.store.db.prepare('SELECT body FROM tasks WHERE id=?').get(old.id).body;
  const origin = await app.listen(); t.after(() => app.close());
  const browser = await chromium.launch({ channel: process.env.AGENT_TEST_BROWSER_CHANNEL || 'chrome' }); t.after(() => browser.close());
  const context = await browser.newContext(); const external = [], errors = [];
  await context.route('**/*', route => {
    if (new URL(route.request().url()).origin !== origin) { external.push(route.request().url()); return route.abort(); }
    return route.continue();
  });
  const page = await context.newPage(); page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${origin}${config.basePath}`);
  await expect(page.locator('#auth-submit')).toBeEnabled();
  await expect(page.locator('#login-runtime-notice')).toContainText('Tavily Basic');
  const password = newToken(); await page.locator('#password').fill(password); await page.locator('#confirm-password').fill(password);
  await page.locator('#auth-submit').click(); await expect(page.locator('#task-form')).toBeVisible();
  await expect(page.locator('#mode-badge')).toHaveText('QWEN · TAVILY');
  await expect(page.locator('#budget')).toHaveValue('0.3'); await expect(page.locator('#budget')).toHaveAttribute('max', '0.3');
  await expect(page.locator('#task-limits')).toContainText('1 次搜索 / 2 页资料');
  await page.locator('#goal').fill('对比 Node 与 Python'); await page.locator('#start-task').click();
  await expect(page.locator('#task-status')).toHaveText('已完成');
  await expect(page.locator('#report table')).toBeVisible();
  await expect(page.locator('#report a').first()).toHaveAttribute('href', sources[0]);
  await expect(page.locator('#budget-status')).toContainText('工具 3 次，等价预留 ¥0.1920');
  await expect(page.locator('#activity')).toContainText('查看工具响应（联网工具）');
  assert.equal(decisions, 4); assert.equal(tools, 3);
  assert.equal(app.store.db.prepare('SELECT body FROM tasks WHERE id=?').get(old.id).body, oldBody);
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  assert.deepEqual(external, []); assert.deepEqual(errors, []);
});

const markdown = '# Markdown 验收\n\n**加粗** 和 *斜体*，~~删除~~，`inline()`\n\n1. 步骤一\n   - 嵌套项\n\n- [x] 已完成\n\n> 保留引用\n\n| 列一 | 列二 |\n| --- | --- |\n| A | B |\n\n```js\nconst value = "<script>literal</script>";\n```\n\n[官方链接](https://example.test/docs) [不安全](javascript:alert(1))\n\nhttps://example.test/bare（官方资料）\n\n![外部图片](https://tracker.example.test/pixel)\n\n<img src="https://tracker.example.test/raw" onerror="globalThis.markdownExecuted=true">\n<script>globalThis.markdownExecuted=true</script>\n';

test('offline Chromium: authenticated memory workflow, GFM, source/copy/download, mobile and XSS protection', { timeout: 60000 }, async t => {
  const config = { ...loadConfig({}), port: 0, stepDelayMs: 0, dataDir: mkdtempSync(join(tmpdir(), 'research-browser-')) };
  const app = createApplication(config, { providers: { tool: (action, state) => action.tool === 'save_report' ? { markdown } : mockTool(action, state) } });
  const origin = await app.listen(); t.after(() => app.close());
  const browser = await chromium.launch({ channel: process.env.AGENT_TEST_BROWSER_CHANNEL || 'chrome' }); t.after(() => browser.close());
  const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
  const external = [], errors = [];
  await context.route('**/*', route => {
    if (new URL(route.request().url()).origin !== origin) { external.push(route.request().url()); return route.abort(); }
    return route.continue();
  });
  const page = await context.newPage(); page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${origin}${config.basePath}`);
  await expect(page.locator('#auth-submit')).toBeEnabled();
  const password = newToken();
  await page.locator('#password').fill(password); await page.locator('#confirm-password').fill(password);
  await page.locator('#auth-submit').click(); await expect(page.locator('#goal')).toBeVisible();
  await expect(page.locator('#extract-memory')).toBeDisabled();
  await expect(page.locator('#budget-status')).toContainText('本轮新增验证预留 ¥0.0000 / ¥0.50');

  const rejected = await context.request.get(`${origin}${config.basePath}api/memories`, { headers: { cookie: '' } });
  assert.equal(rejected.status(), 401);
  const csrf = await context.request.post(`${origin}${config.basePath}api/memories`, { data: { action: 'add', text: '跨站写入' }, headers: { origin: 'https://attacker.example.test' } });
  assert.equal(csrf.status(), 403);
  await page.locator('#memory-text').fill('技术选型优先考虑维护成本');
  await page.locator('#memory-form button[type=submit]').click();
  await expect(page.locator('.memory-item')).toHaveCount(1);
  await page.locator('.memory-item textarea').fill('技术选型优先考虑长期维护成本');
  await page.locator('.memory-item button').filter({ hasText: '保存修改' }).click();
  await expect(page.locator('.memory-item textarea')).toHaveValue('技术选型优先考虑长期维护成本');
  await page.locator('#goal').fill('比较技术方案的维护成本'); await page.locator('#start-task').click();
  await expect(page.locator('#task-status')).toHaveText('已完成', { timeout: 20000 });
  await expect(page.locator('#report strong')).toHaveText('加粗');
  await expect(page.locator('#report ul ul, #report ol ul')).toHaveCount(1);
  await expect(page.locator('#report input[type=checkbox]')).toBeChecked();
  assert.ok((await page.locator('#report input[type=checkbox]').boundingBox()).width <= 24);
  await expect(page.locator('#report .table-scroll table')).toHaveCount(1);
  await expect(page.locator('#report pre code')).toHaveText('const value = "<script>literal</script>";\n');
  assert.equal(await page.locator('#report script, #report img, #report [onerror]').count(), 0);
  assert.equal(await page.evaluate(() => globalThis.markdownExecuted), undefined);
  await expect(page.locator('#report a[href="https://example.test/bare"]')).toHaveText('https://example.test/bare');
  await expect(page.locator('#report')).toContainText('（官方资料）');
  assert.equal(await page.locator('#report a').filter({ hasText: '不安全' }).getAttribute('href'), null);
  await expect(page.locator('#memory-used')).toContainText('长期维护成本');
    await expect(page.locator('#skills-used')).toContainText('cost-estimation v1.0.1');
  await expect(page.locator('#context-status')).toContainText('未调用压缩模型');
  await page.locator('#report .copy-code').click();
  assert.equal((await page.evaluate(() => navigator.clipboard.readText())).replaceAll('\r\n', '\n'), 'const value = "<script>literal</script>";\n');
  await page.locator('#report-view').selectOption('source');
  await expect(page.locator('#report-source')).toBeVisible(); await expect(page.locator('#report-source')).toHaveValue(markdown);
  await page.locator('#copy-report').click(); assert.equal((await page.evaluate(() => navigator.clipboard.readText())).replaceAll('\r\n', '\n'), markdown);
  const reportUrl = await page.locator('#download-report').getAttribute('href');
  assert.equal(await (await context.request.get(`${origin}${reportUrl}`)).text(), markdown);
  await page.locator('#report-view').selectOption('preview');
  await page.screenshot({ path: join(config.dataDir, 'workspace-desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await page.screenshot({ path: join(config.dataDir, 'workspace-mobile.png'), fullPage: true });
  t.diagnostic(`Offline browser screenshots: ${config.dataDir}`);
  await page.locator('.memory-item button').filter({ hasText: /^停用$/ }).click();
  await expect(page.locator('.memory-item small')).toContainText('停用');
  await page.locator('.memory-item button').filter({ hasText: '删除' }).click(); await expect(page.locator('.memory-item')).toHaveCount(0);
  await page.locator('#memory-enabled').uncheck();
  assert.equal((await (await context.request.get(`${origin}${config.basePath}api/memories`)).json()).enabled, false);
  assert.equal(app.store.trialBudget(config).calls, 0);
  assert.deepEqual(external, []); assert.deepEqual(errors, []);
});

test('offline Chromium: stubbed Qwen extraction requires confirmation and shows the shared validation cap', { timeout: 60000 }, async t => {
  const config = { ...loadConfig({ AGENT_MEMORY_MODE: 'qwen', MEMORY_PRICING_CONFIRMED: 'true', DASHSCOPE_API_KEY: newToken() }, { allowMemoryCalls: true }),
    port: 0, stepDelayMs: 0, dataDir: mkdtempSync(join(tmpdir(), 'research-memory-browser-')) };
  let vendorStubCalls = 0;
  const app = createApplication(config, { providers: { fetchImplementation: async (url, init) => {
    vendorStubCalls++;
    const body = JSON.parse(init.body);
    const payload = url.endsWith('/embeddings')
      ? { data: body.input.map((text, index) => ({ index, embedding: Array.from({ length: 1024 }, (_, i) => Number(i === 0)) })), usage: { prompt_tokens: 20 } }
      : { choices: [{ finish_reason: 'stop', message: { content: JSON.stringify({ memories: [{ text: body.messages.at(-1).content, sourceQuote: body.messages.at(-1).content, scope: 'user' }] }) } }], usage: { prompt_tokens: 100, completion_tokens: 40 } };
    return new Response(JSON.stringify(payload), { headers: { 'content-type': 'application/json' } });
  } } });
  const origin = await app.listen(); t.after(() => app.close());
  const browser = await chromium.launch({ channel: process.env.AGENT_TEST_BROWSER_CHANNEL || 'chrome' }); t.after(() => browser.close());
  const context = await browser.newContext(), external = [], errors = [];
  await context.route('**/*', route => {
    if (new URL(route.request().url()).origin !== origin) { external.push(route.request().url()); return route.abort(); }
    return route.continue();
  });
  const page = await context.newPage(); page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${origin}${config.basePath}`);
  const password = newToken(); await page.locator('#password').fill(password); await page.locator('#confirm-password').fill(password);
  await page.locator('#auth-submit').click(); await expect(page.locator('#extract-memory')).toBeEnabled();
  await page.locator('#memory-text').fill('偏好低维护成本'); await page.locator('#extract-memory').click();
  await expect(page.getByText('候选记忆 · 尚未参与召回', { exact: true })).toBeVisible();
  const url = `${origin}${config.basePath}api/memories`;
  let state = await (await context.request.get(url)).json();
  assert.equal(state.memories.length, 0); assert.equal(state.candidates.length, 1);
  await page.getByRole('button', { name: '确认记住', exact: true }).click();
  await expect(page.locator('.memory-item textarea')).toHaveValue('偏好低维护成本');
  await expect(page.locator('.memory-item small')).toContainText('用户已确认');
  state = await (await context.request.get(url)).json();
  assert.equal(state.memories.length, 1); assert.equal(state.candidates.length, 0);
  await expect(page.locator('#budget-status')).toContainText('/ ¥0.50');
  assert.ok(vendorStubCalls >= 2); assert.ok(app.store.trialBudget(config).validation.reservedYuan > 0);
  assert.equal(app.store.db.prepare('SELECT COUNT(*) n FROM cloud_dispatch').get().n, 0);
  assert.deepEqual(external, []); assert.deepEqual(errors, []);
});
