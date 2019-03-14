import { Component } from '@angular/core';

import { BaseListComponent } from '../../base-list.component';
import { KirbyListLoadMoreEvent } from '~/kirby/components/list/list.event';

@Component({
  templateUrl: './list-load-more-example.component.tns.html',
  styleUrls: ['./list-load-more-example.component.tns.scss'],
})
export class ListLoadMoreExampleComponent extends BaseListComponent {
  // It is necessary to bind the callback method to this instance in order to
  // access the instance properties.
  onLoadMoreItemsCallback = this.onLoadMore.bind(this);

  private itemCount: number = 0;

  onLoadMore(onLoadMoreEvent: KirbyListLoadMoreEvent): void {
    // lets make a delay to simulate a HTTP call.
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      // We end the load more event after 20 items, by sending null to the kirby list.
      const newItems = this.itemCount > 20 ? null : this.generateItems();
      onLoadMoreEvent.complete(newItems);
    });
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
