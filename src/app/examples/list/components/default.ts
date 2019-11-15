import { Component } from '@angular/core';

import { BaseListComponent } from './base-list.component';

export const ListDefaultExampleTemplate = `<kirby-list [items]="items">
  <kirby-list-item *kirbyListItem="let item" [title]="item.title" [amount]="item.amount">
  </kirby-list-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-default-example',
  template: `
    <kirby-page title="Default list">
      <kirby-page-content>
        ${ListDefaultExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
})
export class ListDefaultExampleComponent extends BaseListComponent {}
