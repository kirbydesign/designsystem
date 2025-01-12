import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-input-numeric',
  template: `<kirby-item>
  <kirby-avatar slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <p class="kirby-item-title">Title</p>
  <kirby-form-field slot="end">
    <input type="number" kirby-input value="100.00" borderless="true"/>
  </kirby-form-field>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  standalone: false,
})
export class ItemExampleInputNumericComponent {
  template: string = config.template;
}
