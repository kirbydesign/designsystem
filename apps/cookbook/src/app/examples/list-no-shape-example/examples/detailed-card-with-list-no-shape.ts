import { Component } from '@angular/core';
import { BaseListNoShape } from '../base-list-no-shape';

export const detailedCardWithListNoShapeTemplate = `<kirby-card>
  <kirby-dropdown class="margin" placeholder="Options"
    [items]="['Much cool','Such items','Wow']"
  ></kirby-dropdown>
  <kirby-list [items]="items" shape="none">
    <kirby-item *kirbyListItemTemplate="let item">
      <h3 class="kirby-text-bold">{{ item.title }}</h3>
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
})
export class DetailedCardWithListNoShapeComponent extends BaseListNoShape {
  template: string = detailedCardWithListNoShapeTemplate;
}
