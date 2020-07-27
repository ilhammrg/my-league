const APPSHELL_CACHE = 'my-league-app-shell-v1';
const API_CACHE = 'my-league-api-v1';
const LOGO_CACHE = 'my-league-logo-v1';

let assets = [
    "/",
    "/index.html",
    "/index.bundle.js",
    "/vendors.bundle.js",
    "/manifest.json",
    "/assets/icons/icon-72x72.png",
    "/assets/icons/icon-96x96.png",
    "/assets/icons/icon-128x128.png",
    "/assets/icons/icon-144x144.png",
    "/assets/icons/icon-152x152.png",
    "/assets/icons/icon-192x192.png",
    "/assets/icons/icon-384x384.png",
    "/assets/icons/icon-512x512.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.googleapis.com/css2?family=Epilogue:wght@400;700&display=swap",
    "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/13/LaLiga.svg",
    "https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg"
];

// Caching app-shell
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(APPSHELL_CACHE)
            .then(cache => cache.addAll(assets))
    );
});

// Intercept fetch
self.addEventListener("fetch", event => {
    let base_url_api = "https://api.football-data.org/";
    let base_url_logo = "https://upload.wikimedia.org/";

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                } else if (event.request.url.indexOf(base_url_api) > -1) {
                    caches.open(API_CACHE)
                        .then(cache => 
                            fetch(event.request)
                            .then(response => {
                                cache.put(event.request.url, response.clone());
                                return response;
                            })
                        )
                } else if (event.request.url.indexOf(base_url_logo) > -1) {
                    caches.open(LOGO_CACHE)
                        .then(cache => 
                            fetch(event.request)
                            .then(response => {
                                cache.put(event.request.url, response.clone());
                                return response;
                            })
                        )
                }
                return fetch(event.request);
        })
    );
});

// Delete outdated app-shell
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
        .then(cacheNames => 
            Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName != APPSHELL_CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});

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