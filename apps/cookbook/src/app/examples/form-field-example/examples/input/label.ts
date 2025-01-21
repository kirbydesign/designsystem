import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';
import {
  DateInputDirective,
  FormFieldModule,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';

const config = {
  selector: 'cookbook-form-field-input-label-example',
  template: `<kirby-form-field label="Input with label">
  <input kirby-input [size]="size" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [FormFieldModule, DateInputDirective, InputComponent],
})
export class FormFieldInputLabelExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
