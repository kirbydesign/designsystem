import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent, InputSize } from '@kirbydesign/designsystem';
import {
  DateInputDirective,
  DecimalMaskDirective,
  FormFieldComponent,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';

const config = {
  selector: 'cookbook-form-field-input-pad-precision-digits-example',
  template: `<div [formGroup]="form">
<kirby-form-field label="Decimal mask with pad precision digits">
  <input type="number" kirby-input kirby-decimal-mask formControlName="amount" [precision]="4" [padPrecisionDigits]="true"/>
</kirby-form-field>
</div>
<button (click)="changeAmount()" kirby-button>Klik på mig</button> 
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [
    FormFieldComponent,
    DateInputDirective,
    InputComponent,
    ReactiveFormsModule,
    DecimalMaskDirective,
    ButtonComponent,
  ],
})
export class FormFieldInputPadPrecisionDigitsExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;

  protected readonly form = new FormGroup({
    amount: new FormControl<number | null>(null),
  });

  changeAmount() {
    this.form.patchValue({
      amount: 4,
    });
    console.log('Forms example: updating value with new value');
  }
}
