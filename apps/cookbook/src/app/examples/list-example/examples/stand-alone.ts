import { Component } from '@angular/core';

import { PageComponent } from '@kirbydesign/designsystem/page';
import { ListComponent, ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListWithStandAloneExampleTemplate = `<kirby-list
  [items]="items"
  (itemSelect)="onItemSelect($event)"
  [getStandAloneByProperty]="'isStandAlone'"
  [standAloneSpacing]="'xxs'">
    <kirby-item 
      *kirbyListItemTemplate="let item" 
      [selectable]="true">
        <kirby-label>
          <p class="kirby-item-title">
          {{ item.title }}</p>
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
  selector: 'cookbook-list-with-stand-alone-example',
  template: `
    <kirby-page title="List with stand alone">
      <kirby-page-content>${ListWithStandAloneExampleTemplate}</kirby-page-content>
    </kirby-page>
  `,
  imports: [PageComponent, ListComponent, ItemComponent, LabelComponent, ListItemTemplateDirective],
})
export class ListWithStandAloneExampleComponent extends BaseListComponent {}
