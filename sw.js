const CACHE = 'family-planner-build025-v1';
const APP_SHELL = './index.html';

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.add(APP_SHELL)).catch(() => {}));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // HTML은 네트워크 우선. 새 Build가 배포되면 즉시 최신 index.html을 받습니다.
  if (req.mode === 'navigate' || new URL(req.url).pathname.endsWith('/index.html')) {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(cache => cache.put(APP_SHELL, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(APP_SHELL))
    );
    return;
  }

  event.respondWith(fetch(req).catch(() => caches.match(req)));
});
