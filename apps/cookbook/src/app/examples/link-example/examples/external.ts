import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-link-example-external',
  template: `<a target="_blank" href="https://github.com/kirbydesign/designsystem">External</a>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class LinkExampleExternalComponent {
  template: string = config.template;
}
