import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-label-message-example',
  template: `<kirby-form-field label="Input with label and message" message="This is additional info">
  <input kirby-input />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputLabelMessageExampleComponent {
  template: string = config.template;
}
