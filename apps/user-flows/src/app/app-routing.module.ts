import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { TranactionDetailsAccountComponent } from './transaction-details-flow/tranaction-details-account/tranaction-details-account.component';
import { TransactionDetailsFlowComponent } from './transaction-details-flow/transaction-details-flow.component';
import { TransactionDetailsForyouComponent } from './transaction-details-flow/transaction-details-foryou/transaction-details-foryou.component';
import { TransactionDetailsComponent } from './transaction-details-flow/transaction-details/transaction-details.component';
import { TransactionsComponent } from './transaction-details-flow/transactions/transactions.component';

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
      {
        path: 'account',
        component: TranactionDetailsAccountComponent,
      },
      { path: 'transactions', component: TransactionsComponent },
      {
        path: 'transactions-details/:id',
        component: TransactionDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
