import { Component, Input } from '@angular/core';

import { CardComponent, InputSize } from '@kirbydesign/designsystem';
import {
  DateInputDirective,
  FormFieldComponent,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';

const config = {
  selector: 'cookbook-form-field-input-date-native-in-card-example',
  template: `<kirby-card hasPadding="true">
<kirby-form-field label="Native (platform) date input with default Kirby calendar icon inside card">
  <input kirby-input type="date" [size]="size" [useNativeDatePicker]="true" />
</kirby-form-field></kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [FormFieldComponent, DateInputDirective, InputComponent, CardComponent],
})
export class FormFieldInputDateNativeInCardExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
