import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-medium-disabled-example',
  template: `<kirby-form-field>
  <input kirby-input size="md" disabled value="Disabled input" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputMediumDisabledExampleComponent {
  template = config.template;
}
