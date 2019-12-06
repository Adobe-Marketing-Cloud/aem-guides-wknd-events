const fs = require('fs');
const path = require('path');
const { injectManifest } = require('workbox-build');
const { entrypoints } = require('../entrypoints');

const BUILD_DIR = path.join(__dirname, '..', '..', 'dist', 'angular-app');

const SW_PATH = path.join(BUILD_DIR, 'service-worker.js');
const SW_TEMPLATE_PATH = path.join(__dirname, 'template.js');

const APP_ROOT = '/content/wknd-events/angular';
const APP_START_PAGE = `${APP_ROOT}/home.html`;

/**
 * Deletes a previously generated service worker file (if it exists)
 *
 * @param {string} swPath: Path to the existing service worker file
 */
const removeExistingWorker = swPath => {
  if (fs.existsSync(swPath)) {
    fs.unlinkSync(swPath);
    console.log(`Deleted existing service worker at ${swPath}`);
  } else {
    console.log(`No existing service worker at ${swPath}`);
  }
};

/**
 * Generates a new service worker from the provided template using the Workbox
 * library
 */
const main = async () => {
  removeExistingWorker(SW_PATH);

  await injectManifest({
    swSrc: SW_TEMPLATE_PATH,
    swDest: SW_PATH,

    // Resources to precache
    globDirectory: BUILD_DIR,
    globPatterns: ['**/*.{js,css,html}'],
    globIgnores: entrypoints,

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
};

main();
