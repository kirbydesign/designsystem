import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-date-example',
  template: `
  <form [formGroup]="dateFormGroup">
    <kirby-form-field label="Date input" >
      <input kirby-input kirby-date-input [size]="size"formControlName="dateDemo" />
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
  @Input() size: InputSize;
  constructor() {
    this.dateFormGroup = new FormGroup({
      dateDemo: new FormControl(),
    });
  }
}
