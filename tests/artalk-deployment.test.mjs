import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const bootstrap = readFileSync(new URL('../services/artalk/bootstrap.sh', import.meta.url), 'utf8');
const proxy = readFileSync(new URL('../services/artalk/Caddyfile', import.meta.url), 'utf8');

test('retired Waline source and vulnerable dependency tree cannot be redeployed', () => {
  for (const path of ['services/waline/package.json', 'services/waline/api/index.js', 'src/components/AccountModal.astro']) {
    assert.equal(existsSync(new URL(`../${path}`, import.meta.url)), false, path);
  }
  const smoke = readFileSync(new URL('../scripts/blog/verify-production.mjs', import.meta.url), 'utf8');
  assert.match(smoke, /https:\/\/comments\.leonzk\.cn\/api\/v2\/comments/);
  assert.doesNotMatch(smoke, /waline\.vercel\.app/);
});

test('static build has one patched KaTeX owner and no retired adapters', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(pkg.overrides.katex, '$katex');
  assert.equal(pkg.dependencies['@astrojs/vercel'], undefined);
  assert.equal(pkg.dependencies['@astrojs/tailwind'], undefined);
  assert.ok(pkg.dependencies['@tailwindcss/vite']);
  const config = readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
  assert.match(config, /output: 'static'/);
  assert.match(config, /processor: unified/);
});

test('Artalk config explicitly provides a nonzero administrator login lifetime', () => {
  assert.match(bootstrap, /^login_timeout: 259200$/m);
});

test('Artalk storage and moderation remain independent and private', () => {
  assert.match(bootstrap, /config = '''host: 127\.0\.0\.1\n/);
  assert.match(bootstrap, /file: \/var\/lib\/artalk\/artalk\.db/);
  assert.match(bootstrap, /pending_default: true/);
  assert.match(bootstrap, /img_upload:\n  enabled: false/);
  assert.doesNotMatch(bootstrap, /DROP TABLE|DELETE FROM|postgres|neon\.tech/i);
});

test('Artalk sidebar embedding is restricted to the approved website origins', () => {
  assert.match(proxy, /frame-ancestors/);
  assert.match(proxy, /https:\/\/leonzk\.cn https:\/\/www\.leonzk\.cn/);
  assert.doesNotMatch(proxy, /X-Frame-Options DENY|frame-ancestors \*/);
});
