import { Component } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-button-example-undecorated',
  template: `<button kirby-button [noDecoration]="true" aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
  imports: [ButtonComponent, IconModule],
})
export class ButtonExampleUndecoratedComponent {
  template: string = config.template;
}
