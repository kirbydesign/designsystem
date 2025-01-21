import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { KirbyModule } from '@kirbydesign/designsystem';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';

import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule, KirbyModule),
    { provide: LOCALE_ID, useValue: 'en-DK' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(),
    provideAnimations(),
    provideRouter(
      routes,
      withRouterConfig({ canceledNavigationResolution: 'computed' }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      })
    ),
  ],
}).catch((err) => console.error(err));
