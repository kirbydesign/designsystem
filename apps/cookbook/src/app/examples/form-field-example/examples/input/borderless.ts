import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-borderless-example',
  template: `<kirby-form-field label="Input field with no borders and initial width">
  <input kirby-input borderless="true" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputBorderlessExampleComponent {
  template: string = config.template;
}
