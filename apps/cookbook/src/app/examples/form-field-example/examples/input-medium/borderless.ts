import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-medium-borderless-example',
  template: `<kirby-form-field size="md" label="Input field with no borders and initial width">
  <input kirby-input borderless="true" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputMediumBorderlessExampleComponent {
  template: string = config.template;
}
