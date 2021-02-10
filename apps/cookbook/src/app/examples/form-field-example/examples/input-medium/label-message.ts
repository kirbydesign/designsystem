import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-medium-label-message-example',
  template: `<kirby-form-field label="Input with label and message" message="This is additional info that will be shown below the input">
  <input kirby-input size="md" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputMediumLabelMessageExampleComponent {
  template: string = config.template;
}
