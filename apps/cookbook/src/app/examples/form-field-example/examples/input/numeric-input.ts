import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const config = {
  selector: 'cookbook-form-field-input-numeric-input-example',
  template: `<kirby-form-field label="Numeric input" >
  <input kirby-input kirby-numeric-input formControlName="numericIntegralOnly"
  />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputNumericInputExampleComponent {
  template: string = config.template;

  constructor(private fb: FormBuilder) {
    this.myFormGroup = fb.group({
      numericIntegralOnly: [''],
    });
  }
  myFormGroup: FormGroup;
}
