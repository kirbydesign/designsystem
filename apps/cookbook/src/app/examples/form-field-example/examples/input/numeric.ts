import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

const config = {
  selector: 'cookbook-form-field-input-numeric-example',
  template: `
<form [formGroup]="numericFormGroup">  
  <kirby-form-field label="Numeric input">
    <input type="number" kirby-input />
  </kirby-form-field>

  <kirby-form-field label="Numeric input using default settings">
    <input kirby-input kirby-numeric-input formControlName="numericDemo1"
    />
  </kirby-form-field>

  <kirby-form-field label="Numeric input with 2 decimals and negative numbers" >
    <input kirby-input kirby-numeric-input formControlName="numericDemo2" maximumNumberOfDecimals="2" allowNegativeNumber="true"
    />
  </kirby-form-field>

  <kirby-form-field label="Numeric input with positive 8 digit integral part only (0 decimals)" >
    <input kirby-input kirby-numeric-input formControlName="numericDemo3"
    maximumNumberOfDecimals="0"
    allowNegativeNumber="false" maxNumberOfIntegrals="8"
    />
  </kirby-form-field>
</form>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputNumericExampleComponent {
  template: string = config.template;
  numericFormGroup: FormGroup;

  constructor() {
    this.numericFormGroup = new FormGroup({
      numericDemo1: new FormControl(),
      numericDemo2: new FormControl(),
      numericDemo3: new FormControl(),
    });
  }
}
