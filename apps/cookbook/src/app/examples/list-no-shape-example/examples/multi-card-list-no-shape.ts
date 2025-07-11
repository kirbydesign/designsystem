import { Component } from '@angular/core';
import { ListModule } from '@kirbydesign/designsystem/list';
import { CardModule } from '@kirbydesign/designsystem/card';
import { CurrencyPipe } from '@angular/common';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { BaseListNoShape } from '../base-list-no-shape';

export const multiCardListExampleTemplate = `<kirby-list [items]="items" shape="none" hasItemSpacing="true" [showDivider]="false">
  <kirby-card *kirbyListItemTemplate="let item">
    @if (item.amount < 0) {
      <kirby-card-header title="Account is overdraft" [flagged]="'warning'"></kirby-card-header>
    }
    <kirby-item>
      <h4 class="kirby-text-bold">{{ item.title }}</h4>
      <data [value]="item.amount" class="kirby-text-bold" slot="end">
        {{ item.amount | currency }}
      </data>
    </kirby-item>
    @for (shadowAccount of item.shadowAccounts; track shadowAccount) {
      <kirby-item>
        <h4>{{ shadowAccount.title }}</h4>
        <data [value]="shadowAccount.amount" slot="end">{{ shadowAccount.amount | currency }}</data>
      </kirby-item>
    }
  </kirby-card>
</kirby-list>
`;

@Component({
  selector: 'cookbook-multi-card-list-no-shape-example',
  template: multiCardListExampleTemplate,
  imports: [ListModule, CardModule, ItemModule, CurrencyPipe],
})
export class MultiCardListNoShapeExampleComponent extends BaseListNoShape {
  template: string = multiCardListExampleTemplate;
}
