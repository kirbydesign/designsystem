import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';
import {
  AffixDirective,
  DateInputDirective,
  FormFieldModule,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { SpinnerModule } from '@kirbydesign/designsystem/spinner';

const config = {
  selector: 'cookbook-form-field-input-affix-example',
  template: `<kirby-form-field label="With prefix">
  <kirby-icon name="payment-card" kirby-affix="prefix"></kirby-icon>
   <input kirby-input placeholder="Enter your card number" [size]="size" />
</kirby-form-field>

<kirby-form-field label="With suffix">
  <input kirby-input [size]="size" type="number" placeholder="Monthly payments" [size]="size" />
  <span kirby-affix="suffix">kr/md</span>
</kirby-form-field>

<kirby-form-field label="With prefix and suffix">
  <kirby-icon name="search" kirby-affix="prefix"></kirby-icon>
  <input kirby-input decimal-mask placeholder="Search..." [size]="size" />
  <kirby-spinner kirby-affix="suffix"></kirby-spinner>
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [
    FormFieldModule,
    IconModule,
    AffixDirective,
    DateInputDirective,
    InputComponent,
    SpinnerModule,
  ],
})
export class FormFieldInputAffixExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
