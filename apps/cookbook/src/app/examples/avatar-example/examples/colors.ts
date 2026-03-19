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
</div>

<div class="avatar-item-container">
  <div class="avatar-item-inner-container-bg">
    <kirby-avatar themeColor="light">
      <kirby-icon name="kirby">
      </kirby-icon>
    </kirby-avatar>
  </div>
</div>`,
  htmlSnippet: `<kirby-avatar themeColor="white"><kirby-icon name="kirby"></kirby-icon></kirby-avatar>
<kirby-avatar themeColor="light"><kirby-icon name="kirby"></kirby-icon></kirby-avatar>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./avatar-examples.shared.scss'],
  imports: [AvatarComponent, ThemeColorDirective, IconComponent],
})
export class AvatarExampleColorsComponent {
  template: string = config.template;
  htmlSnippet: string = config.htmlSnippet;

  @HostBinding('class.wrap')
  shouldWrap: boolean = true;
}
