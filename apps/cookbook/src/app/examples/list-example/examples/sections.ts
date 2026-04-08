import { Component } from '@angular/core';

import {
  ListComponent,
  ListItemTemplateDirective,
  ListSectionHeaderComponent,
  ListSectionHeaderDirective,
} from '@kirbydesign/designsystem/list';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { SectionHeaderComponent } from '@kirbydesign/designsystem/section-header';
import { BaseListComponent } from '../../list-shared/base-list.component';

export const template = `<kirby-list
  [items]="items"
  (itemSelect)="onItemSelect($event)"
  [getSectionName]="getSectionName">
  <kirby-section-header
    *kirbyListSectionHeader="let section"
    >
    <kirby-label>
      <h3 heading>Section Header</h3>
      <p label>Label</p>
    </kirby-label>
    <p detail slot="end">Detail in end-slot</p>
  </kirby-section-header>
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
    ListSectionHeaderDirective,
    SectionHeaderComponent,
    LabelComponent,
    ListItemTemplateDirective,
  ],
})
export class ListWithSectionsExampleComponent extends BaseListComponent {
  template: string = template;

  getSectionName(item: any): string {
    return item.detail > 0 ? 'Positive' : 'Negative';
  }
}
