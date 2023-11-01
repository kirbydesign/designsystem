import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-date-example',
  template: `<kirby-form-field label="Input with date mask" message="This is technically not a date input. Type gets converted to a standard text input.">
  <input kirby-input type="date" [size]="size" placeholder="Select a date" value="This is not a date" />
</kirby-form-field>

<kirby-form-field label="Date input using the platform (native date picker)">
  <input kirby-input type="date" [size]="size" placeholder="Select a date" [useNativeDatePicker]="true" />
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
