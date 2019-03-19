import { Component } from '@angular/core';
import { of } from 'rxjs';

import { BaseListComponent } from '../base-list.component';
import { LoadOnDemandEvent } from './../../../../kirby/components/list/list.event';

@Component({
  selector: 'kirby-list-load-on-demand-example',
  templateUrl: './list-load-on-demand-example.component.html',
  styleUrls: ['./list-load-on-demand-example.component.scss'],
})
export class ListLoadOnDemandExampleComponent extends BaseListComponent {
  private itemCount: number = 0;

  constructor() {
    super();
    this.items.push(...this.generateItems());
  }

  onLoadDemand(loadOnDemandEvent: LoadOnDemandEvent): void {
    // We end the load more event after 20 items, by sending null to the kirby list.
    if (this.itemCount <= 20) {
      // lets make a delay to simulate a HTTP call.
      setTimeout(() => {
        this.items.push(...this.generateItems());
        loadOnDemandEvent.complete();
      }, 2000);
    } else {
      loadOnDemandEvent.complete(true);
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
