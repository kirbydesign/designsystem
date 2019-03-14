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

  private itemCount: number = 0;

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
