import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-prefix-postfix-example',
  template: `
<kirby-form-field label="Input with Prefix">
<kirby-input-prefix >@</kirby-input-prefix>
  <input type="text" kirby-input class="input-prefix-postfix" placeholder="Username"/>
</kirby-form-field>
<kirby-form-field label="Input with Postfix">
  <input type="text" kirby-input class="input-prefix-postfix" placeholder="Recipient's username"/>
  <kirby-input-postfix>@bankdata.dk</kirby-input-postfix>
</kirby-form-field>


<kirby-form-field label="Input with Prefix and Postfix">
<kirby-input-prefix >$</kirby-input-prefix>
  <input type="text" kirby-input class="input-prefix-postfix"/>
<kirby-input-postfix>.00</kirby-input-postfix>
</kirby-form-field>


<kirby-form-field label="Input with Prefix and Postfix">
<kirby-input-prefix >email</kirby-input-prefix>
  <input type="email" kirby-input class="input-prefix-postfix"/>
<kirby-input-postfix>@bankdata.dk</kirby-input-postfix>
</kirby-form-field>

<div>Input without label</div>
<kirby-form-field >
<kirby-input-prefix >email</kirby-input-prefix>
  <input type="email" kirby-input class="input-prefix-postfix"/>
<kirby-input-postfix>@bankdata.dk</kirby-input-postfix>
</kirby-form-field>

<kirby-form-field >
<kirby-input-prefix >Name</kirby-input-prefix>
<kirby-dropdown  class="input-prefix-postfix"
  [size]="size"
  [items]="['Item 1','Item 2','Item 3','Item 4','Item 5']"
></kirby-dropdown>
  
<kirby-input-postfix>@bankdata.dk</kirby-input-postfix>
</kirby-form-field>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputPrefixPostfixExampleComponent {
  template: string = config.template;
}
