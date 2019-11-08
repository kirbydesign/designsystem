import { Component } from '@angular/core';

import { BaseListComponent } from '../base-list.component';

export const ListColoredItemsExampleTemplate = `<kirby-list
  [items]="items"
  [getItemColor]="getItemColor"
  (itemSelect)="onItemSelect($event)"
  showDivider="true"
>
  <kirby-list-item
    *kirbyListItem="let item"
    [item]="item"
    [title]="item.title"
    [amount]="item.amount"
  ></kirby-list-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-colored-items-example',
  template: `
    <kirby-page title="List colored items">
      <kirby-page-content>
        ${ListColoredItemsExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
})
export class ListColoredItemsExampleComponent extends BaseListComponent {}
