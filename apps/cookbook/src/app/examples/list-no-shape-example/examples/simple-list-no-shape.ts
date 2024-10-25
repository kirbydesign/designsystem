import { Component } from '@angular/core';
import { BaseListNoShape } from '../base-list-no-shape';

export const simpleListNoShapeExampleTemplate = `<kirby-list [items]="items" shape="none">
  <kirby-item *kirbyListItemTemplate="let item">
    <h3 class="kirby-text-bold">{{ item.title }}</h3>
    <data [value]="item.amount" slot="end">
      {{ item.amount | currency }}
    </data>
  </kirby-item>
</kirby-list>`;

@Component({
  selector: 'cookbook-simple-list-no-shape-example',
  template: simpleListNoShapeExampleTemplate,
})
export class SimpleListNoShapeExampleComponent extends BaseListNoShape {
  template = simpleListNoShapeExampleTemplate;
}
