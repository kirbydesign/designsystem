import { Component } from '@angular/core';

let config = {
  selector: 'kirby-form-field-input-state-danger-example',
  template: `<kirby-form-field label="Danger">
  <input kirby-input state="danger" />
  <kirby-form-field-message text="This is an error message"></kirby-form-field-message>
</kirby-form-field>`,
};

@Component(config)
export class FormFieldInputStateDangerExampleComponent {
  template: string = config.template;
}
