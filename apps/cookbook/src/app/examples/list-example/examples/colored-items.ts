import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListColoredItemsExampleTemplate = `<kirby-list
  [items]="items"
  [getItemColor]="getItemColor"
  (itemSelect)="onItemSelect($event)"
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
  selector: 'cookbook-list-colored-items-example',
  template: `
    <kirby-page title="List colored items">
      <kirby-page-content>${ListColoredItemsExampleTemplate}</kirby-page-content>
    </kirby-page>
  `,
})
export class ListColoredItemsExampleComponent extends BaseListComponent {
  getItemColor = (item) => item.color;
}
