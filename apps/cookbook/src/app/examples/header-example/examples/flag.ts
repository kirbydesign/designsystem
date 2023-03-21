import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-flag',
  template: `<kirby-header title="Title" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <kirby-flag themeColor="warning">Warning</kirby-flag>
</kirby-header>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class HeaderExampleFlagComponent {
  template: string = config.template;
}
