import { RouterModule, Routes } from '@angular/router';
import { IonLifecycleComponent } from './ion-lifecycle.component';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';

const routes: Routes = [
  {
    path: '',
    component: IonLifecycleComponent,
    children: [
      // {
      //   path: '',
      //   pathMatch: 'full',
      // },
      {
        path: 'one',
        component: OneComponent,
      },
      {
        path: 'two',
        component: TwoComponent,
      },
    ],
  },
];

export const IonLifecycleRoutes = RouterModule.forChild(routes);
