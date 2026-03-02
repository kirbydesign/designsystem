import { Component } from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { IconComponent } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-avatar-example-image-size',
  template: `<div class="avatar-item-container">
  <div class="avatar-item-inner-container">
    <kirby-avatar size="xs"><kirby-icon name="kirby"></kirby-icon></kirby-avatar>
  </div>
    <span class="avatar-item-title">xs</span>
</div>

<div class="avatar-item-container">
  <div class="avatar-item-inner-container">
    <kirby-avatar size="sm"><kirby-icon name="kirby"></kirby-icon></kirby-avatar>
  </div>
    <span class="avatar-item-title">sm</span>
</div>

<div class="avatar-item-container">
  <div class="avatar-item-inner-container">
    <kirby-avatar size="md"><kirby-icon name="kirby"></kirby-icon></kirby-avatar>
  </div>
    <span class="avatar-item-title">md</span>
</div>

<div class="avatar-item-container">
  <div class="avatar-item-inner-container">
    <kirby-avatar size="lg"><kirby-icon name="kirby"></kirby-icon></kirby-avatar>
  </div>
    <span class="avatar-item-title">lg</span>
</div>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./avatar-examples.shared.scss'],
  imports: [AvatarComponent, IconComponent],
})
export class AvatarExampleImageSizeComponent {
  template: string = config.template;
}
