import { Component } from '@angular/core';

import { ItemSwipeAction } from '@kirbydesign/designsystem';

import { ListModule } from '@kirbydesign/designsystem/list';
import { NgFor } from '@angular/common';
import { ItemSlidingComponent } from '@kirbydesign/designsystem/item-sliding';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { BaseListComponent } from '../../list-shared/base-list.component';

const template = `<kirby-list-experimental>
  <kirby-item-sliding *ngFor="let item of items" [swipeActions]="swipeActions">
    <kirby-item>
      <p>{{ item.title }}</p>
      <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
    </kirby-item>
  </kirby-item-sliding>
</kirby-list-experimental>`;
@Component({
  // tslint:disable-next-line
  selector: 'cookbook-list-experimental-sliding-items-example',
  template: template,
  imports: [ListModule, NgFor, ItemSlidingComponent, ItemModule],
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
