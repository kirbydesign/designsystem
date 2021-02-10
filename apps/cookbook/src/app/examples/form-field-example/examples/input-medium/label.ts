import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-medium-label-example',
  template: `<kirby-form-field label="Input with label">
  <input kirby-input size="md"/>
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputMediumLabelExampleComponent {
  template: string = config.template;
}
