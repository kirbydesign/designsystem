import { Routes } from '@angular/router';

import { IntroComponent } from './intro/intro.component';
import { HomeComponent } from './home/home.component';

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
        path: 'component-status',
        loadChildren: () =>
          import('./component-status/component-status.module').then((m) => m.ComponentStatusModule),
      },
      {
        path: 'changelog',
        loadChildren: () => import('./changelog/changelog.module').then((m) => m.ChangelogModule),
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
