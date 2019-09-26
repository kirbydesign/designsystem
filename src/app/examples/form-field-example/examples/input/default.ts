import { Component } from '@angular/core';

let config = {
  selector: 'kirby-form-field-input-example',
  template: `<kirby-form-field>
  <input kirby-input placeholder="Default input with placeholder text" />
</kirby-form-field>`,
};

@Component(config)
export class FormFieldInputDefaultExampleComponent {
  template: string = config.template;
}
