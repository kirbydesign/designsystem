import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';
import {
  DateInputDirective,
  FormFieldModule,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';

const config = {
  selector: 'cookbook-form-field-input-error-example',
  template: `<kirby-form-field label="Error" message="This is an error message">
  <input kirby-input [size]="size" hasError="true" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [FormFieldModule, DateInputDirective, InputComponent],
})
export class FormFieldInputErrorExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
