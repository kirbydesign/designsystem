import { Component } from '@angular/core';

const config = {
  selector: 'kirby-form-field-input-state-warning-example',
  template: `<kirby-form-field label="Warning">
  <input kirby-input state="warning" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputStateWarningExampleComponent {
  template: string = config.template;
}
