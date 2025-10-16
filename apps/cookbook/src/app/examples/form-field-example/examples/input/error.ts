import { D } from '@angular/cdk/scrolling-module.d-C_w4tIrZ';
import { Component, Input } from '@angular/core';

import { DropdownModule, InputSize } from '@kirbydesign/designsystem';
import {
  DateInputDirective,
  FormFieldModule,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';

const config = {
  selector: 'cookbook-form-field-input-error-example',
  template: `<kirby-form-field label="Error" message="This is an error message">
  <kirby-dropdown [items]="['Item 1', 'Item 2', 'Item 3']" hasError="true" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [FormFieldModule, DateInputDirective, InputComponent, DropdownModule],
})
export class FormFieldInputErrorExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
