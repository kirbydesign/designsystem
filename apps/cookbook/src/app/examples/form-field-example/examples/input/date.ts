import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const config = {
  selector: 'cookbook-form-field-input-date-example',
  template: `<kirby-form-field label="Date input" >
  <input kirby-input kirby-key-date-input formControlName="dateDemo"
  />
</kirby-form-field>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputDateExampleComponent {
  template: string = config.template;

  constructor(private fb: FormBuilder) {
    this.myFormGroup = fb.group({
      dateDemo: [''],
    });
  }
  myFormGroup: FormGroup;
}
