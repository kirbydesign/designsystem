import { Component } from '@angular/core';

import { BaseListComponent } from '../base-list.component';

export const ListWithHeaderAndFooterExampleTemplate = `<kirby-list [items]="items" (itemSelect)="onItemSelect($event)">
  <!-- HEADER-->
  <kirby-list-header *kirbyListHeader>
    <kirby-list-flex-item>
      <kirby-list-cell>Name</kirby-list-cell>
      <!-- Headers doesn't have to be kirby-list-cell components. -->
      <div style="width: 150px; text-align: right">Amount</div>
      <kirby-list-cell horisontalAlignment="right">Value</kirby-list-cell>
    </kirby-list-flex-item>
  </kirby-list-header>

  <!-- BODY -->
  <kirby-list-flex-item *kirbyListFlexItem="let item">
    <kirby-list-cell>
      <kirby-list-cell-line [primary]="true" [text]="item.title"></kirby-list-cell-line>
      <kirby-list-cell-line [text]="item.detail"></kirby-list-cell-line>
    </kirby-list-cell>
    <!-- you can make custom cells using the kirbyListCell directive -->
    <div style="width: 150px; text-align: right">{{ item.subTitle }}</div>
    <kirby-list-cell verticalAlignment="top" horisontalAlignment="right">
      <kirby-list-cell-line [primary]="true" [text]="item.amount"></kirby-list-cell-line>
    </kirby-list-cell>
  </kirby-list-flex-item>

  <!-- Footer -->
  <ng-container *kirbyListFooter>
    <div class="footer">
      <h2>An appropriate footer</h2>
      <button kirby-button>Click me!</button>
    </div>
  </ng-container>
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
})
export class ListWithHeaderAndFooterExampleComponent extends BaseListComponent {}
