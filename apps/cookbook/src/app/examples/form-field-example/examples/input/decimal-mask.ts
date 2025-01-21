import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';
import {
  DateInputDirective,
  DecimalMaskDirective,
  FormFieldModule,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';

const config = {
  selector: 'cookbook-form-field-input-decimal-mask-example',
  template: `<kirby-form-field label="Decimal mask input">
  <input type="number" kirby-input kirby-decimal-mask />
</kirby-form-field>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [FormFieldModule, DateInputDirective, InputComponent, DecimalMaskDirective],
})
export class FormFieldInputDecimalMaskExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
