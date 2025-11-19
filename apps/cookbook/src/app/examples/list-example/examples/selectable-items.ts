import { Component } from '@angular/core';

import { ListComponent, ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { BaseListComponent } from '../../list-shared/base-list.component';

export const template = `<kirby-list 
  [items]="items" 
  (itemSelect)="onItemSelect($event)">
    <kirby-item 
      *kirbyListItemTemplate="let 
      item" [selectable]="true">
      <p class="kirby-item-title">{{item.title}}</p>
      <data slot="end" 
      class="kirby-text-bold">
      {{item.amount}}</data>
    </kirby-item>
</kirby-list>`;

@Component({
  selector: 'cookbook-list-selectable-items-example',
  template: template,
  imports: [ListComponent, ItemComponent, ListItemTemplateDirective],
})
export class ListSelectableItemsExampleComponent extends BaseListComponent {
  template: string = template;
}
