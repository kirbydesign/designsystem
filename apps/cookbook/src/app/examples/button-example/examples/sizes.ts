import { Component } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

const config = {
  selector: 'cookbook-button-example-sizes',
  template: `<button kirby-button size="xs">Extra Small Button</button>
<button kirby-button size="sm">Small Button</button>
<button kirby-button>Medium Button</button>
<button kirby-button size="lg">Large Button</button>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './sizes.scss',
  imports: [ButtonComponent],
})
export class ButtonExampleSizesComponent {
  template: string = config.template;
}
