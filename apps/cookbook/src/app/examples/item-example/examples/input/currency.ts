import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-input-currency',
  template: `<kirby-item>
  <kirby-avatar slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <h3>Title</h3>
  <kirby-form-field slot="end">
    <input type="currency" kirby-input currencyFormatter="da" maxWholeNumberLength="9" maxFractionLength="2" placeholder="0,00" />
  </kirby-form-field>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleInputCurrencyComponent {
  template: string = config.template;
}
