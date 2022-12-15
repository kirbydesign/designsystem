import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListWithSectionsAndStandAloneExampleTemplate = `<kirby-list
  [items]="items"
  (itemSelect)="onItemSelect($event)"
  [getStandAloneByProperty]="'isStandAlone'"
  [getSectionName]="getSectionName"
  [standAloneSpacing]="'xxs'"
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
  selector: 'cookbook-list-with-stand-alone-example',
  template: `
    <kirby-page title="List with sections and stand alone items">
      <kirby-page-content> ${ListWithSectionsAndStandAloneExampleTemplate} </kirby-page-content>
    </kirby-page>
  `,
})
export class ListWithSectionsAndStandAloneExampleComponent extends BaseListComponent {
  getSectionName(item: any): string {
    return item.detail > 0 ? 'Positive' : 'Negative';
  }
}
