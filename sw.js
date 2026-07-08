// 우리가족 플래너 - 오프라인에서도 앱이 뜰 수 있도록 화면(껍데기)만 캐싱합니다.
// 실제 할일/일정 데이터는 항상 Firestore 실시간 동기화로 가져오므로 여기서는 다루지 않습니다.
const CACHE_NAME = 'family-planner-shell-v1';
const SHELL_FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(SHELL_FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  // 앱 화면(HTML) 요청: 네트워크 우선 시도 후 실패하면 캐시된 화면을 보여줌 (오프라인 대비)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(function () {
        return caches.match('./index.html');
      })
    );
    return;
  }
  // 그 외 정적 파일: 캐시 우선, 없으면 네트워크
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      return cached || fetch(e.request);
    })
  );
});
