import { Component } from '@angular/core';

const config = {
  selector: 'kirby-form-field-input-label-message-example',
  template: `<kirby-form-field label="Input with label and messages" message="This is additional info">
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
