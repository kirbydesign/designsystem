import { Component } from '@angular/core';

const config = {
  selector: 'kirby-form-field-input-label-example',
  template: `<kirby-form-field label="Input with label">
  <input kirby-input />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputLabelExampleComponent {
  template: string = config.template;
}
