import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-simple-two-lines',
  template: `<kirby-item>
  <kirby-label>
    <h3>Title</h3>
    <p detail>Detail</p>
  </kirby-label>
  <data slot="end">Value</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleTwoLinesComponent {
  template: string = config.template;
}
