const CACHE_NAME = "my-app-cache";

const urlsToCache = [
  "/",
  `%PUBLIC_URL%/index.html`,
  `%PUBLIC_URL%/static/css/main.*.css`,
  `%PUBLIC_URL%/static/js/main.*.js`,
  `%PUBLIC_URL%/images/icon-512x512.png`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
