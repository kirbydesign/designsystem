import { Component } from '@angular/core';
import { HeaderComponent } from '@kirbydesign/designsystem/header';
import { FlagComponent } from '@kirbydesign/designsystem/flag';

const config = {
  selector: 'cookbook-header-example-flag',
  template: `<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <kirby-flag themeColor="warning">Warning</kirby-flag>
</kirby-header>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [HeaderComponent, FlagComponent],
})
export class HeaderExampleFlagComponent {
  template: string = config.template;
}
