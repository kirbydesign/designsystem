import { Component } from '@angular/core';

import { BaseListComponent } from '../base-list.component';

export const ListWithSectionsAndColoredItemsExampleTemplate = `<kirby-list
  [items]="items"
  (itemSelect)="onItemSelect($event)"
  [getSectionName]="getSectionName"
  [getItemColor]="getItemColor"
  [showDivider]="true"
>
  <kirby-list-section-header
    *kirbyListSectionHeader="let section"
    [title]="section"
  ></kirby-list-section-header>
  <kirby-list-flex-item *kirbyListFlexItem="let item">
    <kirby-list-cell>
      <kirby-list-cell-line [primary]="true" [text]="item.title"></kirby-list-cell-line>
      <kirby-list-cell-line [text]="item.detail"></kirby-list-cell-line>
    </kirby-list-cell>
    <kirby-list-cell verticalAlignment="top" horisontalAlignment="right">
      <kirby-list-cell-line [primary]="true" [text]="item.amount"></kirby-list-cell-line>
    </kirby-list-cell>
  </kirby-list-flex-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-with-sections-and-colored-items-example',
  template: `
    <kirby-page title="List with sections and colored items">
      <kirby-page-content>
        ${ListWithSectionsAndColoredItemsExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
})
export class ListWithSectionsAndColoredItemsExampleComponent extends BaseListComponent {
  getItemColor = (item) => item.color;

  getSectionName(item: any): string {
    return item.detail > 0 ? 'Positive' : 'Negative';
  }
}
