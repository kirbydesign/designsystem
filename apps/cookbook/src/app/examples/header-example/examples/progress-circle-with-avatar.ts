import { Component } from '@angular/core';
import { HeaderModule } from '@kirbydesign/designsystem/header';
import { ProgressCircleComponent } from '@kirbydesign/designsystem/progress-circle';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { IconModule } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-header-example-progress-circle-with-avatar',
  template: `<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <kirby-progress-circle value="75" themeColor="success" size="lg">
    <kirby-avatar themeColor="white">
      <kirby-icon name="kirby"></kirby-icon>
    </kirby-avatar>
  </kirby-progress-circle>
</kirby-header>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [
    HeaderModule,
    ProgressCircleComponent,
    AvatarComponent,
    ThemeColorDirective,
    IconModule,
  ],
})
export class HeaderExampleProgressCircleWithAvatarComponent {
  template: string = config.template;
}
