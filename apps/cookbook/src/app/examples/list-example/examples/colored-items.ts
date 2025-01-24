import { Component } from '@angular/core';

import { PageModule } from '@kirbydesign/designsystem/page';
import { ListModule } from '@kirbydesign/designsystem/list';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListColoredItemsExampleTemplate = `<kirby-list
  [items]="items"
  [getItemColor]="getItemColor"
  (itemSelect)="onItemSelect($event)"
>
  <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
    <kirby-label>
      <p class="kirby-item-title">{{item.title}}</p>
      <p class="kirby-item-subtitle">{{item.subTitle}}</p>
    </kirby-label>
    <kirby-label slot="end">
      <data [value]="item.amount">{{item.amount}}</data>
      <data [value]="item.detail" class="kirby-item-detail">{{item.detail}}</data>
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
  imports: [PageModule, ListModule, ItemModule],
})
export class ListColoredItemsExampleComponent extends BaseListComponent {
  getItemColor = (item) => item.color;
}
