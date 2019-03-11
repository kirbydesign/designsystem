import { Component } from '@angular/core';

import { BaseListComponent } from './../list-example/base-list.component';

@Component({
  selector: 'kirby-list-loadmore-example',
  templateUrl: './list-loadmore-example.component.html',
  styleUrls: ['./list-loadmore-example.component.scss'],
})
export class ListLoadmoreExampleComponent extends BaseListComponent {
  // We make a callback and bind it to 'this' context, so 'this' can be used in the callback.
  onLoadMoreCallback = this.onLoadMore.bind(this);

  private transactionIdCount = 1;

  constructor() {
    super();
    this.addItems(this.generateTransactions());
  }

  private async onLoadMore(): Promise<boolean> {
    this.addItems(this.generateTransactions());
    // lets make a delay to simulate a HTTP call.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // We will load 100 items
    return this.transactionIdCount <= 100;
  }

  private generateTransactions(): any[] {
    const transactions = [];
    const numberOfTransactions = 10;
    for (let index = 1; index < numberOfTransactions; index++) {
      const transaction = {
        title: 'Transaction ' + this.transactionIdCount,
        subTitle: this.transactionIdCount + ' stk',
        amount: this.transactionIdCount + ' DKK',
      };
      transactions.push(transaction);
      this.transactionIdCount++;
    }
    return transactions;
  }
}
