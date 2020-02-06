import { Component } from '@angular/core';

const config = {
  selector: 'kirby-form-field-input-counter-example',
  template: `<kirby-form-field>
  <input kirby-input placeholder="Tweet your message (max 140 chars)" #tweet maxlength="140" />
  <kirby-input-counter [listenTo]="tweet"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field style="width:120px">
  <input kirby-input placeholder="Small width" #small_width maxlength="20" />
  <kirby-input-counter [listenTo]="small_width"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field>
  <input kirby-input value="Character counter with prefilled value" #prefilled maxlength="50" />
  <kirby-input-counter [listenTo]="prefilled"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field message="Character counter with message and no maxlength">
  <input kirby-input #message />
  <kirby-input-counter [listenTo]="message"></kirby-input-counter>
</kirby-form-field>

<kirby-form-field message="Character counter with maxlength and long message **** Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" >
  <input kirby-input #longmessage maxlength="150"/>
  <kirby-input-counter [listenTo]="longmessage"></kirby-input-counter>
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputCounterExampleComponent {
  template: string = config.template;
}
