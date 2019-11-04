import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex5',
  template: `
  <kirby-item>
  <kirby-label>
    <h3>Title</h3>
    <h4>Subtitle</h4>
  </kirby-label>
  <kirby-label>
    <kirby-value>Value</kirby-value>
    <h4>Subvalue</h4>
  </kirby-label>
</kirby-item>
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemTwoColumnsTwoRowsComponent {
  template: string = config.template;
}
