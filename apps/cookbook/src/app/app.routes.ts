import { Routes } from '@angular/router';

import { AccessibilityGuidelinesComponent } from './accessibility/accessibility-guidelines.component';
import { ComponentOverviewComponent } from './component-overview/component-overview.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { ExtensionsLandingPageComponent } from './extensions/extensions-landing-page.component';

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
      },
      {
        path: 'showcase',
        loadChildren: () => import('./showcase/showcase.module').then((m) => m.ShowcaseModule),
      },
      {
        path: 'guides',
        loadChildren: () => import('./guides/guides.module').then((m) => m.GuideModule),
      },
      {
        path: 'accessibility-in-kirby',
        component: AccessibilityGuidelinesComponent,
      },
      {
        path: 'component-overview',
        component: ComponentOverviewComponent,
      },
      {
        path: 'extensions',
        component: ExtensionsLandingPageComponent,
      },
    ],
  },
  {
    path: 'examples',
    loadChildren: () =>
      import('./examples/examples-routing.module').then((m) => m.ExamplesRoutingModule),
  },
  {
    path: 'designer',
    loadChildren: () => import('./designer/designer.module').then((m) => m.DesignerModule),
  },
];
