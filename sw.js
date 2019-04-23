'use strict';

// random comment to trigger sw update - and hope it works 🤞

const carDealsCacheName = 'carDealsCacheV1';
const carDealsCachePagesName = 'carDealsCachePagesV1';
const carDealsCacheImageName = 'carDealsCacheImagesV1'

// you can precache files from another origin/ cdn
const carDealsCacheFiles = [
  'js/app.js',
  'js/carService.js',
  'js/clientStorage.js',
  'js/template.js',
  'resources/localforage-getitems.js',
  'resources/localforage-setitems.js',
  'resources/localforage.min.js',
  'resources/material.min.js',
  'resources/material.min.js.map',
  'resources/material.red-indigo.min.css',
  'resources/system.js',
  'assets/android-icon-36x36.png',
  'assets/android-icon-48x48.png',
  'assets/android-icon-72x72.png',
  'assets/android-icon-96x96.png',
  'assets/android-icon-144x144.png',
  'assets/android-icon-192x192.png',
  'assets/apple-icon-57x57.png',
  'assets/apple-icon-60x60.png',
  'assets/apple-icon-72x72.png',
  'assets/apple-icon-76x76.png',
  'assets/apple-icon-114x114.png',
  'assets/apple-icon-120x120.png',
  'assets/apple-icon-144x144.png',
  'assets/apple-icon-152x152.png',
  'assets/apple-icon-180x180.png',
  'assets/apple-icon-precomposed.png',
  'assets/apple-icon.png',
  'assets/browserconfig.xml',
  'assets/favicon-16x16.png',
  'assets/favicon-32x32.png',
  'assets/favicon-96x96.png',
  'assets/favicon.ico',
  'assets/ms-icon-70x70.png',
  'assets/ms-icon-144x144.png',
  'assets/ms-icon-150x150.png',
  'assets/ms-icon-310x310.png',
  './',
  // 'sw.js' // - not sure we should be caching this
];

self.addEventListener('install', async (event) => {
  console.log('From SW: Install Event', event);
  self.skipWaiting(); // ti auto update the current service worker whenever it is updated
  // this helps with renewing the service workers and ensure changes take effect in existing
  // tabs

  // this will extend the install time until caching is done
  event.waitUntil(
    // best place to cache is during the install stage and in the listener
    caches.open(carDealsCacheName)
      .then(cache => {
        console.log(cache);
        cache.addAll(carDealsCacheFiles)
          .then(() => console.log('done caching'))
      })
  );
});

self.addEventListener('activate', event => {
  console.log('From SW: Activate State', event);
  self.clients.claim(); // reason same as self.skipWaiting();

  event.waitUntil(
    caches.keys()
      .then(cacheKeys => {
        const deletePromises = [];
        for (let i = 0; i < cacheKeys.length; i++) {
          if (cacheKeys[i] != carDealsCacheName && cacheKeys[i] != carDealsCachePagesName && cacheKeys[i] != carDealsCacheImageName) {
            deletePromises.push(caches.delete(cacheKeys[i]));
          }
        }
        return Promise.all(deletePromises);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // to intercept a fetch requesr, check this
  // event.respondWith(new Response('<h1>Hello! You\'ve been punked!</h1>'));

  const requestUrl = new URL(event.request.url);
  const requestPath = requestUrl.pathname;
  const filename = requestPath.substring(requestPath.lastIndexOf('/') + 1);

  if (requestUrl == latestPath || filename == 'sw.js') {
    event.respondWith(fetch(event.request));
  }
});
