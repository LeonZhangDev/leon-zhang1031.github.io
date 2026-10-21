const CACHE_NAME = 'jingxin-hall-v1';
const CORE_ROUTES = [
  '/jing/',
  '/jing/meditation/',
  '/jing/muyu/',
  '/jing/fo/',
  '/jing/dao/',
  '/jing/chouqian/',
  '/jing/yixue/',
  '/jing/bazi/',
  '/jing/yijing/',
  '/jing/qimen/',
  '/jing/notes/',
  '/jing/favicon.svg',
  '/jing/jingxin-hall.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ROUTES)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('jingxin-hall-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith('/jing/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/jing/'))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      if (response.ok && ['style', 'script', 'image', 'font', 'audio'].includes(request.destination)) {
        caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
      }
      return response;
    })),
  );
});
