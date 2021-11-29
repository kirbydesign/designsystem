import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListSelectableItemsExampleTemplate = `<kirby-list [items]="items" (itemSelect)="onItemSelect($event)" showDivider="true">
  <kirby-item *kirbyListItemTemplate="let item">
    <h3>{{item.title}}</h3>
    <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
  </kirby-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-selectable-items-example',
  template: `
    <kirby-page title="Selectable items using dividers">
      <kirby-page-content>
        ${ListSelectableItemsExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
})
export class ListSelectableItemsExampleComponent extends BaseListComponent {}
