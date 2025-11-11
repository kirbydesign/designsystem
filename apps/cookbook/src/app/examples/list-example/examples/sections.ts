import { Component } from '@angular/core';

import {
  ListComponent,
  ListItemTemplateDirective,
  ListSectionHeaderComponent,
} from '@kirbydesign/designsystem/list';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { BaseListComponent } from '../../list-shared/base-list.component';

export const template = `<kirby-list
  [items]="items"
  (itemSelect)="onItemSelect($event)"
  [getSectionName]="getSectionName">
  <kirby-list-section-header
    *kirbyListSectionHeader="let section"
    [title]="section">
  </kirby-list-section-header>
  <kirby-item 
    *kirbyListItemTemplate="let item" 
    [selectable]="true">
    <kirby-label>
      <p class="kirby-item-title">{{ item.title }}</p>
      <data [value]="item.detail" 
      class="kirby-item-detail">
      {{ item.detail }}</data>
    </kirby-label>
    <kirby-label slot="end">
      <data [value]="item.amount">
      {{ item.amount }}</data>
    </kirby-label>
  </kirby-item>
</kirby-list>`;

@Component({
  selector: 'cookbook-list-with-sections-example',
  template: template,
  imports: [
    ListComponent,
    ItemComponent,
    LabelComponent,
    ListSectionHeaderComponent,
    ListItemTemplateDirective,
  ],
})
export class ListWithSectionsExampleComponent extends BaseListComponent {
  template: string = template;

  getSectionName(item: any): string {
    return item.detail > 0 ? 'Positive' : 'Negative';
  }
}
