import { Component } from '@angular/core';

const config = {
  selector: 'kirby-form-field-input-label-message-example',
  template: `<kirby-form-field label="Input with label and messages">
  <input kirby-input />
  <kirby-form-field-message text="This is additional info"></kirby-form-field-message>
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputLabelMessageExampleComponent {
  template: string = config.template;
}
