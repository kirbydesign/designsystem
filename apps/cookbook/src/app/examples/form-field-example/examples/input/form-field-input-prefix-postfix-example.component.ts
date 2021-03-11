import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-prefix-postfix-example',
  template: `
<kirby-form-field label="Input with Prefix">
  <kirby-input-prefix [size]="size">@</kirby-input-prefix>
  <input  [size]="size" type="text" kirby-input class="input-prefix-postfix" placeholder="Username"/>
</kirby-form-field>

<kirby-form-field label="Input with Postfix">
  <input [size]="size" type="text" kirby-input class="input-prefix-postfix" placeholder="Recipient's username"/>
  <kirby-input-postfix [size]="size">@bankdata.dk</kirby-input-postfix>
</kirby-form-field>

<kirby-form-field label="Input with Prefix and Postfix">
  <kirby-input-prefix [size]="size">$</kirby-input-prefix>
    <input [size]="size" type="text" kirby-input class="input-prefix-postfix"/>
  <kirby-input-postfix [size]="size">.00</kirby-input-postfix>
</kirby-form-field>


<kirby-form-field label="Input with Prefix and Postfix">
  <kirby-input-prefix [size]="size">email</kirby-input-prefix>
    <input [size]="size" type="email" kirby-input class="input-prefix-postfix"/>
  <kirby-input-postfix [size]="size">@bankdata.dk</kirby-input-postfix>
</kirby-form-field>

<div>Input without label</div>
<kirby-form-field >
  <kirby-input-prefix [size]="size">email</kirby-input-prefix>
    <input [size]="size" type="email" kirby-input class="input-prefix-postfix"/>
  <kirby-input-postfix [size]="size">@bankdata.dk</kirby-input-postfix>
</kirby-form-field>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputPrefixPostfixExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
