import { Component } from '@angular/core';
import { BaseListNoShape } from '../base-list-no-shape';

export const multiCardListExampleTemplate = `<kirby-list [items]="items" shape="none" hasItemSpacing="true">
  <kirby-card *kirbyListItemTemplate="let item">
    <kirby-card-header *ngIf="item.amount < 0" title="Account is overdraft" [flagged]="'warning'"></kirby-card-header>
    <kirby-item>
      <h4 class="kirby-text-bold">{{ item.title }}</h4>
      <data [value]="item.amount" class="kirby-text-bold" slot="end">
        {{ item.amount | currency }}
      </data>
    </kirby-item>
    <kirby-item *ngFor="let shadowAccount of item.shadowAccounts">
      <h4>{{ shadowAccount.title }}</h4>
      <data [value]="shadowAccount.amount" slot="end">{{ shadowAccount.amount | currency }}</data>
    </kirby-item>
  </kirby-card>
</kirby-list>
`;

@Component({
  selector: 'cookbook-multi-card-list-no-shape-example',
  template: multiCardListExampleTemplate,
})
export class MultiCardListNoShapeExampleComponent extends BaseListNoShape {
  template: string = multiCardListExampleTemplate;
}
