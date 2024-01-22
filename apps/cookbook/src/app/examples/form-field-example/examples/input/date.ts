import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-date-example',
  template: `<kirby-form-field label="Input with date mask *">
  <input kirby-input type="date" [size]="size" />
</kirby-form-field>

<h4>Experimental: Standard HTML date input (native date picker)</h4>

<kirby-form-field label="Standard date input with default Kirby calendar icon">
  <input kirby-input type="date" [size]="size" [useNativeDatePicker]="true" />
</kirby-form-field>

<kirby-form-field label="Standard date input with custom icon">
  <input kirby-input type="date" [size]="size" [useNativeDatePicker]="true" />
  <kirby-icon kirby-affix="suffix" name="dot"/>
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputDateExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
