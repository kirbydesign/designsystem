import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-button-example-default',
  template: `<button kirby-button>Default Button</button>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
})
export class ButtonExampleDefaultComponent {
  template: string = config.template;
}
