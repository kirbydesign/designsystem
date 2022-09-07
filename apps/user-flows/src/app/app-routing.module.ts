import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { TransactionFlowComponent } from './transaction-flow/transaction-flow.component';

const routes: Routes = [
  {
    path: 'transaction-flow',
    component: TransactionFlowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
