import { Component } from '@angular/core';

import { LoadOnDemandEvent } from '@kirbydesign/designsystem';

import { PageModule } from '@kirbydesign/designsystem/page';
import { ListModule } from '@kirbydesign/designsystem/list';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { BaseListComponent } from '../list-shared/base-list.component';

export const ListLoadOnDemandExampleTemplate = `
<kirby-list [items]="items" (loadOnDemand)="onLoadDemand($event)" noMoreItemsText="No more items">
  <kirby-item *kirbyListItemTemplate="let item">
    <kirby-label>
      <p class="kirby-item-title">{{ item.title }}</p>
      <p class="kirby-item-subtitle">{{ item.subTitle }}</p>
    </kirby-label>
    <kirby-label slot="end">
      <data [value]="item.amount">{{ item.amount }}</data>
      <data [value]="item.detail" class="kirby-item-detail">{{ item.detail }}</data>
    </kirby-label>
  </kirby-item>
</kirby-list>`;

@Component({
  selector: 'cookbook-list-load-on-demand-example',
  template: `
    <kirby-page title="Load On Demand">
      <kirby-page-content>${ListLoadOnDemandExampleTemplate}</kirby-page-content>
    </kirby-page>
  `,
  imports: [PageModule, ListModule, ItemModule],
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
