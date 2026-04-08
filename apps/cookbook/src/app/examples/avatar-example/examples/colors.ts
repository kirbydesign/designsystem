import { Component, HostBinding } from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { IconComponent } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-avatar-example-colors',
  template: `<kirby-avatar themeColor="light" title="light (default)">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar themeColor="white" title="white">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>`,
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
