import { Component } from '@angular/core';

const config = {
  selector: 'kirby-form-field-input-counter-example',
  template: `<kirby-form-field>
  <input kirby-input placeholder="Tweet your message (max 140 chars)" #tweet maxlength="140" />
  <kirby-input-counter [listenTo]="tweet"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field>
  <input kirby-input value="Character counter with prefilled value" #prefilled maxlength="50" />
  <kirby-input-counter [listenTo]="prefilled"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field message="Character counter with message and no maxlength">
  <input kirby-input #message />
  <kirby-input-counter [listenTo]="message"></kirby-input-counter>
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputCounterExampleComponent {
  template: string = config.template;
}
