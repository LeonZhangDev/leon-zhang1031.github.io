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
