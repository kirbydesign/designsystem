import { Component } from '@angular/core';

let config = {
  selector: 'kirby-form-field-textarea-example',
  template: `<kirby-form-field>
  <textarea kirby-textarea placeholder="Default textarea with placeholder text"></textarea>
  <kirby-form-field-message text="132/100" position="right"></kirby-form-field-message>
</kirby-form-field>`,
};

@Component(config)
export class FormFieldTextareaDefaultExampleComponent {
  template: string = config.template;
}
