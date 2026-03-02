import { Component, HostBinding } from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { IconComponent } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-avatar-example-colors',
  template: `<div class="avatar-item-container">
  <div class="avatar-item-inner-container-bg-none">
    <kirby-avatar themeColor="white">
      <kirby-icon name="kirby">
      </kirby-icon>
    </kirby-avatar>
  </div>
  <span class="avatar-item-title">White</span>
</div>

<div class="avatar-item-container">
  <div class="avatar-item-inner-container-bg">
    <kirby-avatar themeColor="light">
      <kirby-icon name="kirby">
      </kirby-icon>
    </kirby-avatar>
  </div>
  <span class="avatar-item-title">Light</span>
</div>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./avatar-examples.shared.scss'],
  imports: [AvatarComponent, ThemeColorDirective, IconComponent],
})
export class AvatarExampleColorsComponent {
  template: string = config.template;

  @HostBinding('class.wrap')
  shouldWrap: boolean = true;
}
