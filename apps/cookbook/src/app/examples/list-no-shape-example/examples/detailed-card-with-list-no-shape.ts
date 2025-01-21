import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';
import { ListModule } from '@kirbydesign/designsystem/list';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { CurrencyPipe } from '@angular/common';
import { BaseListNoShape } from '../base-list-no-shape';

export const detailedCardWithListNoShapeTemplate = `<kirby-card>
  <kirby-dropdown class="margin" placeholder="Options"
    [items]="['Much cool','Such items','Wow']"
  ></kirby-dropdown>
  <kirby-list [items]="items" shape="none">
    <kirby-item *kirbyListItemTemplate="let item">
      <p class="kirby-text-normal-bold">{{ item.title }}</p>
      <data [value]="item.amount" slot="end">
        {{ item.amount | currency }}
      </data>
    </kirby-item>
  </kirby-list>
</kirby-card>`;

@Component({
  selector: 'cookbook-detailed-card-with-list-no-shape-example',
  template: detailedCardWithListNoShapeTemplate,
  styles: ['.margin { margin-top: 16px; margin-inline: 16px; }', 'kirby-card {min-height: 224px;}'],
  imports: [CardModule, DropdownModule, ListModule, ItemModule, CurrencyPipe],
})
export class DetailedCardWithListNoShapeComponent extends BaseListNoShape {
  template: string = detailedCardWithListNoShapeTemplate;
}
