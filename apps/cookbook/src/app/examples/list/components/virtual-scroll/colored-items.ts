import { Component } from '@angular/core';

import { BaseListComponent } from './base-list.component';

export const ListColoredItemsExampleTemplate = `<kirby-list
  [items]="items"
  [getItemColor]="getItemColor"
  (itemSelect)="onItemSelect($event)"
  showDivider="true"
  [isVirtualScrollEnabled]="true"
>
  <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
    <kirby-label>
      <h3>{{item.title}}</h3>
      <p subtitle>{{item.subTitle}}</p>
    </kirby-label>
    <kirby-label slot="end">
      <data [value]="item.amount">{{item.amount}}</data>
      <data [value]="item.detail" detail>{{item.detail}}</data>
    </kirby-label>
  </kirby-item>
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
export class ListVirtualScrollColoredItemsExampleComponent extends BaseListComponent {
  getItemColor = (item) => item.color;
}
