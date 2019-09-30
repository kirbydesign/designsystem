import { Component } from '@angular/core';

const config = {
  selector: 'kirby-form-field-textarea-example',
  template: `<kirby-form-field>
  <textarea kirby-textarea placeholder="Default textarea with placeholder text"></textarea>
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldTextareaDefaultExampleComponent {
  template: string = config.template;
}
