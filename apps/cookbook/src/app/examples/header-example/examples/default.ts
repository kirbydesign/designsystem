import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-default',
  template: `
    <kirby-header title="Title" subtitle1="Subtitle one" subtitle2="Subtitle two">
    </kirby-header>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class HeaderExampleDefaultComponent {
  template: string = config.template;
}
