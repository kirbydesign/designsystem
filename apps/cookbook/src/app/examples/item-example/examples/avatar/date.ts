import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-avatar-date',
  template: `<kirby-item>
  <kirby-avatar overlay="true" slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <kirby-label>
    <h3>Title</h3>
    <time detail>10.04.2020</time>
  </kirby-label>
  <data slot="end" value="-849.00">-849,00</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleAvatarDateComponent {
  template: string = config.template;
}
