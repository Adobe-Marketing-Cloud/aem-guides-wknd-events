const path = require('path');
const { injectManifest } = require('workbox-build');
const getEntrypoints = require('../entrypoints');

const BUILD_DIR = path.join(__dirname, '..', '..', 'build');

const ASSET_MANIFEST_PATH = path.join(BUILD_DIR, 'asset-manifest.json');
const SW_PATH = path.join(BUILD_DIR, 'service-worker.js');
const SW_TEMPLATE_PATH = path.join(__dirname, 'template.js');

const APP_ROOT = '/content/wknd-events/react';
const APP_START_PAGE = `${APP_ROOT}/home.html`;

/**
 * Generates a new service worker from the provided template using the Workbox
 * library
 */
async function generate() {
  await injectManifest({
    swSrc: SW_TEMPLATE_PATH,
    swDest: SW_PATH,

    // Resources to precache
    globDirectory: BUILD_DIR,
    globPatterns: ['**/*.{js,css,html}'],
    globIgnores: getEntrypoints(ASSET_MANIFEST_PATH),

    // Correct path of SPA HTML (not served from ClientLib directory, but
    // `/content`)
    manifestTransforms: [
      originalManifest => ({
        manifest: originalManifest.map(entry =>
          entry.url.endsWith('index.html')
            ? { ...entry, url: APP_START_PAGE }
            : entry
        ),
        warnings: []
      })
    ]
  });
  console.log(`Generated custom service worker at ${SW_PATH}`);
}

generate();
