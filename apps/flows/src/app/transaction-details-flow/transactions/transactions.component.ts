import { Component, OnInit } from '@angular/core';

import { ListSwipeAction } from '@kirbydesign/designsystem';

import { Transaction } from '../../transaction';
import transactionsData from '../../transactions-data.json';

@Component({
  selector: 'kirbydesign-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  standalone: false,
})
export class TransactionsComponent implements OnInit {
  constructor() {}

  transactions: Transaction[] = [];
  ngOnInit(): void {
    this.transactions = transactionsData.transactions;
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
