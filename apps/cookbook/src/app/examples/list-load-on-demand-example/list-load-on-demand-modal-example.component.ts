import { Component, Inject } from '@angular/core';

import { COMPONENT_PROPS, LoadOnDemandEvent, ModalController } from '@kirbydesign/designsystem';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { ListComponent, ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import {
  PageComponent,
  PageContentComponent,
  PageTitleComponent,
} from '@kirbydesign/designsystem/page';

const MAX_ITEMS = 40;

function generateItems(startIndex: number, numberOfItems: number) {
  return Array.from({ length: numberOfItems }, (_, index) => ({
    title: `Item ${startIndex + index + 1}`,
    subTitle: `${Math.round(Math.random() * 100)} pcs`,
    amount: `${Math.round(Math.random() * 1000)} DKK`,
    detail: Math.round(Math.random() * 100),
  }));
}

export const ListLoadOnDemandModalExampleTemplate = `<kirby-page-title>Load on demand ({{ items.length }} items)</kirby-page-title>
<kirby-list
  [items]="items"
  (loadOnDemand)="onLoadOnDemand($event)"
  noMoreItemsText="No more items">
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
  selector: 'cookbook-list-load-on-demand-modal-content',
  template: ListLoadOnDemandModalExampleTemplate,
  imports: [
    PageTitleComponent,
    ListComponent,
    ListItemTemplateDirective,
    ItemComponent,
    LabelComponent,
  ],
})
export class ListLoadOnDemandModalContentComponent {
  items: any[];
  private pageSize: number;

  constructor(@Inject(COMPONENT_PROPS) componentProps: { pageSize: number }) {
    this.pageSize = componentProps.pageSize;
    this.items = generateItems(0, this.pageSize);
  }

  onLoadOnDemand(event: LoadOnDemandEvent): void {
    if (this.items.length >= MAX_ITEMS) {
      event.complete(true);
      return;
    }
    // Simulate a HTTP call
    setTimeout(() => {
      this.items = [...this.items, ...generateItems(this.items.length, this.pageSize)];
      event.complete();
    }, 1000);
  }
}

@Component({
  selector: 'cookbook-list-load-on-demand-modal-example',
  template: `
    <kirby-page title="Load On Demand in modal">
      <kirby-page-content>
        <p>
          Opens a modal with a load on demand list. With few items the modal content is not
          scrollable initially, so the list should keep loading until it fills the modal.
        </p>
        <button kirby-button (click)="openModal(3)">Open modal with few items</button>
        <button kirby-button (click)="openModal(10)">Open modal with many items</button>
      </kirby-page-content>
    </kirby-page>
  `,
  imports: [PageComponent, PageContentComponent, ButtonComponent],
})
export class ListLoadOnDemandModalExampleComponent {
  constructor(private modalController: ModalController) {}

  async openModal(pageSize: number) {
    await this.modalController.showModal({
      component: ListLoadOnDemandModalContentComponent,
      flavor: 'modal',
      componentProps: { pageSize },
    });
  }
}
