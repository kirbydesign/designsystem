import { Component } from '@angular/core';
import { ListComponent, ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { CurrencyPipe } from '@angular/common';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { BaseListNoShape } from '../base-list-no-shape';

export const multiCardListExampleTemplate = `<kirby-list [items]="items" shape="none" hasItemSpacing="true" [showDivider]="false">
  <kirby-card *kirbyListItemTemplate="let item">
    @if (item.amount < 0) {
      <kirby-card-header title="Account is overdraft" [flagged]="'warning'">
      </kirby-card-header>
    }
    <kirby-item>
      <h4 class="kirby-text-bold">{{ item.title }}</h4>
      <data [value]="item.amount" class="kirby-text-bold" slot="end">
        {{ item.amount | currency }}
      </data>
    </kirby-item>
    @for (shadowAccount of item.shadowAccounts; track shadowAccount.title) {
      <kirby-item>
        <h4>{{ shadowAccount.title }}</h4>
        <data [value]="shadowAccount.amount" slot="end">
        {{ shadowAccount.amount | currency }}</data>
      </kirby-item>
    }
  </kirby-card>
</kirby-list>
`;

@Component({
  selector: 'cookbook-multi-card-list-no-shape-example',
  template: multiCardListExampleTemplate,
  imports: [ListComponent, ListItemTemplateDirective, CardComponent, ItemComponent, CurrencyPipe],
})
export class MultiCardListNoShapeExampleComponent extends BaseListNoShape {
  template: string = multiCardListExampleTemplate;
}
