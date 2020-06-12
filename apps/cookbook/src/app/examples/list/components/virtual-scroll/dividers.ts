import { Component } from '@angular/core';

import { BaseListComponent } from './base-list.component';

export const ListWithDividersExampleTemplate = `<kirby-list [items]="items" showDivider="true" [isVirtualScrollEnabled]="true">
  <kirby-item *kirbyListItemTemplate="let item">
    <h3>{{item.title}}</h3>
    <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
  </kirby-item>
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
export class ListVirtualScrollWithDividersExampleComponent extends BaseListComponent {}
