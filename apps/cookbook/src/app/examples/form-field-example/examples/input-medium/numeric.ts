import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-medium-numeric-example',
  template: `<kirby-form-field label="Numeric input">
  <input type="number" kirby-input size="md" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputMediumNumericExampleComponent {
  template: string = config.template;
}
