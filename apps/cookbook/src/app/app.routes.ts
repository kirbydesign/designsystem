import { Routes } from '@angular/router';

import { AccessibilityGuidelinesComponent } from './accessibility/accessibility-guidelines.component';
import { ComponentOverviewComponent } from './component-overview/component-overview.component';
import { ExtensionsLandingPageComponent } from './extensions/extensions-landing-page.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { LocalizationComponent } from './localization/localization.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'intro',
        pathMatch: 'full',
      },
      {
        path: 'intro',
        component: IntroComponent,
        data: {
          resourceLink: 'Introduction',
        },
      },
      {
        path: 'showcase',
        loadChildren: () => import('./showcase/showcase.routes').then((m) => m.SHOWCASE_ROUTES),
      },
      {
        path: 'guides',
        loadChildren: () => import('./guides/guides.routes').then((m) => m.GUIDES_ROUTES),
        data: {
          resourceLink: 'Guides',
        },
      },
      {
        path: 'accessibility-in-kirby',
        component: AccessibilityGuidelinesComponent,
        data: {
          resourceLink: 'Accessibility',
        },
      },
      {
        path: 'component-overview',
        component: ComponentOverviewComponent,
      },
      {
        path: 'extensions',
        component: ExtensionsLandingPageComponent,
        data: {
          resourceLink: 'Extensions',
        },
      },
      {
        path: 'localization',
        component: LocalizationComponent,
        data: {
          resourceLink: 'Localization',
        },
      },
    ],
  },
  {
    path: 'examples',
    loadChildren: () =>
      import('./examples/examples-routing.module').then((m) => m.ExamplesRoutingModule),
  },
];
