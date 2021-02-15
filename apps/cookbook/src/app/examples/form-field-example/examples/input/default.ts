import { Component, Input } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-example',
  template: `<kirby-form-field>
  <input kirby-input [size]="size" placeholder="Default input with placeholder text" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputDefaultExampleComponent {
  template: string = config.template;
  @Input() size: string;
}
