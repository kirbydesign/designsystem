import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '~/app/transaction-flow/transaction';

@Component({
  selector: 'kirbydesign-transaction-details-transaction-details',
  templateUrl: './transaction-details-transaction-details.component.html',
  styleUrls: ['./transaction-details-transaction-details.component.scss'],
})
export class TransactionDetailsTransactionDetailsComponent implements OnInit {
  @Input() transaction: Transaction;

  constructor(private route: ActivatedRoute) {}

  id: number;
  private sub: any;

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
  }
}
