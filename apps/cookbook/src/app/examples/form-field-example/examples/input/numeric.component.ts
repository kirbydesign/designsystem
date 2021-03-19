import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-numeric-example',
  template: `
<form [formGroup]="numericFormGroup">  
  <kirby-form-field label="Numeric input">
    <input type="number" [size]="size" kirby-input />
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
  @Input() size: InputSize;
  constructor() {
    this.numericFormGroup = new FormGroup({});
  }
}
