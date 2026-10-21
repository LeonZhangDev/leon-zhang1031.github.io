import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const bootstrap = readFileSync(new URL('../services/artalk/bootstrap.sh', import.meta.url), 'utf8');
const proxy = readFileSync(new URL('../services/artalk/Caddyfile', import.meta.url), 'utf8');

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
