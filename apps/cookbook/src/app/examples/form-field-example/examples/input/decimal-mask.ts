import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-decimal-mask-example',
  template: `<kirby-form-field label="Decimal mask input">
  <input type="number" kirby-input kirby-decimal-mask [size]="size"/>
</kirby-form-field>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputDecimalMaskExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
