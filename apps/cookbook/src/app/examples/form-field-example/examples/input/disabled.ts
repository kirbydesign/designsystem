import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';
import {
  DateInputDirective,
  FormFieldModule,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';

const config = {
  selector: 'cookbook-form-field-input-disabled-example',
  template: `<kirby-form-field>
  <input kirby-input [size]="size" disabled value="Disabled input" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [FormFieldModule, DateInputDirective, InputComponent],
})
export class FormFieldInputDisabledExampleComponent {
  template = config.template;
  @Input() size: InputSize;
}
