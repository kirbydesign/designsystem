import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Transaction } from '../../transaction';
import transactionsData from '../../transactions-data.json';

@Component({
  selector: 'kirbydesign-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
  standalone: false,
})
export class TransactionDetailsComponent implements OnInit, OnDestroy {
  transactions: Transaction;

  constructor(private route: ActivatedRoute) {}

  id: number;
  private sub: any;

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];

      this.transactions = transactionsData.transactions.find((x) => x.id === this.id.toString());
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
