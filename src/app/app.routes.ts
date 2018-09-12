import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CardDesignerComponent } from '~/app/design/card-designer/card-designer.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
  {
      path: 'designer',
      component: CardDesignerComponent,
  },
];
