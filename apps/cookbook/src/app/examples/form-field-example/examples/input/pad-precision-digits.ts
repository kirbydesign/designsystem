import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';
import {
  DateInputDirective,
  DecimalMaskDirective,
  FormFieldModule,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';

const config = {
  selector: 'cookbook-form-field-input-pad-precision-digits-example',
  template: `<kirby-form-field label="Decimal mask with pad precision digits">
  <input type="number" kirby-input kirby-decimal-mask [padPrecisionDigits]="true"/>
</kirby-form-field>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [FormFieldModule, DateInputDirective, InputComponent, DecimalMaskDirective],
})
export class FormFieldInputPadPrecisionDigitsExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
