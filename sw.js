const CACHE='family-planner-build119-v1';
const APP_SHELL='./index.html';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.add(APP_SHELL)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);const shell=r.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/family-planner/');if(shell){e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(APP_SHELL,cp));return res}).catch(()=>caches.match(APP_SHELL)));return}e.respondWith(fetch(r).catch(()=>caches.match(r))) });
