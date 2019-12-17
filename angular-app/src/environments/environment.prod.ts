export const environment = {
  // Root path of the AEM instance (used as the scope of the service worker,
  // which needs to be able to intercept all requests to resources under that
  // root path)
  aemRoot: '/',

  // Equivalent of `process.env.NODE_ENV`
  production: true,

  // Path to the `public` directory when the web app is deployed. In the case of
  // AEM, that's the path to the `resources` ClientLib directory. Specifying
  // this path is required for features like code splitting to work (because it
  // will be prepended to paths in the `asset-manifest.json` file)
  publicUrl: '/etc.clientlibs/wknd-events/clientlibs/angular-app/resources'
};
