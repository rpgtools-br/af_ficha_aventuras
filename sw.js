/* ════════════════════════════════════════════════════════════
   SERVICE WORKER — Aventuras Fantásticas Ficha Interativa
   Incrementar CACHE_VER ao publicar nova versão do index.html
════════════════════════════════════════════════════════════ */
const CACHE_VER  = 'v1';
const CACHE_APP  = `af-app-${CACHE_VER}`;
const CACHE_FONT = `af-fonts-${CACHE_VER}`;

const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
];

/* ── Install: pré-cache dos arquivos locais ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_APP)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: remove caches de versões antigas ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== CACHE_APP && k !== CACHE_FONT)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch: estratégia por origem ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  /* Fontes Google: cache-first (offline após primeira visita) */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE_FONT).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(res => {
            cache.put(event.request, res.clone());
            return res;
          });
        })
      )
    );
    return;
  }

  /* Arquivos locais: cache-first, rede como fallback */
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
    );
  }
});
