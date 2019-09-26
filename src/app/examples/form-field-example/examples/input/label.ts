import { Component } from '@angular/core';

let config = {
  selector: 'kirby-form-field-input-label-example',
  template: `<kirby-form-field label="Input with label">
  <input kirby-input />
</kirby-form-field>`,
};

@Component(config)
export class FormFieldInputLabelExampleComponent {
  template: string = config.template;
}
