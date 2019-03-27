import { Routes } from '@angular/router';

import { AvatarExampleComponent } from './avatar-example/avatar-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { FloatingActionButtonExampleComponent } from './floating-action-button-example/floating-action-button-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { GridExampleComponent } from './grid-example/grid-example.component';
import { ListExampleComponent } from './list/list-example.component';
import { ChartExampleComponent } from './chart-example/chart-example.component';
import { FontsExampleComponent } from './fonts-example/fonts-example.component';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';
import { IconExampleComponent } from './icon-example/icon-example.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'grid',
  },
  {
    path: 'button',
    component: ButtonExampleComponent,
  },
  {
    path: 'floating-action-button',
    component: FloatingActionButtonExampleComponent,
  },
  {
    path: 'card',
    component: CardExampleComponent,
  },
  {
    path: 'list',
    component: ListExampleComponent,
  },
  {
    path: 'chart',
    component: ChartExampleComponent,
  },
  {
    path: 'grid',
    component: GridExampleComponent,
  },
  {
    path: 'avatar',
    component: AvatarExampleComponent,
  },
  {
    path: 'fonts',
    component: FontsExampleComponent,
  },
  {
    path: 'spinner',
    component: SpinnerExampleComponent,
  },
  {
    path: 'icon',
    component: IconExampleComponent,
  },
];
