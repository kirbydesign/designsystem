import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LongListFlowComponent } from './long-list-flow/long-list-flow.component';
import { AccountComponent } from './transaction-details-flow/account/account.component';
import { ForYouComponent } from './transaction-details-flow/for-you/for-you.component';
import { TransactionDetailsFlowComponent } from './transaction-details-flow/transaction-details-flow.component';
import { TransactionDetailsComponent } from './transaction-details-flow/transaction-details/transaction-details.component';
import { TransactionsComponent } from './transaction-details-flow/transactions/transactions.component';
import { HomePageComponent } from './transfer-and-pay-flow/home-page/home-page.component';
import { TransferAndPayFlowComponent } from './transfer-and-pay-flow/transfer-and-pay-flow.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'long-list-flow',
    component: LongListFlowComponent,
  },
  {
    path: 'transaction-details-flow',
    component: TransactionDetailsFlowComponent,
    children: [
      {
        path: '',
        redirectTo: 'for-you',
        pathMatch: 'full',
      },
      {
        path: 'for-you',
        component: ForYouComponent,
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            component: AccountComponent,
          },
          { path: 'transactions', component: TransactionsComponent },
          {
            path: 'transactions-details/:id',
            component: TransactionDetailsComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'transfer-and-pay-flow',
    component: TransferAndPayFlowComponent,
    children: [
      {
        path: '',
        redirectTo: 'home-page',
        pathMatch: 'full',
      },
      {
        path: 'home-page',
        component: HomePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
