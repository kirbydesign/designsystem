import { Component } from '@angular/core';

import { PageModule } from '@kirbydesign/designsystem/page';
import { ListModule } from '@kirbydesign/designsystem/list';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListWithHeaderAndFooterExampleTemplate = `<kirby-list [items]="items" (itemSelect)="onItemSelect($event)">
  <!-- HEADER-->
  <kirby-list-header *kirbyListHeader>
    <p>Name</p>
    <p>Value</p>
  </kirby-list-header>

  <!-- BODY -->
  <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
    <kirby-label>
      <p class="kirby-item-title">{{item.title}}</p>
      <p class="kirby-item-subtitle">{{item.subTitle}}</p>
    </kirby-label>
    <kirby-label slot="end">
      <data [value]="item.amount">{{item.amount}}</data>
      <data [value]="item.detail" class="kirby-item-detail">{{item.detail}}</data>
    </kirby-label>
  </kirby-item>

  <!-- Footer -->
  <div class="footer" *kirbyListFooter>
    <p>An appropriate footer</p>
    <button kirby-button>Click me!</button>
  </div>
</kirby-list>`;

@Component({
  selector: 'cookbook-list-with-header-and-footer-example',
  template: `
    <kirby-page title="List with header and footer">
      <kirby-page-content>${ListWithHeaderAndFooterExampleTemplate}</kirby-page-content>
    </kirby-page>
  `,
  styles: ['p { margin: 0; }', '.footer { text-align: center; width: 100%; }'],
  imports: [PageModule, ListModule, ItemModule, ButtonComponent],
})
export class ListWithHeaderAndFooterExampleComponent extends BaseListComponent {}
