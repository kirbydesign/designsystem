import { Component } from '@angular/core';

import { BaseListComponent } from '../base-list.component';

export const ListWithSectionsExampleTemplate = `<kirby-list
  [items]="items"
  (itemSelect)="onItemSelect($event)"
  [getSectionName]="getSectionName"
  [showDivider]="true"
>
  <kirby-list-section-header
    *kirbyListSectionHeader="let section"
    [title]="section"
  ></kirby-list-section-header>
  <kirby-list-flex-item *kirbyListFlexItem="let item">
    <kirby-list-cell>
      <kirby-list-cell-line [primary]="true" [text]="item.title"></kirby-list-cell-line>
      <kirby-list-cell-line [text]="item.detail"></kirby-list-cell-line>
    </kirby-list-cell>
    <kirby-list-cell verticalAlignment="top" horisontalAlignment="right">
      <kirby-list-cell-line [primary]="true" [text]="item.amount"></kirby-list-cell-line>
    </kirby-list-cell>
  </kirby-list-flex-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-with-sections-example',
  template: `
    <kirby-page title="List with sections">
      <kirby-page-content>
        ${ListWithSectionsExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
})
export class ListWithSectionsExampleComponent extends BaseListComponent {}
