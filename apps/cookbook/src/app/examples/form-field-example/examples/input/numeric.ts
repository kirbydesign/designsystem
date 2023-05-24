import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-numeric-example',
  template: `<kirby-form-field label="Numeric input">
  <input type="number" kirby-input kirby-numbers-only-mask [size]="size" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputNumericExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
