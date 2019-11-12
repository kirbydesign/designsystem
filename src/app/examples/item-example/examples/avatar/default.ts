import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-avatar',
  template: `<kirby-item>
  <kirby-avatar overlay="true" slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <kirby-label>
    <h3>Title</h3>
  </kirby-label>
  <kirby-label slot="end">
    <data value="-849.00">-849,00</data>
  </kirby-label>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleAvatarComponent {
  template: string = config.template;
}
