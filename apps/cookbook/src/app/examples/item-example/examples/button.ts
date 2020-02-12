import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-button',
  template: `<kirby-item>
  <kirby-label>
    <h3>Title</h3>
    <p detail>Detail</p>
  </kirby-label>
  <button slot="end" kirby-button size="sm">Small Button</button>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleButtonComponent {
  template: string = config.template;
}
