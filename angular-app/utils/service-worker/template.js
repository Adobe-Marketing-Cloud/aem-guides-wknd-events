// Load Workbox library from CDN (makes `window.workbox` available). The version
// must match the one of `workbox-build` in `package.json`
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.0.0-rc.1/workbox-sw.js'
);

const APP_ROOT = '/content/wknd-events/angular';
const APP_START_PAGE = `${APP_ROOT}/home.html`;
const SERVICE_WORKER_NAME = 'service-worker.js';

/**
 * Adds regex escape characters to the provided string where necessary
 *
 * Source: MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping)
 *
 * @param {string} s: String to escape characters in
 */
function escapeForRegex(s) {
  // $& means the whole matched string
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Precache files in the ClientLib directory. The manifest contains all files
// matched by the `globDirectory` expression in the Workbox configuration
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Precache SPA HTML (which loads the SPA script) and serve it on all navigation
// routes
const spaHandler = workbox.precaching.createHandlerBoundToURL(APP_START_PAGE);
const navigationRoute = new workbox.routing.NavigationRoute(spaHandler, {
  whitelist: [new RegExp(APP_ROOT)]
});
workbox.routing.registerRoute(navigationRoute);

// Cache JS/JSON/CSS files (which aren't in the ClientLib directory)
workbox.routing.registerRoute(
  // Match all JS/JSON/CSS files, except for service worker file (this script)
  new RegExp(
    `^(?!.*\/${escapeForRegex(SERVICE_WORKER_NAME)}$).*\.(?:js|json|css)$`
  ),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources'
  })
);

// Cache image files (which aren't in the ClientLib directory)
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        maxEntries: 50
      })
    ]
  })
);

// Cache Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
);
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        maxEntries: 50
      })
    ]
  })
);
