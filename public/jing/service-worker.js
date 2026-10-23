// Replaced by the production build with the exact public Jing dependency graph.
const OFFLINE_BUILD = null;
const CACHE_PREFIX = 'jingxin-hall-';
const CACHE_NAME = `${CACHE_PREFIX}v2-${OFFLINE_BUILD?.version ?? 'unbuilt'}`;
const ENTRIES = new Map((OFFLINE_BUILD?.entries ?? []).map((entry) => [entry.url, entry]));

async function verifiedFetch(entry) {
  const response = await fetch(entry.url, { cache: 'reload', credentials: 'same-origin', redirect: 'error' });
  if (response.status !== 200) throw new Error(`Offline asset unavailable: ${entry.url}`);
  const bytes = await response.clone().arrayBuffer();
  const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))]
    .map((value) => value.toString(16).padStart(2, '0')).join('');
  if (hash !== entry.revision) throw new Error(`Offline asset revision mismatch: ${entry.url}`);
  return response;
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    if (!OFFLINE_BUILD?.entries.length) throw new Error('Offline assets require a production build');
    const cache = await caches.open(CACHE_NAME);
    let next = 0;
    const assets = [...ENTRIES.values()];
    const results = await Promise.allSettled(Array.from({ length: 3 }, async () => {
      while (next < assets.length) {
        const entry = assets[next++];
        await cache.put(entry.url, await verifiedFetch(entry));
      }
    }));
    const failure = results.find((result) => result.status === 'rejected');
    if (failure) {
      await caches.delete(CACHE_NAME);
      throw failure.reason;
    }
  })());
  // An update waits until existing tabs close, preserving their lazy modules.
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

async function rangeResponse(response, range) {
  const bytes = await response.arrayBuffer();
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  const size = bytes.byteLength;
  let start = match?.[1] ? Number(match[1]) : 0;
  let end = match?.[2] ? Number(match[2]) : size - 1;
  if (match && !match[1] && match[2]) {
    start = Math.max(0, size - Number(match[2]));
    end = size - 1;
  }
  const headers = new Headers(response.headers);
  headers.delete('Content-Encoding');
  headers.set('Accept-Ranges', 'bytes');
  if (!match || (!match[1] && !match[2]) || range === 'bytes=-0'
    || !Number.isSafeInteger(start) || !Number.isSafeInteger(end)
    || start >= size || end < start) {
    headers.set('Content-Range', `bytes */${size}`);
    headers.set('Content-Length', '0');
    return new Response(null, { status: 416, headers });
  }
  end = Math.min(end, size - 1);
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(end - start + 1));
  return new Response(bytes.slice(start, end + 1), { status: 206, headers });
}

function publicStudyNavigation(request, url) {
  if (request.mode !== 'navigate' || url.searchParams.size !== 1) return false;
  return (url.pathname === '/jing/meditation/' && ['1', '3', '5', '10', '20'].includes(url.searchParams.get('minutes')))
    || (url.pathname === '/jing/yixue/' && ['wood', 'fire', 'earth', 'metal', 'water'].includes(url.searchParams.get('term')));
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  // Known UI queries read static HTML by pathname; query strings are never stored.
  if (request.method !== 'GET' || url.origin !== self.location.origin
    || (url.search && !publicStudyNavigation(request, url))
    || request.headers.has('Authorization') || !ENTRIES.has(url.pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    let response = await cache.match(url.pathname);
    if (!response) {
      response = await verifiedFetch(ENTRIES.get(url.pathname));
      event.waitUntil(cache.put(url.pathname, response.clone()));
    }
    const range = request.headers.get('Range');
    return range ? rangeResponse(response, range) : response;
  })());
});
