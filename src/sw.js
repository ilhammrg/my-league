importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
    console.log(`Workbox: Loaded.`);

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
        {url: "/icon_72x72.png", revision: "1"},
        {url: "/icon_96x96.png", revision: "1"},
        {url: "/icon_128x128.png", revision: "1"},
        {url: "/icon_144x144.png", revision: "1"},
        {url: "/icon_152x152.png", revision: "1"},
        {url: "/icon_192x192.png", revision: "1"},
        {url: "/icon_384x384.png", revision: "1"},
        {url: "/icon_512x512.png", revision: "1"},
        {url: "/assets/icons/icon.svg", revision: "1"}
    ];

    setCacheNameDetails({
        prefix: 'my-league',
        suffix: 'v1',
        precache: 'common-resources',
        runtime: 'external-resources',
    });

    // Cache common assets
    precacheAndRoute(assetsCommon);

    // Cache external images assets
    registerRoute(
        ({request}) => request.destination === 'image',
        new CacheFirst({
          cacheName: `${cacheNames.runtime}`,
          plugins: [
            new CacheableResponsePlugin({
              statuses: [0, 200],
            }),
          ],
        }),
    );

    // Cache api assets
    registerRoute(
      /https:\/\/api\.football-data\.org\/v2/,
      new StaleWhileRevalidate({
        cacheName: `${cacheNames.prefix}-api-resources-${cacheNames.suffix}`,
      })
    );

    //  Cache Google Fonts
    registerRoute(
      ({url}) => url.origin === 'https://fonts.googleapis.com' ||
                 url.origin === 'https://fonts.gstatic.com',
      new StaleWhileRevalidate({
        cacheName: `${cacheNames.runtime}`
      })
    );

} else {
    console.log(`Workbox: Loading failed.`);
}

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