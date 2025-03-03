import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { IconModule } from '@kirbydesign/designsystem/icon';

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
  imports: [ItemModule, AvatarComponent, IconModule],
})
export class ItemExampleAvatarComponent {
  template: string = config.template;
}
