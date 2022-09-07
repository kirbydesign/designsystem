import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { TransactionItemModule } from '../transaction-item/transaction-item.module';

import { TransactionListComponent } from './transaction-list.component';

@NgModule({
  imports: [CommonModule, KirbyModule, TransactionItemModule],
  declarations: [TransactionListComponent],
  exports: [TransactionListComponent],
})
export class TransactionListModule {}
