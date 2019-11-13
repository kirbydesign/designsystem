import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-simple-three-lines',
  template: `<kirby-item>
  <kirby-label>
    <h3>Title</h3>
    <p>Paragraph</p>
    <p subtitle>Subtitle</p>
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
