const CACHE_NAME = 'quran-app-v2';
const ASSETS_TO_CACHE = [
    '/quran-app/',
    '/quran-app/index.html',
    '/quran-app/app.js',
    '/quran-app/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});
