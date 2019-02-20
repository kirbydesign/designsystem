import { Routes } from '@angular/router';
import { AvatarExampleComponent } from './avatar-example/avatar-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { GridExampleComponent } from './grid-example/grid-example.component';
import { ListExampleComponent } from './list-example/list-example.component';
import { ChartExampleComponent } from './chart-example/chart-example.component';
import { FontsExampleComponent } from './fonts-example/fonts-example.component';
import { ListSectionExampleComponent } from './list-example/tns-list-examples/list-section-example/list-section-example.component';
// tslint:disable-next-line:max-line-length
import { ListCustomCellLinesExampleComponent } from './list-example/tns-list-examples/list-custom-cell-lines-example/list-custom-cell-lines-example.component';
import { ListOriginalExampleComponent } from './list-example/tns-list-examples/list-original-example/list-original-example.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'grid'
  },
  {
    path: 'button',
    component: ButtonExampleComponent
  },
  {
    path: 'card',
    component: CardExampleComponent
  },
  {
    path: 'list',
    children: [
      {
        path: '',
        component: ListExampleComponent
      },
      {
        path: 'section',
        component: ListSectionExampleComponent
      },
      {
        path: 'custom',
        component: ListCustomCellLinesExampleComponent
      },
      {
        path: 'original',
        component: ListOriginalExampleComponent
      }
    ]
  },
  {
    path: 'chart',
    component: ChartExampleComponent
  },
  {
    path: 'grid',
    component: GridExampleComponent
  },
  {
    path: 'avatar',
    component: AvatarExampleComponent
  },
  {
    path: 'fonts',
    component: FontsExampleComponent
  }
];
