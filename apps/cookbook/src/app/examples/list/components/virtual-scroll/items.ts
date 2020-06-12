import { Component } from '@angular/core';

import { BaseListComponent } from './base-list.component';

export const ListItemsExampleTemplate = `<kirby-list [items]="items" [isVirtualScrollEnabled]="true">
  <kirby-item *kirbyListItemTemplate="let item">
    <h3>{{item.title}}</h3>
    <data slot="end">{{item.amount}}</data>
  </kirby-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-items-example',
  template: `
    <kirby-page title="Items">
      <kirby-page-content>
        ${ListItemsExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
})
export class ListVirtualScrollItemsExampleComponent extends BaseListComponent {}
