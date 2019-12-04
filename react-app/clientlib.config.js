const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, 'build');
const CLIENTLIB_DIR = path.join(
  __dirname,
  '..',
  'ui.apps',
  'src',
  'main',
  'content',
  'jcr_root',
  'apps',
  'wknd-events',
  'clientlibs'
);

// Read entrypoint files and order from `asset-manifest.json`
const assetManifest = fs.readFileSync(
  path.join(BUILD_DIR, 'asset-manifest.json'),
  { encoding: 'utf8' }
);
const { entrypoints } = JSON.parse(assetManifest);
const jsEntrypoints = entrypoints.filter(fileName => fileName.endsWith('.js'));
const cssEntrypoints = entrypoints.filter(fileName =>
  fileName.endsWith('.css')
);

// Config for `aem-clientlib-generator`
module.exports = {
  context: BUILD_DIR,
  clientLibRoot: CLIENTLIB_DIR,
  libs: {
    name: 'react-app',
    allowProxy: true,
    categories: ['wknd-events.react'],
    embed: ['wknd-events.grid'],
    jsProcessor: ['default:none', 'min:none'],
    serializationFormat: 'xml',
    assets: {
      // Copy entrypoint scripts and stylesheets into the respective ClientLib
      // directories (in the order they are in the entrypoints arrays). They
      // will be bundled by AEM and requested from the HTML. The remaining
      // chunks (placed in `resources`) will be loaded dynamically
      js: jsEntrypoints,
      css: cssEntrypoints,

      // Copy all other files into the `resources` ClientLib directory
      resources: {
        cwd: '.',
        flatten: false,
        files: ['**/*.*'],
        ignore: [...jsEntrypoints, ...cssEntrypoints]
      }
    }
  }
};
