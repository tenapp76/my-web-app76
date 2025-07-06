// インストール時に offline.html を含むすべてのアセットをキャッシュ
const CACHE_NAME = 'qr-lottery-v1';
const ASSETS = [
  'index.html',
  'offline.html',
  'manifest.json',
  'service-worker.js',
  'images/icon-192.png',
  'images/icon-512.png',
  'images/bg_setup.jpg',
  'images/bg_play.jpg',

  // QRコード本体
  'images/1等.png', 'images/2等.png', /* … */ 'images/10等.png',

  // デフォルト結果画像
  'images/default_1.png', /* … */ 'images/default_10.png',

  // 結果ページ
  'result/1等.html', /* … */ 'result/10等.html',

  // BGM
  'data/bgm_pop.mp3',
  'data/bgm_japan.mp3',
  'data/bgm_fanfare.mp3',
];

// 従来どおりキャッシュ登録・クリーンアップ
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names
          .filter(n => n !== CACHE_NAME)
          .map(n => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

// フェッチ時の振る舞い
self.addEventListener('fetch', event => {
  const req = event.request;
  // ページ遷移要求時はまずネットワーク、失敗時に offline.html を返す
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('offline.html'))
    );
    return;
  }
  // それ以外はキャッシュ優先
  event.respondWith(
    caches.match(req).then(res => res || fetch(req))
  );
});
