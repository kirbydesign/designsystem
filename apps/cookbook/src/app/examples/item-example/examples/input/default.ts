import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-input-default',
  template: `<kirby-item>
  <kirby-avatar overlay="true" slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <h3>Title</h3>
  <kirby-form-field slot="end">
    <input
      type="number"
      kirby-input
      pattern="^[0-9]+(,[0-9]{1,2})?$"
      borderless="true"
      currencyInput="true"/>
  </kirby-form-field>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleInputDefaultComponent {
  template: string = config.template;
}
