import { Component } from '@angular/core';

import { ListComponent, ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { BaseListComponent } from '../../list-shared/base-list.component';

export const template = `<kirby-list [items]="items">
   <kirby-item *kirbyListItemTemplate="let item">
     <p class="kirby-item-title">{{item.title}}</p>
     <data slot="end">{{item.amount}}</data>
   </kirby-item>
</kirby-list>`;

@Component({
  selector: 'cookbook-list-items-example',
  template: template,
  imports: [ListComponent, ListItemTemplateDirective, ItemComponent],
})
export class ListItemsExampleComponent extends BaseListComponent {
  template: string = template;
}
