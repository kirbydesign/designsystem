import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '~/app/transaction-flow/transaction';

import transactionsData from '../../transaction-flow/transactions-data.json';

@Component({
  selector: 'kirbydesign-transaction-details-transaction-details',
  templateUrl: './transaction-details-transaction-details.component.html',
  styleUrls: ['./transaction-details-transaction-details.component.scss'],
})
export class TransactionDetailsTransactionDetailsComponent implements OnInit {
  transactions: Transaction;

  constructor(private route: ActivatedRoute) {}

  id: number;
  private sub: any;

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];

      this.transactions = transactionsData.transactions.find((x) => x.id === this.id.toString());

      console.log(this.transactions);
    });
  }
}
