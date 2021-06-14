import { Component } from '@angular/core';

import { LoadOnDemandEvent } from '@kirbydesign/designsystem';

import { BaseListComponent } from '../list-shared/base-list.component';

@Component({
  selector: 'cookbook-list-virtual-scroll-load-example',
  templateUrl: './list-virtual-scroll-load-example.component.html',
  styleUrls: ['./list-virtual-scroll-load-example.component.scss'],
})
export class ListVirtualScrollLoadExampleComponent extends BaseListComponent {
  private itemCount: number = 0;

  constructor() {
    super();
    this.items.push(...this.generateItems());
  }

  onLoadDemand(loadOnDemandEvent: LoadOnDemandEvent): void {
    // We end the load more event after 100 items, by sending null to the kirby list.
    if (this.itemCount <= 200) {
      // lets make a delay to simulate a HTTP call.
      setTimeout(() => {
        this.items.push(...this.generateItems());
        loadOnDemandEvent.complete();
      }, 1500);
    } else {
      loadOnDemandEvent.complete(true);
    }
  }

  private generateItems(): any[] {
    const items = [];
    const numberOfItems = 40;
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
