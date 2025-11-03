import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';
import {
  AffixDirective,
  DateInputDirective,
  FormFieldComponent,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';
import { IconComponent } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-form-field-input-date-native-example',
  template: `<kirby-form-field label="Native (platform) date input with default Kirby calendar icon">
  <input kirby-input type="date" [size]="size" [useNativeDatePicker]="true" />
</kirby-form-field>

<kirby-form-field label="Native (platform) date input with custom icon">
  <input kirby-input type="date" [size]="size" [useNativeDatePicker]="true" />
  <kirby-icon kirby-affix="suffix" name="overview-outline"/>
</kirby-form-field>



      <kirby-form-field>
      <kirby-icon kirby-affix="prefix" name="calendar" />
      <input
        kirby-input
        size="md"
        type="date"
      />
    </kirby-form-field>


`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [FormFieldComponent, DateInputDirective, InputComponent, IconComponent, AffixDirective],
})
export class FormFieldInputDateNativeExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
