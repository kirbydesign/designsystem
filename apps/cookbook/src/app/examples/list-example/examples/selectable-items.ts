import { Component } from '@angular/core';

import { PageModule } from '@kirbydesign/designsystem/page';
import { ListModule } from '@kirbydesign/designsystem/list';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListSelectableItemsExampleTemplate = `<kirby-list [items]="items" (itemSelect)="onItemSelect($event)">
  <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
    <p class="kirby-item-title">{{item.title}}</p>
    <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
  </kirby-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'cookbook-list-selectable-items-example',
  template: `
    <kirby-page title="Selectable items">
      <kirby-page-content>${ListSelectableItemsExampleTemplate}</kirby-page-content>
    </kirby-page>
  `,
  imports: [PageModule, ListModule, ItemModule],
})
export class ListSelectableItemsExampleComponent extends BaseListComponent {}
