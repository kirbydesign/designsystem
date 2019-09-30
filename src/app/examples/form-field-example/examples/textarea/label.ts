import { Component } from '@angular/core';

const config = {
  selector: 'kirby-form-field-textarea-label-example',
  template: `<kirby-form-field label="Textarea with label">
  <textarea kirby-textarea></textarea>
  <kirby-form-field-message text="132/100" position="right"></kirby-form-field-message>
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldTextareaLabelExampleComponent {
  template: string = config.template;
}
