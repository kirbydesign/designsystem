import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-link-example-external',
  template: `<a href="https://cookbook.kirby.design/home/changelog">Hello World</a>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class LinkExampleExternalComponent {
  template: string = config.template;
}
