import { Component, OnInit } from '@angular/core';
import { Transaction } from '~/app/transaction-flow/transaction';

import transactionsData from '../../transaction-flow/transactions-data.json';

@Component({
  selector: 'kirbydesign-transaction-details-transactions',
  templateUrl: './transaction-details-transactions.component.html',
  styleUrls: ['./transaction-details-transactions.component.scss'],
})
export class TransactionDetailsTransactionsComponent implements OnInit {
  constructor() {}

  transactions: Transaction[] = [];
  ngOnInit(): void {
    this.transactions = transactionsData.transactions;
  }

  getSectionName(transaction: Transaction): string {
    return transaction.date.utc;
  }
}
