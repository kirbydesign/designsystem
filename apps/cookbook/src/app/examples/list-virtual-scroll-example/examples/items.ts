import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListVirtualScrollItemsExampleTemplate = `
<kirby-list [items]="itemsFullList" [useVirtualScroll]="true" [virtualScrollViewportHeight]="400">
<kirby-item *kirbyListItemTemplate="let item">
<h3>{{item.title}}</h3>
<data slot="end" class="kirby-text-bold">{{item.amount}}</data>
</kirby-item>
</kirby-list>`;

@Component({
  selector: 'cookbook-list-virtual-scroll-items-example',
  template: `
    <kirby-page title="Virtual Scroll">
      <kirby-page-content>
        ${ListVirtualScrollItemsExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
  styleUrls: ['../list-virtual-scroll-example.component.scss'],
})
export class ListVirtualScrollItemsExampleComponent extends BaseListComponent {
  private itemCount: number = 0;

  constructor() {
    super();
  }
}
