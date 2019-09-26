import { Component } from '@angular/core';

let config = {
  selector: 'kirby-form-field-input-state-warning-example',
  template: `<kirby-form-field label="Warning">
  <input kirby-input state="warning" />
</kirby-form-field>`,
};

@Component(config)
export class FormFieldInputStateWarningExampleComponent {
  template: string = config.template;
}
