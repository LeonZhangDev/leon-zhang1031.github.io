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
  ['/games/blind-box-survival/cocos-js/_virtual_cc-nPspxFOo.js', '808a9f4fa2e10e20497873957ec3001f52be466d97e7a44e9354412fb7287d40'],
  ['/games/blind-box-survival/cocos-js/assets/spine-CC34fKUR.wasm', wasm],
  ['/games/jianqian/cocos-js/_virtual_cc-DYTm97mp.js', '38aadb83a6c4982167c86ff92f71ff5daa7d3d2c9ea2449871c33c530caa8cea'],
  ['/games/jianqian/cocos-js/assets/spine-CC34fKUR.wasm', wasm],
  ['/games/rengpingzi/cocos-js/_virtual_cc-Btzvr0DO.js', 'f249b10a696f56fff5f81335a901454883cd7b5ce06da67a595bdf633133d0e4'],
  ['/games/rengpingzi/cocos-js/assets/spine-CC34fKUR.wasm', wasm],
  ['/games/shuqian/cocos-js/_virtual_cc-Bp5iGE8z.js', 'b75aefabc9e6b699305aafac2d12b1eff669d33c3781caac41b4c382b949369d'],
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
    const raw = readFileSync(new URL(`public${path}`, root));
    // Git checks these text bundles out as CRLF on Windows and LF on Pages.
    // Hash their canonical LF content; never normalize binary WASM bytes.
    const bytes = path.endsWith('.js') ? Buffer.from(raw.toString('utf8').replace(/\r\n/g, '\n')) : raw;
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
