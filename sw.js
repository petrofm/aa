const CACHE_NAME = 'letters-app-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  // додайте сюди шляхи до ваших стилів, скриптів, іконок…
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(res => res || fetch(evt.request))
  );
});
