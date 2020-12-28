import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const config = {
  selector: 'cookbook-form-field-input-numeric-example',
  template: `<kirby-form-field label="Numeric input">
  <input type="number" kirby-input />
</kirby-form-field>

<kirby-form-field label="Numeric input using default settings" >
  <input kirby-input kirby-key-numeric-input formControlName="numericDemo1"
  />
</kirby-form-field>

<kirby-form-field label="Numeric input with 2 decimals and negative numbers" >
  <input kirby-input kirby-key-numeric-input formControlName="numericDemo2" maximumNumberOfDecimals="2" allowNegativeNumber="true"
  />
</kirby-form-field>


<kirby-form-field label="Numeric input with positive 8 digit integral part only (0 decimals)" >
  <input kirby-input kirby-key-numeric-input formControlName="numericDemo3"
  maximumNumberOfDecimals="0"
  allowNegativeNumber="false" maxNumberOfIntegrals="8"
  />
</kirby-form-field>


`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputNumericExampleComponent {
  template: string = config.template;

  constructor(private fb: FormBuilder) {
    this.myFormGroup = fb.group({
      numericDemo1: [''],
      numericDemo2: [''],
      numericDemo3: [''],
    });
  }
  myFormGroup: FormGroup;
}
