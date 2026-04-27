// Ketebul Music — Service Worker
// Version bump = forces browser to install new worker and clear old caches
const CACHE_VERSION = 'ketebul-v2';
const STATIC_CACHE  = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// Shell assets to precache immediately on install
// Ensure these files exist in your /public folder exactly as named
const PRECACHE_URLS = [
  '/',
  '/offline',
  '/logo.png',
  '/favicon.ico',
  '/favicon-96x96.png',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/site.webmanifest',
];

// ── Install ──────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Precaching app shell');
      // Using {cache: 'reload'} to bypass the browser's own cache 
      // ensures we get the freshest files from the server
      return Promise.all(
        PRECACHE_URLS.map(url => {
          return cache.add(new Request(url, { cache: 'reload' }))
            .catch(err => console.warn(`[SW] Failed to cache: ${url}`, err));
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// ── Activate — clean old caches ──────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter(name => name.startsWith('ketebul-') && name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map(name => {
            console.log(`[SW] Deleting old cache: ${name}`);
            return caches.delete(name);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch strategy ──────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Skip non-GET, browser extensions, Vercel analytics, and Next.js HMR
  if (
    request.method !== 'GET' ||
    url.protocol === 'chrome-extension:' ||
    url.hostname.includes('vercel-insights') ||
    url.hostname.includes('va.vercel-scripts') ||
    url.pathname.startsWith('/_next/webpack-hmr')
  ) return;

  // 2. Sanity API — network only (live content)
  if (url.hostname.includes('sanity.io') || url.hostname.includes('cdn.sanity.io')) {
    event.respondWith(
      fetch(request).catch(() => 
        new Response(JSON.stringify({ error: 'Offline' }), { 
          headers: { 'Content-Type': 'application/json' } 
        })
      )
    );
    return;
  }

  // 3. Navigation requests — Network-first, fallback to /offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then(cached => cached || caches.match('/offline'))
        )
    );
    return;
  }

  // 4. Static assets (Images, Fonts, Scripts) — Cache-first, then update
  if (url.pathname.match(/\.(js|css|woff2?|png|jpg|jpeg|svg|ico|webp)$/)) {
    event.respondWith(
      caches.match(request).then(cached => {
        return cached || fetch(request).then(response => {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then(cache => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // 5. Default — Stale-while-revalidate
  event.respondWith(
    caches.open(DYNAMIC_CACHE).then(cache =>
      cache.match(request).then(cached => {
        const fetchPromise = fetch(request).then(response => {
          cache.put(request, response.clone());
          return response;
        });
        return cached || fetchPromise;
      })
    )
  );
});