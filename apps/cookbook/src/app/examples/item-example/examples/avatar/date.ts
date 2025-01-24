import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { IconModule } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-item-example-avatar-date',
  template: `<kirby-item>
  <kirby-avatar overlay="true" slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <kirby-label>
    <p class="kirby-item-title">Title</p>
    <time class="kirby-item-detail">10.04.2020</time>
  </kirby-label>
  <data slot="end" value="-849.00">-849,00</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ItemModule, AvatarComponent, IconModule],
})
export class ItemExampleAvatarDateComponent {
  template: string = config.template;
}
