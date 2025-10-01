/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
const CACHE_NAME = 'ton-profil-ia-cache-v3';
const urlsToCache = [
  // App Shell
  '/',
  '/index.html',
  '/index.css',
  '/manifest.json',
  '/index.tsx',
  '/App.tsx',
  '/sw.js',
  
  // Assets
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable.svg',
  '/social-card.svg',

  // Components
  '/components/Footer.tsx',
  '/components/GenderSelector.tsx',
  '/components/InfoModal.tsx',
  '/components/Logo.tsx',
  '/components/PolaroidCard.tsx',
  '/components/PresetSelector.tsx',
  '/components/ui/draggable-card.tsx',

  // Libs & Services
  '/lib/utils.ts',
  '/services/geminiService.ts',
  '/presets.ts',
  
  // CDN Dependencies
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Permanent+Marker&family=Roboto:wght@300;400;700&display=swap',
  'https://aistudiocdn.com/@google/genai@^1.17.0',
  'https://aistudiocdn.com/react@^19.1.1',
  'https://aistudiocdn.com/react-dom@^19.1.1/client',
  'https://aistudiocdn.com/framer-motion@^12.23.12',
  'https://aistudiocdn.com/tailwind-merge@^3.3.1',
  'https://aistudiocdn.com/clsx@^2.1.1',
  'https://esm.sh/jszip@3.10.1'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        const promises = urlsToCache.map(url => {
          const request = new Request(url, { cache: 'reload' });
          return fetch(request).then(response => {
            if (response.ok) {
              return cache.put(url, response);
            }
            console.warn(`Failed to cache ${url}: ${response.status} ${response.statusText}`);
            return Promise.resolve();
          }).catch(err => {
            console.error(`Fetch error for ${url}:`, err);
          });
        });
        return Promise.all(promises);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          response => {
            // Check if we received a valid response.
            // We don't cache opaque responses (status 0) to avoid caching errors from some CDNs.
            if (!response || response.status !== 200 || response.type === 'opaque') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(err => {
            console.log(`Fetch failed for ${event.request.url}; returning offline page if available.`);
            // You might want to return a fallback offline page here
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});