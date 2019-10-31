import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex12',
  template: `
  <kirby-item>
  <kirby-icon name="checkmark-selected"></kirby-icon>
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
export class ItemThreeColumnsCheckedComponent {
  template: string = config.template;
}
