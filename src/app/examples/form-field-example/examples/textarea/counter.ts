import { Component } from '@angular/core';

const config = {
  selector: 'kirby-form-field-textarea-counter-example',
  template: `<kirby-form-field>
  <textarea kirby-textarea placeholder="Tweet your message (max 140 chars)" #tweet maxlength="140"></textarea>
  <kirby-input-counter [listenTo]="tweet"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field>
  <textarea kirby-textarea value="Character counter with prefilled value" #prefilled maxlength="50"></textarea>
  <kirby-input-counter [listenTo]="prefilled"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field message="Character counter with message and no maxlength">
  <textarea kirby-textarea #message></textarea>
  <kirby-input-counter [listenTo]="message"></kirby-input-counter>
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldTextareaCounterExampleComponent {
  template: string = config.template;
}
