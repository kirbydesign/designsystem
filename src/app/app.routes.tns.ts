import { Routes } from '@angular/router';

import { IntroComponent } from './intro/intro.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: IntroComponent,
      },
    ],
  },
  {
    path: 'examples',
    loadChildren: './examples/examples-routing.module#ExamplesRoutingModule',
  },
];
