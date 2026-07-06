import { Component } from '@angular/core';
import { HeaderComponent } from '@kirbydesign/designsystem/header';

const config = {
  selector: 'cookbook-header-example-default',
  template: `<kirby-header [title]="'Title'" subtitle1="Subtitle One test" subtitle2="Subtitle two">
</kirby-header>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [HeaderComponent],
})
export class HeaderExampleDefaultComponent {
  template: string = config.template;
}
