import { Component } from '@angular/core';

let config = {
  selector: 'kirby-form-field-textarea-label-example',
  template: `<kirby-form-field label="Textarea with label">
  <textarea kirby-textarea></textarea>
  <kirby-form-field-message text="132/100" position="right"></kirby-form-field-message>
</kirby-form-field>`,
};

@Component(config)
export class FormFieldTextareaLabelExampleComponent {
  template: string = config.template;
}
