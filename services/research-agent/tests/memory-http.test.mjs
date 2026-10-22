import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { request } from 'node:http';
import { setTimeout as delay } from 'node:timers/promises';
import { createApplication } from '../server.mjs';
import { loadConfig } from '../config.mjs';
import { newToken, tokenHash } from '../security.mjs';

test('disconnecting a paid memory HTTP request aborts transport and preserves its full reservation', async t => {
  const config = { ...loadConfig({ AGENT_MEMORY_MODE: 'qwen', MEMORY_PRICING_CONFIRMED: 'true', DASHSCOPE_API_KEY: newToken() }, { allowMemoryCalls: true }),
    port: 0, dataDir: mkdtempSync(join(tmpdir(), 'memory-http-')) };
  let began, aborted = false, requests = 0;
  const started = new Promise(resolve => { began = resolve; });
  const app = createApplication(config, { providers: { fetchImplementation: async (_url, init) => {
    requests++; began();
    return new Promise((_resolve, reject) => init.signal.addEventListener('abort', () => { aborted = true; reject(new Error('ABORTED')); }, { once: true }));
  } } });
  const origin = await app.listen(); t.after(() => app.close());
  const token = newToken(); app.store.createSession(tokenHash(token));
  const req = request(`${origin}${config.basePath}api/memories`, { method: 'POST', headers: { origin, cookie: `research_session=${token}`, 'content-type': 'application/json' } });
  req.on('error', () => {}); req.end(JSON.stringify({ action: 'add', text: '合成断线测试偏好' }));
  await started; req.destroy();
  for (let i = 0; i < 30 && !aborted; i++) await delay(10);
  assert.equal(aborted, true); assert.equal(requests, 1);
  assert.equal(app.store.trialBudget(config).uncertainCalls, 1);
  assert.deepEqual(await app.runner.memory.list(), []);
});
