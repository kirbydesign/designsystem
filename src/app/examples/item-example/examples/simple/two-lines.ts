import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-simple-two-lines',
  template: `<kirby-item>
  <kirby-label>
    <h3>Title</h3>
    <p subtitle>Subtitle</p>
  </kirby-label>
  <kirby-label slot="end">
    <data>Value</data>
  </kirby-label>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleTwoLinesComponent {
  template: string = config.template;
}
