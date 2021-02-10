import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-medium-error-example',
  template: `<kirby-form-field label="Error" message="This is an error message">
  <input kirby-input size="md" hasError="true" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputMediumErrorExampleComponent {
  template: string = config.template;
}
