import { Component } from '@angular/core';

import { BaseListComponent } from './base-list.component';

export const ListBoldTextOnRowSelectionExampleTemplate = `<kirby-list [items]="items" (itemSelect)="onItemSelect($event)" [isVirtualScrollEnabled]="true">
  <kirby-item *kirbyListItemTemplate="let item">
    <h3>{{item.title}}</h3>
    <data [value]="item.amount" slot="end">{{item.amount}}</data>
  </kirby-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-bold-text-on-row-selection-example',
  template: `
    <kirby-page title="Bold text on row selection">
      <kirby-page-content>
        ${ListBoldTextOnRowSelectionExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
})
export class ListVirtualScrollBoldTextOnRowSelectionExampleComponent extends BaseListComponent {
  onItemSelect(item: any) {
    console.log(`You have clicked the row [${item.title} ${item.amount}]`);
  }
}
