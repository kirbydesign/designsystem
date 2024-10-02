import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-button-example-block',
  template: `<button kirby-button expand="block">Block Button</button>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
})
export class ButtonExampleBlockComponent {
  template: string = config.template;
}
