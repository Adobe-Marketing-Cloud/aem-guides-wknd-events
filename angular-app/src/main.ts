import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import isPublishInstance from './utils/is-publish-instance';
import { register } from 'register-service-worker';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Register service worker if on publish instance (caching is undesirable during development)
if (isPublishInstance()) {
  register(`${environment.publicUrl}/service-worker.js`, {
    registrationOptions: { scope: environment.aemRoot }
  });
}
