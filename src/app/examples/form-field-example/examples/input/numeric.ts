import { Component } from '@angular/core';

const config = {
  selector: 'kirby-form-field-input-numeric-example',
  template: `<kirby-form-field label="Numeric input">
  <input type="number" kirby-input />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputNumericExampleComponent {
  template: string = config.template;
}
