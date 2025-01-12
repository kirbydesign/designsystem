import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-avatar',
  template: `<kirby-item>
  <kirby-avatar overlay="true" slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <p class="kirby-item-title">Title</p>
  <data slot="end" value="-849.00">-849,00</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  standalone: false,
})
export class ItemExampleAvatarComponent {
  template: string = config.template;
}
