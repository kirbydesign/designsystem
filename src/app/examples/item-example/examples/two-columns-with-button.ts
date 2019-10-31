import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex4',
  template: `
  <kirby-item>
  <kirby-label>
    <h3>Title</h3>
    <h4>Subtitle</h4>
  </kirby-label>
  <button kirby-button size="sm">Small Button</button>
</kirby-item>
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemTwoColumnsWithButtonComponent {
  template: string = config.template;
}
