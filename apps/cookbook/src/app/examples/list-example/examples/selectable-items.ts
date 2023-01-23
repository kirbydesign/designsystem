import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListSelectableItemsExampleTemplate = `<kirby-list [items]="items" (itemSelect)="onItemSelect($event)">
  <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
    <h3>{{item.title}}</h3>
    <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
  </kirby-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'cookbook-list-selectable-items-example',
  template: `
    <kirby-page title="Selectable items">
      <kirby-page-content> ${ListSelectableItemsExampleTemplate} </kirby-page-content>
    </kirby-page>
  `,
})
export class ListSelectableItemsExampleComponent extends BaseListComponent {}
