const CACHE = 'family-planner-build056-v1';
const APP_SHELL = './index.html';
self.addEventListener('install', event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE).then(cache => cache.add(APP_SHELL))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', event => { const req=event.request; if(req.method!=='GET') return; if(req.mode==='navigate'||new URL(req.url).pathname.endsWith('/index.html')||new URL(req.url).pathname.endsWith('/family-planner/')) { event.respondWith(fetch(req,{cache:'no-store'}).then(res=>{const copy=res.clone(); caches.open(CACHE).then(c=>c.put(APP_SHELL,copy)); return res;}).catch(()=>caches.match(APP_SHELL))); return; } event.respondWith(fetch(req).catch(()=>caches.match(req))); });
