import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-simple-three-lines',
  template: `<kirby-item>
  <kirby-label>
    <p class="kirby-item-title">Title</p>
    <p class="kirby-item-subtitle">Subtitle</p>
    <p class="kirby-item-detail"Detail</p>
  </kirby-label>
  <data slot="end" class="kirby-text-bold" value="value">Value</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleThreeLinesComponent {
  template: string = config.template;
}
