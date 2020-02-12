import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-avatar',
  template: `<kirby-item>
  <kirby-avatar overlay="true" slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <h3>Title</h3>
  <data slot="end" value="-849.00">-849,00</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleAvatarComponent {
  template: string = config.template;
}
