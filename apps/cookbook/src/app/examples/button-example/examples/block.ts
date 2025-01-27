import { Component } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

const config = {
  selector: 'cookbook-button-example-block',
  template: `<button kirby-button expand="block">Block Button</button>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
  imports: [ButtonComponent],
})
export class ButtonExampleBlockComponent {
  template: string = config.template;
}
