import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const config = JSON.parse(readFileSync(new URL('edgeone.json', root), 'utf8'));
const wasm = 'b3d705bd391da35dcf0980c1d8c526f609ad64ac12652dd8c0bf3b20a626f2f2';
// These exact URLs are immutable contracts. Changed bytes require a NEW URL,
// not an updated checksum at the old URL. Review when publishing a new build.
const immutable = new Map([
  ['/games/blind-box-survival/cocos-js/_virtual_cc-nPspxFOo.js', '2863101fbe3ab8302ad09a18a4927a33ab8bed59d980e3c31f6eff00b8f3fd87'],
  ['/games/blind-box-survival/cocos-js/assets/spine-CC34fKUR.wasm', wasm],
  ['/games/jianqian/cocos-js/_virtual_cc-DYTm97mp.js', 'af1d315966e00678f04a4902968f05d83d843d29b87e182b25c5050fe1e4a238'],
  ['/games/jianqian/cocos-js/assets/spine-CC34fKUR.wasm', wasm],
  ['/games/rengpingzi/cocos-js/_virtual_cc-Btzvr0DO.js', '0a8c344999243969d9ea28636d922bd5aa9ec92899af6ce2f699cba47723b8de'],
  ['/games/rengpingzi/cocos-js/assets/spine-CC34fKUR.wasm', wasm],
  ['/games/shuqian/cocos-js/_virtual_cc-Bp5iGE8z.js', '56f4faec20aac9f956bcbe8923fc11a74b69b097f4ae89782891ba0b09980297'],
  ['/games/shuqian/cocos-js/assets/spine-CC34fKUR.wasm', wasm],
]);

test('long caching is limited to eight checked versioned engine resources', () => {
  const rules = config.headers.filter(rule => rule.headers.some(header => header.key === 'Cache-Control'));
  assert.deepEqual(rules.map(rule => rule.source).sort(), [...immutable.keys()].sort());
  for (const rule of rules) {
    assert.equal(rule.source.includes('*'), false);
    assert.deepEqual(rule.headers, [{ key: 'Cache-Control', value: 'public,max-age=31536000,immutable' }]);
  }
  assert.ok(config.headers.flatMap(rule => rule.headers).length <= 30);
});

test('immutable resource bytes cannot silently change at the cached URL', () => {
  for (const [path, checksum] of immutable) {
    const bytes = readFileSync(new URL(`public${path}`, root));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), checksum, `${path}: rename changed resources`);
  }
});

test('each cached engine is referenced by the current game import map', () => {
  for (const game of ['blind-box-survival', 'jianqian', 'rengpingzi', 'shuqian']) {
    const folder = new URL(`public/games/${game}/`, root);
    const html = readFileSync(new URL('index.html', folder), 'utf8');
    const importMap = html.match(/src="(src\/import-map[^"\s]*)"/)[1];
    const mapUrl = new URL(importMap, folder);
    const map = JSON.parse(readFileSync(mapUrl, 'utf8'));
    const cc = readFileSync(new URL(map.imports.cc, mapUrl), 'utf8');
    const engine = cc.match(/_virtual_cc-[\w-]+\.js/)[0];
    assert.ok(immutable.has(`/games/${game}/cocos-js/${engine}`));
  }
});

test('survival icon reuses the small current site icon without loading the old ICO', () => {
  const html = readFileSync(new URL('public/games/blind-box-survival/index.html', root), 'utf8');
  assert.match(html, /rel="icon" type="image\/png" href="\/favicon-zhang\.png"/);
  assert.doesNotMatch(html, /href="favicon\.ico"/);
  assert.ok(statSync(new URL('public/favicon-zhang.png', root)).size < 50 * 1024);
});
