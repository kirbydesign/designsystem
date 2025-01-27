import { Component } from '@angular/core';
import { HeaderModule } from '@kirbydesign/designsystem/header';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { IconModule } from '@kirbydesign/designsystem/icon';

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
  imports: [HeaderModule, AvatarComponent, IconModule],
})
export class HeaderExampleAvatarComponent {
  template: string = config.template;
}
