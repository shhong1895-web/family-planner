const CACHE = 'family-planner-build021-v1';
const APP_SHELL = './index.html';

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.add(APP_SHELL)).catch(() => {}));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // HTML은 항상 네트워크 우선으로 받아 새 Build가 바로 반영되도록 합니다.
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
