import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListItemsExampleTemplate = `<kirby-list [items]="items">
  <kirby-item *kirbyListItemTemplate="let item">
    <h3>{{item.title}}</h3>
    <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
  </kirby-item>
</kirby-list>`;

@Component({
  selector: 'cookbook-list-with-dividers-example',
  template: `
    <kirby-page title="Items using dividers">
      <kirby-page-content> ${ListItemsExampleTemplate} </kirby-page-content>
    </kirby-page>
  `,
})
export class ListItemsExampleComponent extends BaseListComponent {}
