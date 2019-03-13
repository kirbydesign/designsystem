import { Component } from '@angular/core';

import { BaseListComponent } from './../list-example/base-list.component';

@Component({
  selector: 'kirby-list-loadmore-example',
  templateUrl: './list-loadmore-example.component.html',
  styleUrls: ['./list-loadmore-example.component.scss'],
})
export class ListLoadmoreExampleComponent extends BaseListComponent {
  // We make a callback and bind it to 'this' context, so 'this' can be used inside the callback.
  onLoadMoreCallback = this.onLoadMore.bind(this);

  private itemCount = 1;

  constructor() {
    super();
    // add items to activate scroll
    this.addItems(this.generateItems());
  }

  private async onLoadMore(): Promise<boolean> {
    // lets make a delay to simulate a HTTP call.
    await new Promise((resolve) => setTimeout(resolve, 3000));
    this.addItems(this.generateItems());
    // We will load 50 items
    return this.itemCount <= 50;
  }

  private generateItems(): any[] {
    const items = [];
    const numberOfItems = 10;
    for (let index = 1; index < numberOfItems; index++) {
      const transaction = {
        title: `Item ${this.itemCount}`,
        subTitle: `${Math.round(Math.random() * 100)} pcs`,
        amount: `${Math.round(Math.random() * 1000)} DKK`,
        detail: Math.round(Math.random() * 100),
      };
      items.push(transaction);
      this.itemCount++;
    }
    return items;
  }
}
