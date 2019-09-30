import { Component } from '@angular/core';

const config = {
  selector: 'kirby-form-field-input-error-example',
  template: `<kirby-form-field label="Warning">
  <input kirby-input hasError="true" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputErrorExampleComponent {
  template: string = config.template;
}
