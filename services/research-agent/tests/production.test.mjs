import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:net';
import { loadConfig, BASE_PATH } from '../config.mjs';
import { Store } from '../store.mjs';
import { createApplication } from '../server.mjs';
import { newToken, hashPassword } from '../security.mjs';
import { proxySiteRequest, PRIVATE_PATH } from '../site-proxy.mjs';

test('CLI starts its HTTP listener when launched through a release-directory symlink', { timeout: 10_000 }, async t => {
  const temp = mkdtempSync(join(tmpdir(), 'research-symlink-start-')), entry = join(temp, 'current');
  symlinkSync(fileURLToPath(new URL('../', import.meta.url)), entry, process.platform === 'win32' ? 'junction' : 'dir');
  const probe = createServer(); await new Promise(resolve => probe.listen(0, '127.0.0.1', resolve));
  const port = probe.address().port; await new Promise(resolve => probe.close(resolve));
  const child = spawn(process.execPath, [join(entry, 'server.mjs')], { stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, AGENT_MODE: 'mock', AGENT_TRACE_MODE: 'offline', AGENT_PORT: String(port),
      AGENT_DATA_DIR: join(temp, 'data'), AGENT_PUBLIC_ORIGIN: '', AGENT_TRIAL_SEED_RESERVED_UNITS: '0' } });
  t.after(async () => { if (child.exitCode === null) { child.kill(); await once(child, 'exit'); } });
  child.stderr.resume();
  let timer;
  try {
    await new Promise((resolve, reject) => {
      let output = '';
      child.stdout.on('data', chunk => { output += chunk.toString(); if (output.includes('Local research agent:')) resolve(); });
      child.once('error', reject); child.once('exit', code => reject(new Error(`CLI exited before listening (${code})`)));
      timer = setTimeout(() => reject(new Error('CLI did not start its listener')), 5000);
    });
  } finally { clearTimeout(timer); }
  const response = await fetch(`http://127.0.0.1:${port}${BASE_PATH}api/auth/status`);
  assert.equal(response.status, 200); const auth = await response.json();
  assert.equal(auth.mode, 'mock'); assert.equal(auth.traceMode, 'offline'); assert.equal(auth.setupRequired, true);
});

test('public configuration requires exact HTTPS, persistent storage and a cumulative seed floor', () => {
  for (const origin of ['http://comments.leonzk.cn', 'https://comments.leonzk.cn/path', 'https://user@comments.leonzk.cn', 'https://localhost'])
    assert.throws(() => loadConfig({ AGENT_PUBLIC_ORIGIN: origin }), /HTTPS/);
  assert.throws(() => loadConfig({ AGENT_PUBLIC_ORIGIN: 'https://comments.leonzk.cn' }), /DATA_DIR/);
  assert.throws(() => loadConfig({ AGENT_PUBLIC_ORIGIN: 'https://comments.leonzk.cn', AGENT_DATA_DIR: tmpdir() }), /seed floor/);
});

test('public startup refuses an unseeded database and releases its lock', () => {
  const config = { ...loadConfig({}), dataDir: mkdtempSync(join(tmpdir(), 'research-production-empty-')), publicOrigin: 'https://comments.leonzk.cn', trialSeedReservedUnits: 1881 };
  assert.throws(() => createApplication(config), /pre-seeded/);
  const store = new Store(config.dataDir); store.close();
});

test('public startup refuses a reset budget even when a password was seeded', async () => {
  const config = { ...loadConfig({}), dataDir: mkdtempSync(join(tmpdir(), 'research-production-reset-')), publicOrigin: 'https://comments.leonzk.cn', trialSeedReservedUnits: 1881 };
  const store = new Store(config.dataDir); store.createPassword(await hashPassword(newToken())); store.close();
  assert.throws(() => createApplication(config), /preserved trial-budget/);
});

test('HTTPS proxy enforces origin, Secure cookies, disabled setup and preserved cumulative accounting', async t => {
  const origin = 'https://comments.leonzk.cn';
  const config = { ...loadConfig({}), port: 0, dataDir: mkdtempSync(join(tmpdir(), 'research-production-http-')), publicOrigin: origin, trialSeedReservedUnits: 1881 };
  const seed = new Store(config.dataDir), password = newToken(); seed.createPassword(await hashPassword(password));
  const historical = seed.createTask({ goal: 'prior', budgetUnits: 5000 }, config);
  const reservation = seed.reserveModelCall(historical.id, 1881, config);
  seed.recordModelUsage(reservation, { usageEstimateYuan: 0.039477 }); historical.status = 'completed'; seed.saveTask(historical); seed.close();
  const app = createApplication(config); const base = await app.listen(); t.after(() => app.close());
  const proxy = { 'x-forwarded-proto': 'https', 'x-forwarded-host': new URL(origin).host };
  const request = (path, body, extra = {}) => fetch(base + BASE_PATH + path, { method: body === undefined ? 'GET' : 'POST',
    headers: { ...proxy, ...(body === undefined ? {} : { origin, 'content-type': 'application/json' }), ...extra },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  assert.equal((await fetch(base + BASE_PATH)).status, 403);
  assert.equal((await request('', undefined, { 'x-forwarded-proto': 'http' })).status, 403);
  assert.equal((await request('', undefined, { 'x-forwarded-host': 'evil.example' })).status, 403);
  assert.equal((await request('api/auth/setup', { password })).status, 403);
  assert.equal((await request('api/auth/login', { password }, { origin: base })).status, 403);
  assert.equal((await request('api/tasks')).status, 401);
  const login = await request('api/auth/login', { password }); assert.equal(login.status, 200);
  const cookieHeader = login.headers.get('set-cookie'); assert.match(cookieHeader, /; Secure/); assert.match(cookieHeader, /HttpOnly/);
  const cookie = cookieHeader.split(';')[0];
  const status = await (await request('api/status', undefined, { cookie })).json();
  assert.equal(status.trialBudget.reservedYuan, 0.1881);
  const auth = await (await request('api/auth/status')).json(); assert.equal(auth.accessScope, 'password-protected-https');
  const logout = await request('api/auth/logout', {}, { cookie }); assert.match(logout.headers.get('set-cookie'), /Max-Age=0; Secure/);
});

test('site proxy uses only the fixed backend, preserves session cookies and private response headers', async () => {
  const token = newToken(); let requests = 0;
  const response = await proxySiteRequest(new Request('https://leonzk.cn' + PRIVATE_PATH + 'api/auth/login', { method: 'POST',
    headers: { origin: 'https://leonzk.cn', 'content-type': 'application/json', cookie: 'analytics=private; research_session=' + token,
      authorization: 'must-not-forward', 'x-forwarded-host': 'attacker.example' }, body: '{"password":"synthetic-only"}' }),
    async (url, init) => { requests++; assert.equal(String(url), 'https://comments.leonzk.cn' + PRIVATE_PATH + 'api/auth/login');
      assert.equal(init.headers.get('origin'), 'https://comments.leonzk.cn'); assert.equal(init.headers.get('cookie'), 'research_session=' + token);
      assert.equal(init.headers.get('authorization'), null); assert.equal(init.headers.get('x-forwarded-host'), null);
      assert.equal(init.redirect, 'manual'); assert.equal(init.body, '{"password":"synthetic-only"}');
      return new Response('{}', { headers: { 'set-cookie': 'research_session=' + token + '; Secure; HttpOnly', 'cache-control': 'public', 'access-control-allow-origin': '*' } }); });
  assert.equal(response.status, 200); assert.equal(requests, 1); assert.equal(response.headers.get('cache-control'), 'private, no-store');
  assert.match(response.headers.get('set-cookie'), /Secure/); assert.equal(response.headers.get('access-control-allow-origin'), null);
  assert.match(response.headers.get('x-robots-tag'), /noindex/);
  assert.equal(response.headers.get('x-research-proxy-version'), 'private-policy-v4');
});

test('site proxy forwards Unicode JSON as a string and rejects invalid UTF-8 before upstream fetch', async () => {
  const body = JSON.stringify({ goal: '比较个人网站方案', budgetYuan: 0.5 }); let calls = 0;
  const upstream = async (url, init) => { calls++; assert.equal(typeof init.body, 'string'); assert.equal(init.body, body); return new Response('{}'); };
  const headers = { origin: 'https://leonzk.cn', 'content-type': 'application/json' };
  assert.equal((await proxySiteRequest(new Request('https://leonzk.cn' + PRIVATE_PATH, { method: 'POST', headers, body }), upstream)).status, 200);
  assert.equal((await proxySiteRequest(new Request('https://leonzk.cn' + PRIVATE_PATH, { method: 'POST', headers, body: new Uint8Array([0xc3, 0x28]) }), upstream)).status, 400);
  assert.equal(calls, 1);
});

test('site proxy rejects cross-origin requests, unapproved paths, oversized bodies and external redirects', async () => {
  let calls = 0; const upstream = async () => { calls++; return new Response('{}'); };
  assert.equal((await proxySiteRequest(new Request('https://evil.example' + PRIVATE_PATH), upstream)).status, 404);
  assert.equal((await proxySiteRequest(new Request('https://leonzk.cn/posts/'), upstream)).status, 404);
  assert.equal((await proxySiteRequest(new Request('https://leonzk.cn' + PRIVATE_PATH, { method: 'DELETE' }), upstream)).status, 405);
  assert.equal((await proxySiteRequest(new Request('https://leonzk.cn' + PRIVATE_PATH, { method: 'POST', headers: { origin: 'https://evil.example' }, body: '{}' }), upstream)).status, 403);
  assert.equal((await proxySiteRequest(new Request('https://leonzk.cn' + PRIVATE_PATH, { method: 'POST', headers: { origin: 'https://leonzk.cn' }, body: 'x'.repeat(16_385) }), upstream)).status, 413);
  assert.equal(calls, 0);
  const redirect = await proxySiteRequest(new Request('https://leonzk.cn' + PRIVATE_PATH), async () => new Response(null, { status: 302, headers: { location: 'https://evil.example' } }));
  assert.equal(redirect.status, 502);
  const unavailable = await proxySiteRequest(new Request('https://leonzk.cn' + PRIVATE_PATH), async () => { throw new Error('private diagnostic'); });
  assert.equal(unavailable.status, 502); assert.ok(!(await unavailable.text()).includes('private diagnostic'));
});

test('site proxy preserves EdgeOne ArrayBuffer, view and string stream chunks', async () => {
  const body = JSON.stringify({ goal: '线上中文请求', budgetYuan: 0.5 });
  const bytes = new TextEncoder().encode(body);
  const padded = new Uint8Array(bytes.length + 4); padded.set(bytes, 2);
  for (const chunk of [bytes.buffer, new DataView(padded.buffer, 2, bytes.length), body]) {
    let read = false;
    const request = { url: 'https://leonzk.cn' + PRIVATE_PATH + 'api/tasks', method: 'POST',
      headers: new Headers({ origin: 'https://leonzk.cn', 'content-type': 'application/json' }),
      body: { getReader: () => ({ read: async () => read ? { done: true } : (read = true, { done: false, value: chunk }), releaseLock() {} }) } };
    const response = await proxySiteRequest(request, async (url, init) => {
      assert.equal(init.body, body); return new Response('{}');
    });
    assert.equal(response.status, 200);
  }
});
