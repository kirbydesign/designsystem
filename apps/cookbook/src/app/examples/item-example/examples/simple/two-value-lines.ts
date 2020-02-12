import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-simple-two-value-lines',
  template: `<kirby-item>
  <h3 class="kirby-text-bold">Inventory with a long name</h3>
  <kirby-label slot="end">
    <data value="50">50 pcs.</data>
    <p detail>2 currently in stock</p>
  </kirby-label>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleTwoValueLinesComponent {
  template: string = config.template;
}
