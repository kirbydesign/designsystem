import { Component } from '@angular/core';

const config = {
  template: `<kirby-page
></kirby-page>`,
  styles: [
    `li::before {
      display: none;
    }`,
  ],
};

@Component({
  selector: 'cookbook-default-list-example',
  template: config.template,
  styles: config.styles,
})
export class DefaultListExampleComponent {
  template: string = config.template;
  styles: string = config.styles.join(`
`);
}
