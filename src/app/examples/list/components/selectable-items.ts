import { Component } from '@angular/core';

import { BaseListComponent } from './base-list.component';

export const ListSelectableItemsExampleTemplate = `<kirby-list [items]="items" (itemSelect)="onItemSelect($event)" showDivider="true">
  <kirby-list-item
    *kirbyListItem="let item"
    [title]="item.title"
    [amount]="item.amount"
  ></kirby-list-item>
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
export class ListSelectableItemsExampleComponent extends BaseListComponent {}
