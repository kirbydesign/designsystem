import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-simple-two-lines',
  template: `<kirby-item>
  <kirby-label>
    <p class="kirby-item-title">Title</p>
    <p class="kirby-item-detail">Detail</p>
  </kirby-label>
  <data slot="end">Value</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  standalone: false,
})
export class ItemExampleSimpleTwoLinesComponent {
  template: string = config.template;
}
