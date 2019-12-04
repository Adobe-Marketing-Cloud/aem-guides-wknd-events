const fs = require('fs');
const { join } = require('path');
const { injectManifest } = require('workbox-build');

const BUILD_DIR = join(__dirname, '..', 'build');

const ASSET_MANIFEST_PATH = join(BUILD_DIR, 'asset-manifest.json');
const SW_PATH = join(BUILD_DIR, 'service-worker.js');
const SW_TEMPLATE_PATH = join(__dirname, 'template.js');

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
 * Returns all entrypoint chunks (JS and CSS) of the React app. These chunks
 * will not need to be precached because they're already requested from the HTML
 * file)
 *
 * @param {string} assetManifestPath: Path to the asset manifest file from which
 * the entrypoint files can be read
 */
const getEntrypoints = assetManifestPath => {
  if (!fs.existsSync(assetManifestPath)) {
    throw Error(
      `Cannot determine entrypoints: No asset manifest found at path ${assetManifestPath}`
    );
  }
  const manifest = fs.readFileSync(assetManifestPath, { encoding: 'utf8' });
  const manifestContent = JSON.parse(manifest);
  if (!('entrypoints' in manifestContent)) {
    throw Error(
      `Cannot determine entrypoints: Missing "entrypoints" key in ${assetManifestPath}`
    );
  }
  return manifestContent.entrypoints;
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
    globIgnores: getEntrypoints(ASSET_MANIFEST_PATH),

    // Correct path of SPA HTML (not served from ClientLib directory, but
    // `/content`)
    manifestTransforms: [
      originalManifest => ({
        manifest: originalManifest.map(entry =>
          entry.url.endsWith('index.html')
            ? { ...entry, url: '/content/wknd-events/react/home.html' }
            : entry
        ),
        warnings: []
      })
    ]
  });
  console.log(`Generated custom service worker at ${SW_PATH}`);
};

main();
