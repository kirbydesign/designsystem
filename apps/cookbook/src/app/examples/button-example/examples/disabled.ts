import { Component } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-button-example-disabled',
  template: `<button kirby-button disabled>
  Disabled
</button>
<button kirby-button disabled>
  <kirby-icon name="edit"></kirby-icon>  
  Disabled with icon
</button>
<button kirby-button disabled aria-label="Close">
  <kirby-icon name="close"></kirby-icon>  
</button>
<button kirby-button disabled [noDecoration]="true" aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
  imports: [ButtonComponent, IconModule],
})
export class ButtonExampleDisabledComponent {
  template: string = config.template;
}
