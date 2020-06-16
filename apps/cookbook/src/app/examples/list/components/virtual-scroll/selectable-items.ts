import { Component } from '@angular/core';

import { BaseListComponent } from './base-list.component';

export const ListSelectableItemsExampleTemplate = `<kirby-list [items]="items" (itemSelect)="onItemSelect($event)" showDivider="true" [isVirtualScrollEnabled]="true">
  <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
    <h3>{{item.title}}</h3>
    <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
  </kirby-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-selectable-items-example',
  template: `
    <kirby-page title="List with selectable items">
      <kirby-page-content>
        ${ListSelectableItemsExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
})
export class ListVirtualScrollSelectableItemsExampleComponent extends BaseListComponent {}
