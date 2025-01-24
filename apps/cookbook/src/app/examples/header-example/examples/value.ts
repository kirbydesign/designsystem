import { Component } from '@angular/core';
import { HeaderModule } from '@kirbydesign/designsystem/header';

const config = {
  selector: 'cookbook-header-example-value',
  template: `<kirby-header [title]="'Title'" value="12.345,67" valueUnit="USD" subtitle1="Subtitle one" subtitle2="Subtitle two">
</kirby-header>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [HeaderModule],
})
export class HeaderExampleValueComponent {
  template: string = config.template;
}
