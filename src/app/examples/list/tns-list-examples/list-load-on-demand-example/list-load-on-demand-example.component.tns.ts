import { Component } from '@angular/core';

import { BaseListComponent } from '../../base-list.component';
import { KirbyLoadMoreEvent } from '~/kirby/components/list/list.event';

@Component({
  templateUrl: './list-load-on-demand-example.component.tns.html',
  styleUrls: ['./list-load-on-demand-example.component.tns.scss'],
})
export class ListLoadOnDemandExampleComponent extends BaseListComponent {
  // It is necessary to bind the callback method to this instance in order to
  // access the instance properties.
  onLoadMoreItemsCallback = this.onLoadMore.bind(this);

  private itemCount: number = 0;

  onLoadMore(loadMoreEvent: KirbyLoadMoreEvent): void {
    // We end the load more event after 20 items, by sending null to the kirby list.
    if (this.itemCount <= 20) {
      // lets make a delay to simulate a HTTP call.
      setTimeout(() => {
        this.items.push(...this.generateItems());
        loadMoreEvent.complete();
      }, 2000);
    } else {
      loadMoreEvent.complete(true);
    }
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
