import { Component } from '@angular/core';
import { FormFieldModule, TextareaComponent } from '@kirbydesign/designsystem/form-field';

const config = {
  selector: 'cookbook-form-field-textarea-label-example',
  template: `<kirby-form-field label="Textarea with label">
  <textarea kirby-textarea></textarea>
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [FormFieldModule, TextareaComponent],
})
export class FormFieldTextareaLabelExampleComponent {
  template: string = config.template;
}
