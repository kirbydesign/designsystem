import { Component, Input } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-disabled-example',
  template: `<kirby-form-field>
  <input kirby-input [size]="size" disabled value="Disabled input" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputDisabledExampleComponent {
  template = config.template;
  @Input() size: string;
}
