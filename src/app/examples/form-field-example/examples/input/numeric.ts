import { Component } from '@angular/core';

let config = {
  selector: 'kirby-form-field-input-numeric-example',
  template: `<kirby-form-field label="Numeric input">
  <input type="number" kirby-input />
</kirby-form-field>`,
};

@Component(config)
export class FormFieldInputNumericExampleComponent {
  template: string = config.template;
}
