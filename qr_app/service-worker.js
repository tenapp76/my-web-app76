// インストール時に offline.html を含むすべてのアセットをキャッシュ
const CACHE_NAME = 'qr-lottery-v1';
const ASSETS = [
  'index.html',
  'offline.html',        // オフライン用ページをキャッシュ
  'manifest.json',
  'service-worker.js',
  'images/icon-192.png',
  'images/icon-512.png',
  'images/bg_setup.jpg',
  'images/bg_play.jpg',
  'images/1等.png',
  // …(3等～10等, default画像, result/*.html, BGMなど)… 
];

// 従来どおりキャッシュ登録・クリーンアップ
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(names =>
    Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
  ));
});

// フェッチ時の振る舞い
self.addEventListener('fetch', event => {
  const req = event.request;
  // ページ遷移要求時はまずネットワーク、失敗時に offline.html を返す
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('/offline.html'))
    );
    return;
  }
  // それ以外はキャッシュ優先
  event.respondWith(
    caches.match(req).then(res => res || fetch(req))
  );
});
