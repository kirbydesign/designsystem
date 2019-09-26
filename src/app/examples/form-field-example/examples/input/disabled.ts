import { Component } from '@angular/core';

let config = {
  selector: 'kirby-form-field-input-disabled-example',
  template: `<kirby-form-field>
  <input kirby-input disabled value="Disabled input" />
</kirby-form-field>`,
};

@Component(config)
export class FormFieldInputDisabledExampleComponent {
  template = config.template;
}
