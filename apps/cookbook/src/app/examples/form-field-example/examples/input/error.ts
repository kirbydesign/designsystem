import { Component, Input } from '@angular/core';

import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';
import { InputSize } from '@kirbydesign/designsystem/form-field';
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
  imports: [FormFieldModule, DateInputDirective, InputComponent, DropdownComponent],
})
export class FormFieldInputErrorExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
