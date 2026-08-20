const CACHE = 'family-planner-build059-v1';
const APP_SHELL = './index.html';
self.addEventListener('install', event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE).then(cache => cache.add(APP_SHELL))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', event => { const req=event.request; if(req.method!=='GET') return; event.respondWith(fetch(req).catch(()=>caches.match(req))); });
