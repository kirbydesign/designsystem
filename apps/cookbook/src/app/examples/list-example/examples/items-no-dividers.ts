import { Component } from '@angular/core';

import { ListComponent, ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { BaseListComponent } from '../../list-shared/base-list.component';

export const template = `<kirby-list [items]="items" [showDivider]="false">
  <kirby-item *kirbyListItemTemplate="let item">
    <p class="kirby-item-title">{{item.title}}</p>
    <data slot="end">{{item.amount}}</data>
  </kirby-item>
</kirby-list>`;

@Component({
  selector: 'cookbook-list-items-no-dividers-example',
  template: template,
  imports: [ListComponent, ListItemTemplateDirective, ItemComponent],
})
export class ListItemsNoDividersExampleComponent extends BaseListComponent {
  template: string = template;
}
