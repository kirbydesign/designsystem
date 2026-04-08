import {
  enableProdMode,
  importProvidersFrom,
  inject,
  LOCALE_ID,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';

import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localeData from '@angular/common/locales/en-DK';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { IconRegistryService } from '@kirbydesign/designsystem/icon';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { provideKirby, withGlobalSetup } from '@kirbydesign/designsystem/config';
import { ThemeService } from '@kirbydesign/core';
import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';

import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localeData);

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    importProvidersFrom(BrowserModule, FormsModule),
    provideKirby(withGlobalSetup()),
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
      inject(ThemeService); // This line ensures it initializes

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
