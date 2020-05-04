import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-simple-three-lines',
  template: `<kirby-item>
  <kirby-label>
    <h3>Title</h3>
    <p subtitle>Subtitle</p>
    <p detail>Detail</p>
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
