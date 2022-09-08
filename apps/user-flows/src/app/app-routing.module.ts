import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { TransactionDetailsFlowComponent } from './transaction-details-flow/transaction-details-flow.component';
import { TransactionDetailsForyouComponent } from './transaction-details-flow/transaction-details-foryou/transaction-details-foryou.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'transaction-details-flow',
    component: TransactionDetailsFlowComponent,
    children: [
      {
        path: '',
        redirectTo: 'foryou',
        pathMatch: 'full',
      },
      {
        path: 'foryou',
        component: TransactionDetailsForyouComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
