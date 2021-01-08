import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

const config = {
  selector: 'cookbook-form-field-input-date-example',
  template: `
  <form [formGroup]="dateFormGroup">
    <kirby-form-field label="Date input" >
      <input kirby-input kirby-key-date-input formControlName="dateDemo" />
    </kirby-form-field>
  </form>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputDateExampleComponent {
  template: string = config.template;
  dateFormGroup: FormGroup;

  constructor() {
    this.dateFormGroup = new FormGroup({
      dateDemo: new FormControl(),
    });
  }
}
