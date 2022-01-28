import { Component } from '@angular/core';

import { ItemSwipeAction } from '@kirbydesign/designsystem';

import { BaseListComponent } from '../../list-shared/base-list.component';

const template = `<kirby-list-experimental>
<kirby-section-header list-header><h2 header>List with items</h2></kirby-section-header>
<kirby-item-sliding *ngFor="let item of items" [swipeActions]="swipeActions">
  <kirby-item><p> 
{{ item.title }} </p></kirby-item>
</kirby-item-sliding>
</kirby-list-experimental>`;
@Component({
  // tslint:disable-next-line
  selector: 'cookbook-list-experimental-sliding-items-example',
  template: template,
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
