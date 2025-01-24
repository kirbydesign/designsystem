import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-example-simple-two-value-lines',
  template: `<kirby-item>
  <p class="kirby-text-normal-bold">Inventory with a long name</p>
  <kirby-label slot="end">
    <data value="50">50 pcs.</data>
    <p class="kirby-item-detail">2 currently in stock</p>
  </kirby-label>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ItemModule],
})
export class ItemExampleSimpleTwoValueLinesComponent {
  template: string = config.template;
}
