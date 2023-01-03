import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListWithStandAloneExampleTemplate = `<kirby-list
  [items]="items"
  (itemSelect)="onItemSelect($event)"
  [getStandAloneByProperty]="'isStandAlone'"
  [standAloneSpacing]="'xxs'"
>
  <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
    <kirby-label>
      <h3>{{ item.title }}</h3>
      <data [value]="item.detail" detail>{{ item.detail }}</data>
    </kirby-label>
    <kirby-label slot="end">
      <data [value]="item.amount">{{ item.amount }}</data>
    </kirby-label>
  </kirby-item>
</kirby-list>`;

@Component({
  selector: 'cookbook-list-with-stand-alone-example',
  template: `
    <kirby-page title="List with stand alone">
      <kirby-page-content> ${ListWithStandAloneExampleTemplate} </kirby-page-content>
    </kirby-page>
  `,
})
export class ListWithStandAloneExampleComponent extends BaseListComponent {}
