import { Component } from '@angular/core';

import { BaseListComponent } from '../../base-list.component';

@Component({
  templateUrl: './list-load-more-example.component.tns.html',
  styleUrls: ['./list-load-more-example.component.tns.scss'],
})
export class ListLoadMoreExampleComponent extends BaseListComponent {
  // It is necessary to bind the callback method to this instance in order to
  // access the instance properties.
  onLoadMoreItemsCallback = this.onLoadMore.bind(this);

  private itemCount = 1;

  private async onLoadMore(): Promise<boolean> {
    this.addItems(this.generateItems());

    // lets make a delay to simulate a HTTP call.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // We will load 100 items
    return this.itemCount <= 100;
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
