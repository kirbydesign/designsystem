import { Component } from '@angular/core';
import { ListModule } from '@kirbydesign/designsystem/list';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { CurrencyPipe } from '@angular/common';
import { BaseListNoShape } from '../base-list-no-shape';

export const simpleListNoShapeExampleTemplate = `<kirby-list [items]="items" shape="none">
  <kirby-item *kirbyListItemTemplate="let item">
    <p class="kirby-text-normal-bold">{{ item.title }}</p>
    <data [value]="item.amount" slot="end">
      {{ item.amount | currency }}
    </data>
  </kirby-item>
</kirby-list>`;

@Component({
  selector: 'cookbook-simple-list-no-shape-example',
  template: simpleListNoShapeExampleTemplate,
  imports: [ListModule, ItemModule, CurrencyPipe],
})
export class SimpleListNoShapeExampleComponent extends BaseListNoShape {
  template = simpleListNoShapeExampleTemplate;
}
