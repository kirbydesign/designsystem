import { Component } from '@angular/core';

import { BaseListComponent } from './base-list.component';

export const ListWithDividersExampleTemplate = `<kirby-list [items]="items" showDivider="true">
  <kirby-list-item
    *kirbyListItem="let item"
    [title]="item.title"
    [amount]="item.amount"
  ></kirby-list-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-with-dividers-example',
  template: `
    <kirby-page title="List with dividers">
      <kirby-page-content>
        ${ListWithDividersExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
})
export class ListWithDividersExampleComponent extends BaseListComponent {}
