// FotoSort Service Worker – v2
// FIX: Cache only index.html (single-file app – no style.css / app.js exist)
// FIX: Stale-while-revalidate for HTML, cache-first for everything else
// FIX: Proper cache versioning – bump CACHE_VER to force update

const CACHE_VER = 'fotosort-v2';
const SHELL = ['./index.html', './manifest.json', './icon-192.svg'];

// ── Install: pre-cache shell assets ──────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VER)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] Install failed:', err))
  );
});

// ── Activate: purge old caches ───────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VER).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: network-first for HTML, cache-first for assets ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET and cross-origin requests (e.g. Anthropic API)
  if (event.request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  // HTML: stale-while-revalidate (always fresh UI)
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    event.respondWith(
      caches.open(CACHE_VER).then(cache =>
        fetch(event.request)
          .then(response => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => cache.match(event.request))
      )
    );
    return;
  }

  // Other assets: cache-first with network fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          caches.open(CACHE_VER).then(cache => cache.put(event.request, response.clone()));
        }
        return response;
      });
    })
  );
});
