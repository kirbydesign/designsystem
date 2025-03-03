import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { IconModule } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-item-example-picker-avatar-selected',
  template: `<kirby-item selectable="true" selected="true">
  <kirby-avatar overlay="true" slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <p class="kirby-item-title">Title</p>
  <kirby-icon slot="end" name="checkmark-selected"></kirby-icon>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ItemModule, AvatarComponent, IconModule],
})
export class ItemExamplePickerAvatarSelectedComponent {
  template: string = config.template;
}
