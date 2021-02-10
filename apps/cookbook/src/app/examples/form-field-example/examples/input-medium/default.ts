import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-medium-example',
  template: `<kirby-form-field>
  <input kirby-input size="md" placeholder="Default input with placeholder text" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputMediumDefaultExampleComponent {
  template: string = config.template;
}
