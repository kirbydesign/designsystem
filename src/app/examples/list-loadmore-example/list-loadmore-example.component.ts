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

  private itemCount: number = 0;

  constructor() {
    super();
    this.items.push(...this.generateItems());
  }

  private async onLoadMore(): Promise<any[]> {
    // lets make a delay to simulate a HTTP call.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // We will load 20 items
    if (this.itemCount > 20) {
      return null;
    }
    return this.generateItems();
  }

  private generateItems(): any[] {
    const items = [];
    const numberOfItems = 10;
    for (let index = 0; index < numberOfItems; index++) {
      this.itemCount++;
      const transaction = {
        title: `Item ${this.itemCount}`,
        subTitle: `${Math.round(Math.random() * 100)} pcs`,
        amount: `${Math.round(Math.random() * 1000)} DKK`,
        detail: Math.round(Math.random() * 100),
      };
      items.push(transaction);
    }
    return items;
  }
}
