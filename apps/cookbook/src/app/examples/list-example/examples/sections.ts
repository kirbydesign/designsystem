import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListWithSectionsExampleTemplate = `<kirby-list
  [items]="items"
  (itemSelect)="onItemSelect($event)"
  [getSectionName]="getSectionName"
>
  <kirby-list-section-header
    *kirbyListSectionHeader="let section"
    [title]="section"
  ></kirby-list-section-header>
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
  // tslint:disable-next-line
  selector: 'cookbook-list-with-sections-example',
  template: `
    <kirby-page title="List with sections">
      <kirby-page-content> ${ListWithSectionsExampleTemplate} </kirby-page-content>
    </kirby-page>
  `,
})
export class ListWithSectionsExampleComponent extends BaseListComponent {
  getSectionName(item: any): string {
    return item.detail > 0 ? 'Positive' : 'Negative';
  }
}
