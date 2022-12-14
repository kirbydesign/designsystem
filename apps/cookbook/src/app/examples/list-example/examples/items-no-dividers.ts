import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListItemsNoDividersExampleTemplate = `<kirby-list [items]="items" [showDivider]="false">
  <kirby-item *kirbyListItemTemplate="let item">
    <h3>{{item.title}}</h3>
    <data slot="end">{{item.amount}}</data>
  </kirby-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'cookbook-list-items-no-dividers-example',
  template: `
    <kirby-page title="Items with no dividers">
      <kirby-page-content> ${ListItemsNoDividersExampleTemplate} </kirby-page-content>
    </kirby-page>
  `,
})
export class ListItemsNoDividersExampleComponent extends BaseListComponent {}
