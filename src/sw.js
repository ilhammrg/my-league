importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
    console.log(`Workbox: Loaded.`);
} else {
    console.log(`Workbox: Loading failed.`);
}

const {cacheNames, setCacheNameDetails} = workbox.core;
const {precacheAndRoute} = workbox.precaching;
const {registerRoute} = workbox.routing;
const {StaleWhileRevalidate, CacheFirst} = workbox.strategies;
const {CacheableResponsePlugin} = workbox.cacheableResponse;

const assetsCommon = [
    {url: "/index.html", revision: "1"},
    {url: "/index.bundle.js", revision: "1"},
    {url: "/vendors.bundle.js", revision: "1"},
    {url: "/manifest.json", revision: "1"},
    {url: "/assets/icons/icon-72.svg", revision: "1"},
    {url: "/assets/icons/icon-96.svg", revision: "1"},
    {url: "/assets/icons/icon-128.svg", revision: "1"},
    {url: "/assets/icons/icon-144.svg", revision: "1"},
    {url: "/assets/icons/icon-152.svg", revision: "1"},
    {url: "/assets/icons/icon-192.svg", revision: "1"},
    {url: "/assets/icons/icon-384.svg", revision: "1"},
    {url: "/assets/icons/icon-512.svg", revision: "1"}
];

setCacheNameDetails({
    prefix: 'my-league',
    suffix: 'v1',
    precache: 'common-resources',
    runtime: 'external-resources',
});

// Precaching common assets
precacheAndRoute(assetsCommon);

// Caching external assets
registerRoute(
    ({request}) => request.destination === 'image',
    new CacheFirst({
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    }),
);

// Caching api assets
registerRoute(
    /https:\/\/api\.football-data\.org\/v2/,
    new StaleWhileRevalidate({
      cacheName: `${cacheNames.prefix}-api-resources-${cacheNames.suffix}`,
    }),
);

//  Caching Google Fonts Style
registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
      cacheName: `${cacheNames.runtime}`,
    }),
);

// Caching Google Fonts assets
registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
        cacheName: `${cacheNames.runtime}`,
    }),
);

// Push notification handler
self.addEventListener('push', event => {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    const options = {
      body: body,
      icon: 'assets/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
});