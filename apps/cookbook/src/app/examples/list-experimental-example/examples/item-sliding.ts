import { Component } from '@angular/core';

import { ItemSwipeAction } from '@kirbydesign/designsystem';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListItemsSlidingExampleTemplate = `<kirby-list-experimental>
<kirby-section-header list-header><h2 header>List with items</h2></kirby-section-header>
<kirby-item-sliding *ngFor="let item of items" [swipeActions]="swipeActions">
  <kirby-item><p> {{ item.title }} </p></kirby-item>
</kirby-item-sliding>
</kirby-list-experimental>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-experimental-sliding-items-example',
  template: `
    ${ListItemsSlidingExampleTemplate}
  `,
})
export class ListExperimentalSlidingItemsExampleComponent extends BaseListComponent {
  swipeActions: ItemSwipeAction[] = [
    {
      title: 'edit',
      type: 'success',
      onSelected: () => {},
    },
    {
      title: 'archive',
      type: 'warning',
      onSelected: () => {},
    },
    {
      title: 'delete',
      icon: 'trash',
      onSelected: () => {},
      type: 'danger',
    },
  ];
}
