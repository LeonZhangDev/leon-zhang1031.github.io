import assert from 'node:assert/strict';
import { createHash, webcrypto } from 'node:crypto';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { buildOfflineWorker } from '../scripts/jing/offline-build.mjs';

const source = await readFile(new URL('../public/jing/service-worker.js', import.meta.url), 'utf8');
const hash = (value) => createHash('sha256').update(value).digest('hex');
const bodies = new Map([['/jing/', '<h1>静心堂</h1>'], ['/_astro/chart.hash.js', 'export const chart = 1;'], ['/jing/audio/woodfish.mp3', '0123456789']]);
bodies.set('/jing/meditation/', '<h1>静心</h1>');
bodies.set('/jing/yixue/', '<h1>五行</h1>');
const manifest = {version:'test-build', entries:[...bodies].map(([url,body]) => ({url,revision:hash(body),bytes:Buffer.byteLength(body)}))};

test('service worker revalidates through the CDN instead of using immutable caching', async () => {
  const config = JSON.parse(await readFile(new URL('../edgeone.json', import.meta.url), 'utf8'));
  const rule = config.headers.find(({source}) => source === '/jing/service-worker.js');
  assert.equal(rule?.headers.find(({key}) => key === 'Cache-Control')?.value, 'no-cache');
});

function worker(override = {}) {
  const events = new Map();
  const storage = new Map();
  let fetches = 0;
  let claims = 0;
  const caches = {
    async open(key) {
      if (!storage.has(key)) storage.set(key,new Map());
      const entries = storage.get(key);
      return { async match(url) { return entries.get(url)?.clone(); }, async put(url,response) {entries.set(url,response.clone());} };
    },
    async keys() {return [...storage.keys()];},
    async delete(key) {return storage.delete(key);},
  };
  runInNewContext(source.replace('const OFFLINE_BUILD = null;', `const OFFLINE_BUILD = ${JSON.stringify(manifest)};`), {
    self:{location:{origin:'https://site.test'}, clients:{async claim(){claims++;}}, addEventListener:(name,callback)=>events.set(name,callback)},
    caches,crypto:webcrypto,Response,Headers,URL,
    fetch:async (url) => {fetches++;return override.fetch ? override.fetch(url) : new Response(bodies.get(url));},
  });
  return {
    storage, get fetches(){return fetches;}, get claims(){return claims;},
    async lifecycle(name) {let pending=Promise.resolve();events.get(name)({waitUntil(value){pending=value;}});await pending;},
    async request(path,options) {
      /** @type {Promise<Response | undefined>} */
      let response=Promise.resolve(undefined);const pending=[];
      const {mode,...init}=options??{};
      const request=new Request(new URL(path,'https://site.test'),init);
      if(mode) Object.defineProperty(request,'mode',{value:mode});
      events.get('fetch')({request,
        respondWith(value){response=Promise.resolve(value);},waitUntil(value){pending.push(value);}});
      const result=await response;await Promise.all(pending);return result;
    },
  };
}

test('offline version installs completely; activation preserves unrelated cache data', async () => {
  const w=worker();w.storage.set('private-notes',new Map());w.storage.set('jingxin-hall-v1',new Map());
  await w.lifecycle('install');assert.equal(w.claims,0);
  assert.equal(w.storage.get('jingxin-hall-v2-test-build').size,bodies.size);
  await w.lifecycle('activate');assert.equal(w.claims,1);
  assert.deepEqual([...w.storage.keys()].sort(),['jingxin-hall-v2-test-build','private-notes']);
});

test('failed download never activates a partial version or deletes the old cache', async () => {
  const w=worker({fetch:url=>new Response(bodies.get(url),{status:url.endsWith('.js')?503:200})});
  w.storage.set('jingxin-hall-v1',new Map());
  await assert.rejects(w.lifecycle('install'),/unavailable/);
  assert.deepEqual([...w.storage.keys()],['jingxin-hall-v1']);assert.equal(w.claims,0);
});

test('a deployment with mismatched content is rejected without replacing the old cache', async () => {
  const w=worker({fetch:()=>new Response('unexpected newer content')});
  w.storage.set('jingxin-hall-v1',new Map());
  await assert.rejects(w.lifecycle('install'),/revision mismatch/);
  assert.deepEqual([...w.storage.keys()],['jingxin-hall-v1']);
});

test('cached navigation and lazy JS do not wait for the network', async () => {
  const w=worker();await w.lifecycle('install');const count=w.fetches;
  assert.equal(await (await w.request('/jing/')).text(),bodies.get('/jing/'));
  assert.equal(await (await w.request('/_astro/chart.hash.js')).text(),bodies.get('/_astro/chart.hash.js'));
  assert.equal(w.fetches,count);
});

test('cache bypasses private requests, queries, other site scripts and external URLs', async () => {
  const w=worker();await w.lifecycle('install');const count=w.fetches;
  for (const path of ['/api/notes','/jing/?password=secret','/_astro/unrelated.js','https://other.test/jing/']) assert.equal(await w.request(path),undefined);
  assert.equal(await w.request('/jing/',{headers:{Authorization:'test-only'}}),undefined);
  assert.equal(await w.request('/jing/',{method:'POST',body:'private'}),undefined);
  assert.equal(w.fetches,count);
});

test('offline audio returns correct explicit, suffix, open and invalid ranges', async () => {
  const w=worker();await w.lifecycle('install');
  for (const [range,status,text,contentRange] of [
    ['bytes=2-5',206,'2345','bytes 2-5/10'],['bytes=-3',206,'789','bytes 7-9/10'],
    ['bytes=8-',206,'89','bytes 8-9/10'],['bytes=5-99',206,'56789','bytes 5-9/10'],
    ['bytes=10-',416,'','bytes */10'],['bytes=-0',416,'','bytes */10'],['bytes=0-1,3-4',416,'','bytes */10'],
  ]) {
    const response=await w.request('/jing/audio/woodfish.mp3',{headers:{Range:range}});
    assert.equal(response.status,status);assert.equal(await response.text(),text);assert.equal(response.headers.get('Content-Range'),contentRange);
  }
});

test('known study navigation parameters work offline without storing query URLs', async () => {
  const w=worker();await w.lifecycle('install');const count=w.fetches;
  for (const minutes of ['1','3','5','10','20']) {
    assert.equal(await(await w.request(`/jing/meditation/?minutes=${minutes}`,{mode:'navigate'})).text(),bodies.get('/jing/meditation/'));
  }
  for (const term of ['wood','fire','earth','metal','water']) {
    assert.equal(await(await w.request(`/jing/yixue/?term=${term}`,{mode:'navigate'})).text(),bodies.get('/jing/yixue/'));
  }
  for (const path of ['/jing/meditation/?minutes=2','/jing/meditation/?minutes=1&private=secret',
    '/jing/yixue/?term=unknown','/jing/yixue/?term=wood&term=metal']) {
    assert.equal(await w.request(path,{mode:'navigate'}),undefined);
  }
  assert.equal(await w.request('/jing/meditation/?minutes=1'),undefined);
  assert.equal(w.fetches,count);
  assert.ok([...w.storage.get('jingxin-hall-v2-test-build').keys()].every(key=>!key.includes('?')));
});

test('build manifest follows lazy chunks and CSS; excludes private and source-only files', async () => {
  const root=await mkdtemp(join(tmpdir(),'jing-offline-'));
  try {
    for (const path of ['jing','_astro','jing/audio','jing/generated/lot/frames-safe/guanyin']) await mkdir(join(root,path),{recursive:true});
    for (const [path,body] of Object.entries({
      'jing/index.html':'<script src="/_astro/entry.hash.js"></script><img src="/jing/scene.webp" srcset="/jing/small.webp 192w, /jing/large.webp 768w, https://other.test/private.webp 900w" sizes="50vw"><a href="/api/private">x</a>',
      'jing/service-worker.js':source,'jing/favicon.svg':'svg','jing/jingxin-hall.webmanifest':'{}',
      'jing/scene.webp':'pixels','jing/small.webp':'small','jing/large.webp':'large','jing/source-only.png':'source','jing/audio/rain.mp3':'sound',
      'jing/generated/lot/frames-safe/guanyin/frame-0.webp':'frame',
      '_astro/entry.hash.js':'entry','_astro/lazy.hash.js':'lazy','_astro/lazy.hash.css':'body{background:url("data:image/svg+xml,filter:url(%23p)")}',
      '_astro/unrelated.hash.js':'private app',
    })) await writeFile(join(root,path),body);
    const result=await buildOfflineWorker(root,new Map([
      ['_astro/entry.hash.js',{imports:[],dynamicImports:['_astro/lazy.hash.js']}],
      ['_astro/lazy.hash.js',{imports:[],dynamicImports:[],viteMetadata:{importedCss:new Set(['_astro/lazy.hash.css'])}}],
    ]));
    const emitted=await readFile(join(root,'jing/service-worker.js'),'utf8');
    const built=JSON.parse(emitted.match(/const OFFLINE_BUILD = (.*);/)[1]);
    assert.equal(result.files,built.entries.length);
    const urls=built.entries.map(entry=>entry.url);
    assert.ok(urls.includes('/_astro/lazy.hash.js'));assert.ok(urls.includes('/_astro/lazy.hash.css'));
    assert.ok(urls.includes('/jing/audio/rain.mp3'));assert.ok(!urls.includes('/jing/source-only.png'));
    assert.ok(urls.includes('/jing/small.webp'));assert.ok(urls.includes('/jing/large.webp'));
    assert.ok(urls.every(url=>!url.includes('other.test')));
    assert.ok(!urls.includes('/_astro/unrelated.hash.js'));assert.ok(!urls.some(url=>url.startsWith('/api/')));
    assert.equal(built.entries.find(entry=>entry.url==='/jing/scene.webp').revision,hash('pixels'));
    await writeFile(join(root,'jing/service-worker.js'),source);
    await writeFile(join(root,'jing/scene.webp'),'updated pixels');
    const updated=await buildOfflineWorker(root,new Map([
      ['_astro/entry.hash.js',{imports:[],dynamicImports:['_astro/lazy.hash.js']}],
      ['_astro/lazy.hash.js',{imports:[],dynamicImports:[],viteMetadata:{importedCss:new Set(['_astro/lazy.hash.css'])}}],
    ]));
    assert.notEqual(updated.version,result.version,'unversioned image changes must invalidate the cache');
  } finally {await rm(root,{recursive:true,force:true});}
});
