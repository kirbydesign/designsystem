import { Routes } from '@angular/router';

import { CardDesignerComponent } from './card-designer/card-designer.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'card',
    pathMatch: 'full',
  },
  {
    path: 'card',
    component: CardDesignerComponent,
  },
];
