import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-input-numeric',
  template: `<kirby-item>
  <kirby-avatar slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <h3>Title</h3>
  <kirby-form-field slot="end">
    <input type="number" kirby-input value="100.00" />
  </kirby-form-field>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleInputNumericComponent {
  template: string = config.template;
}
