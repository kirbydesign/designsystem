import { Component } from '@angular/core';

import { BaseListComponent } from './base-list.component';

export const ListWithHeaderAndFooterExampleTemplate = `<kirby-list [items]="items" (itemSelect)="onItemSelect($event)" [isVirtualScrollEnabled]="true">
  <!-- HEADER-->
  <kirby-list-header *kirbyListHeader>
    <p>Name</p>
    <p>Value</p>
  </kirby-list-header>

  <!-- BODY -->
  <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
    <kirby-label>
      <h3>{{item.title}}</h3>
      <p subtitle>{{item.subTitle}}</p>
    </kirby-label>
    <kirby-label slot="end">
      <data [value]="item.amount">{{item.amount}}</data>
      <data [value]="item.detail" detail>{{item.detail}}</data>
    </kirby-label>
  </kirby-item>

  <!-- Footer -->
  <div class="footer" *kirbyListFooter>
    <p>An appropriate footer</p>
    <button kirby-button>Click me!</button>
  </div>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-with-header-and-footer-example',
  template: `
    <kirby-page title="List with header and footer">
      <kirby-page-content>
        ${ListWithHeaderAndFooterExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
  styles: ['p { margin: 0; }', '.footer { text-align: center; width: 100%; }'],
})
export class ListVirtualScrollWithHeaderAndFooterExampleComponent extends BaseListComponent {}
