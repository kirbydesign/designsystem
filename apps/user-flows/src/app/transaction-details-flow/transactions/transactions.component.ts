import { Component, OnInit } from '@angular/core';
import { Transaction } from '~/app/transaction-flow/transaction';

import { ListSwipeAction } from '@kirbydesign/designsystem';

import transactionsData from '../../transaction-flow/transactions-data.json';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';

@Component({
  selector: 'kirbydesign-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  constructor() {}

  transactions: Transaction[] = [];
  ngOnInit(): void {
    this.transactions = transactionsData.transactions;
    console.log(this.transactions);
  }

  getSectionName(transaction: Transaction): string {
    return transaction.date.utc;
  }

  swipeActions: ListSwipeAction[] = [
    {
      position: 'left',
      title: 'Archive',
      type: 'warning',
      onSelected: (item) => console.log(item),
    },
    {
      position: 'left',
      title: 'Flag',
      icon: 'flag',
      type: 'success',
      onSelected: (item) => console.log(item),
    },
    {
      position: 'right',
      title: 'Delete',
      icon: 'trash',
      type: 'danger',
      onSelected: (item) => console.log(item),
    },
  ];
}
