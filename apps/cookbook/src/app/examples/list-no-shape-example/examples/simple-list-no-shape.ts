import { Component } from '@angular/core';
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
  standalone: false,
})
export class SimpleListNoShapeExampleComponent extends BaseListNoShape {
  template = simpleListNoShapeExampleTemplate;
}
