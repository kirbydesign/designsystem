import { Component } from '@angular/core';

import { BaseListComponent } from '../list-example/base-list.component';
import { KirbyLoadMoreEvent } from './../../../kirby/components/list/list.event';

@Component({
  selector: 'kirby-list-load-more-example',
  templateUrl: './list-load-more-example.component.html',
  styleUrls: ['./list-load-more-example.component.scss'],
})
export class ListLoadMoreExampleComponent extends BaseListComponent {
  private itemCount: number = 0;

  constructor() {
    super();
    this.items.push(...this.generateItems());
  }

  onLoadMore(onLoadMoreEvent: KirbyLoadMoreEvent): void {
    // We end the load more event after 20 items, by sending null to the kirby list.
    if (this.itemCount <= 20) {
      // lets make a delay to simulate a HTTP call.
      new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
        this.items.push(...this.generateItems());
        onLoadMoreEvent.complete(true);
      });
    } else {
      onLoadMoreEvent.complete(false);
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
