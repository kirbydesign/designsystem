import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';
import {
  DateInputDirective,
  FormFieldComponent,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';

const config = {
  selector: 'cookbook-form-field-input-date-example',
  template: `<kirby-form-field label="Input with date mask *">
  <input kirby-input type="date" [size]="size" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [FormFieldComponent, DateInputDirective, InputComponent],
})
export class FormFieldInputDateExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
