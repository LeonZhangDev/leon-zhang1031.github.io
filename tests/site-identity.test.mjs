import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const source = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('homepage links to the current GitHub account', () => {
  assert.match(source('src/pages/index.astro'), /https:\/\/github.com\/LeonZhangDev/);
});

test('public layout identifies the current domain and hosting platform', () => {
  const layout = source('src/layouts/BaseLayout.astro');
  assert.match(layout, /https:\/\/leonzk.cn/);
  assert.doesNotMatch(layout, /zz1031.vercel.app|workers.cloudflare.com/);
  assert.match(layout, /EdgeOne Pages/);
});

test('WeChat card uses an explicit click event instead of the deprecated global event', () => {
  const layout = source('src/layouts/BaseLayout.astro');
  assert.doesNotMatch(layout, /onclick="event\.stopPropagation\(\)"/);
  assert.match(layout, /querySelector\('\.qr-card'\)\?\.addEventListener\('click', \(event\) => event\.stopPropagation\(\)\)/);
});

test('Hugo example uses a supported HTML code fence', () => {
  const article = source('src/content/posts/hugo-dream-theme-customization.md');
  assert.doesNotMatch(article, /```go-html-template/);
  assert.match(article, /```html/);
});
