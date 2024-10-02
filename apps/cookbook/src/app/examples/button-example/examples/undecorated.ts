import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-button-example-undecorated',
  template: `<button kirby-button [noDecoration]="true">
  <kirby-icon name="close"></kirby-icon>
</button>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
})
export class ButtonExampleUndecoratedComponent {
  template: string = config.template;
}
