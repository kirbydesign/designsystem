import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListVirtualScrollItemsExampleTemplate = `
<kirby-list [items]="itemsFullList" [useVirtualScroll]="true">
  <kirby-item *kirbyListItemTemplate="let item">
    <h3>{{item.title}}</h3>
    <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
  </kirby-item>
</kirby-list>`;

@Component({
  selector: 'cookbook-list-virtual-scroll-items-example',
  template: ListVirtualScrollItemsExampleTemplate,
})
export class ListVirtualScrollItemsExampleComponent extends BaseListComponent {}
