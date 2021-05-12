import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListVirtualScrollSectionsExampleTemplate = `<kirby-list
  [items]="itemsFullList"
  [useVirtualScroll]="true" [virtualScrollViewportHeight]="400"
  (itemSelect)="onItemSelect($event)"
  [getSectionName]="getSectionName"
  [showDivider]="true"
>
  <kirby-list-section-header
    *kirbyListSectionHeader="let section"
    [title]="section"
  ></kirby-list-section-header>
  <kirby-item *kirbyListItemTemplate="let item">
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
  selector: 'cookbook-list-virtual-scroll-sections-example',
  template: `
    <kirby-page title="List with sections">
      <kirby-page-content>
        ${ListVirtualScrollSectionsExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
})
export class ListVirtualScrollSectionsExampleComponent extends BaseListComponent {
  getSectionName(item: any): string {
    return item.detail > 0 ? 'Positive' : 'Negative';
  }
}
