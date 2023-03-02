import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-value',
  template: `
  <kirby-header title="Title" value="12.345,67" valueUnit="USD" subtitle1="Subtitle 1" subtitle2="Subtitle 2">
  </kirby-header>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class HeaderExampleValueComponent {
  template: string = config.template;
}
