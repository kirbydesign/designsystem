import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-affix-example',
  template: `
    <kirby-form-field label="With prefix">
      <kirby-icon name="payment-card" prefix></kirby-icon>
      <input kirby-input placeholder="Enter your card number" [size]="size" />
    </kirby-form-field>

    <kirby-form-field label="With suffix">
      <input kirby-input kirby-decimal-mask [size]="size" type="number" placeholder="Monthly payments" [size]="size" />
      <span suffix>$/m</span>
    </kirby-form-field>
    
    <kirby-form-field label="With prefix and suffix">
      <kirby-icon name="search" prefix></kirby-icon>
      <input kirby-input decimal-mask placeholder="Seach..." [size]="size" />
      <kirby-spinner suffix></kirby-spinner>
    </kirby-form-field>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputAffixExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
