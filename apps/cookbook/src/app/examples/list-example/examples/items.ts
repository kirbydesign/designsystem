import { Component } from '@angular/core';

import { PageComponent, PageContentComponent } from '@kirbydesign/designsystem/page';
import { ListComponent, ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListItemsExampleTemplate = `<kirby-list [items]="items">
   <kirby-item *kirbyListItemTemplate="let item">
     <p class="kirby-item-title">{{item.title}}</p>
     <data slot="end">{{item.amount}}</data>
   </kirby-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'cookbook-list-items-example',
  template: `
    <kirby-page title="Items">
      <kirby-page-content>${ListItemsExampleTemplate}</kirby-page-content>
    </kirby-page>
  `,
  imports: [
    PageComponent,
    ListComponent,
    ListItemTemplateDirective,
    ItemComponent,
    PageContentComponent,
  ],
})
export class ListItemsExampleComponent extends BaseListComponent {}
