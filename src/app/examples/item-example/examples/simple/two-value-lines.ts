import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-simple-two-value-lines',
  template: `<kirby-item>
  <kirby-label>
    <h3 class="kirby-text-bold">Inventory</h3>
  </kirby-label>
  <kirby-label slot="end">
    <data value="50">50 pcs.</data>
    <data subtitle value="2">2 currently in stock</data>
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
