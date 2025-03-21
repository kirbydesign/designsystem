import {
  enableProdMode,
  importProvidersFrom,
  inject,
  LOCALE_ID,
  provideAppInitializer,
} from '@angular/core';

import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localeData from '@angular/common/locales/en-DK';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { IconRegistryService, KirbyModule, provideKirby } from '@kirbydesign/designsystem';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';

import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localeData);

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule, KirbyModule),
    provideKirby(),
    provideHttpClient(),
    provideAnimations(),
    provideRouter(
      routes,
      withRouterConfig({ canceledNavigationResolution: 'computed' }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      })
    ),
    { provide: LOCALE_ID, useValue: 'en-DK' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideAppInitializer(() => {
      const iconRegistry = inject(IconRegistryService);
      iconRegistry.addIcons([
        {
          name: 'football',
          svg: 'assets/icons/football.svg',
        },
        {
          name: 'umbrella',
          svg: 'assets/icons/umbrella.svg',
        },
      ]);
    }),
  ],
}).catch((err) => console.error(err));
