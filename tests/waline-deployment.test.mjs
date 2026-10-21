import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const service = new URL('../services/waline/', import.meta.url);
const read = (path) => readFileSync(new URL(path, service), 'utf8');

test('Waline backend pins the recovered dependency versions', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.dependencies['@waline/vercel'], '1.41.5');
  assert.equal(pkg.overrides['@waline/vercel'].jsdom, '26.1.0');
  assert.equal(pkg.type, 'commonjs');
  assert.equal(pkg.private, true);
});

test('Waline routes do not build or serve the Astro blog', () => {
  const config = JSON.parse(read('vercel.json'));
  assert.equal(config.framework, null);
  assert.equal(config.buildCommand, null);
  assert.deepEqual(config.rewrites, [{ source: '/(.*)', destination: '/api/index' }]);
});

test('Waline entrypoint exports its handler and suppresses SQL info logs', () => {
  const handler = () => undefined;
  const context = {
    module: { exports: {} },
    require: (name) => {
      assert.equal(name, '@waline/vercel');
      return () => handler;
    },
    global: { think: { logger: { info: () => { throw new Error('unsafe info log'); } } } },
  };
  vm.runInNewContext(read('api/index.js'), context);
  assert.equal(context.module.exports, handler);
  assert.doesNotThrow(() => context.global.think.logger.info('connection details'));
});

test('Waline upload excludes local dependencies and environment files', () => {
  const ignored = read('.vercelignore').split(/\r?\n/);
  assert.ok(ignored.includes('.env*'));
  assert.ok(ignored.includes('node_modules'));
});
