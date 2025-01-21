import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';
import {
  DateInputDirective,
  FormFieldModule,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';

const config = {
  selector: 'cookbook-form-field-input-counter-example',
  template: `<kirby-form-field>
  <input kirby-input [size]="size" placeholder="Tweet your message (max 140 chars)" #tweet maxlength="140" />
  <kirby-input-counter [listenTo]="tweet"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field>
  <input kirby-input [size]="size" value="Character counter with prefilled value" #prefilled maxlength="50" />
  <kirby-input-counter [listenTo]="prefilled"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field message="Character counter with message and no maxlength">
  <input kirby-input [size]="size" #message />
  <kirby-input-counter [listenTo]="message"></kirby-input-counter>
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [FormFieldModule, DateInputDirective, InputComponent],
})
export class FormFieldInputCounterExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
