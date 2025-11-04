import { Component } from '@angular/core';
import { HeaderComponent } from '@kirbydesign/designsystem/header';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { IconComponent } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-header-example-avatar',
  template: `<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <kirby-avatar size="lg">
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>
</kirby-header>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [HeaderComponent, AvatarComponent, IconComponent],
})
export class HeaderExampleAvatarComponent {
  template: string = config.template;
}
