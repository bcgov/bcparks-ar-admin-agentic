import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  // Log only the sanitised error message on bootstrap failure. The raw
  // error object can include Angular component/module names and stack
  // traces, which we don't want exposed via the browser console.
  .catch(err => console.error('Error bootstrapping application:', err?.message ?? String(err)));
