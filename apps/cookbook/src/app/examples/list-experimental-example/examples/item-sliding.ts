import { Component } from '@angular/core';

import { ItemSwipeAction } from '@kirbydesign/designsystem';

import { ListExperimentalComponent } from '@kirbydesign/designsystem/list';

import { ItemSlidingComponent } from '@kirbydesign/designsystem/item-sliding';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { BaseListComponent } from '../../list-shared/base-list.component';

const template = `<kirby-list-experimental>
  @for (item of items; track item.id) {
    <kirby-item-sliding [swipeActions]="swipeActions">
      <kirby-item>
        <p>{{ item.title }}</p>
        <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
      </kirby-item>
    </kirby-item-sliding>
  }
</kirby-list-experimental>`;

@Component({
  // tslint:disable-next-line
  selector: 'cookbook-list-experimental-sliding-items-example',
  template: template,
  imports: [ItemSlidingComponent, ItemComponent, ListExperimentalComponent],
})
export class ListExperimentalSlidingItemsExampleComponent extends BaseListComponent {
  template: string = template;

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
