import { Component } from '@angular/core';

import { BaseListComponent } from '../base-list.component';

export const ListBoldTextOnRowSelectionExampleTemplate = `<kirby-list [items]="items" [markSelectedRow]="true">
  <kirby-list-item
    *kirbyListItem="let item"
    [title]="item.title"
    [amount]="item.amount"
  ></kirby-list-item>
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
export class ListBoldTextOnRowSelectionExampleComponent extends BaseListComponent {}
