import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-simple-three-lines',
  template: `<kirby-item>
  <kirby-label>
    <h3>Title</h3>
    <p subtitle class="black">Paragraph</p>
    <p subtitle>Subtitle</p>
  </kirby-label>
  <data slot="end" class="kirby-text-bold" value="value">Value</data>
</kirby-item>`,
  styles: [
    `[subtitle].black {
      color: var(--kirby-black);
    }`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
})
export class ItemExampleSimpleThreeLinesComponent {
  template: string = config.template;
}
