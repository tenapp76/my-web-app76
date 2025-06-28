const CACHE_NAME = 'qr-lottery-v1';
const ASSETS = [
  '/', '/index.html', '/manifest.json', '/service-worker.js',
  '/images/icon-192.png', '/images/icon-512.png',
  '/images/bg_setup.jpg', '/images/bg_play.jpg',
  '/images/1等.png', '/images/2等.png', /* ...3等～10等画像... */
  '/images/default_1等.png', /* ...default画像... */
  '/result/1等.html', /* ...2等～10等.html... */
  '/data/bgm_pop.mp3', '/data/bgm_japan.mp3', '/data/bgm_fanfare.mp3'
];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
EOF# service-worker.js を生成
cat << 'EOF' > service-worker.js
const CACHE_NAME = 'qr-lottery-v1';
const ASSETS = [
  '/', '/index.html', '/manifest.json', '/service-worker.js',
  '/images/icon-192.png', '/images/icon-512.png',
  '/images/bg_setup.jpg', '/images/bg_play.jpg',
  '/images/1等.png', '/images/2等.png', /* ...3等～10等画像... */
  '/images/default_1等.png', /* ...default画像... */
  '/result/1等.html', /* ...2等～10等.html... */
  '/data/bgm_pop.mp3', '/data/bgm_japan.mp3', '/data/bgm_fanfare.mp3'
];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
