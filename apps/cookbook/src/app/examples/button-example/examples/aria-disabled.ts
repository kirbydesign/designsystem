import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-button-example-aria-disabled',
  template: `<button kirby-button aria-disabled="true">Aria Disabled</button>
<a kirby-button aria-disabled="true" href="/">Aria Disabled Link</a>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
  standalone: false,
})
export class ButtonExampleAriaDisabledComponent {
  template: string = config.template;
}
