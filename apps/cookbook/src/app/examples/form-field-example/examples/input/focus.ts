import { Component, Input, ViewChild } from '@angular/core';

import { FormFieldComponent, InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-focus-example',
  template: `<kirby-checkbox
  [checked]="inputEnabled"
  (checkedChange)="onToggleInput($event)"
  text="Enable input">
</kirby-checkbox>
<kirby-form-field #formfield>
  <input kirby-input [size]="size" [disabled]="!inputEnabled" placeholder="Enable to focus (+scroll into view on device)" />
</kirby-form-field>`,
  codeSnippet: `import { FormFieldComponent } from '@kirbydesign/designsystem';
  
export class MyComponent {
  @ViewChild('formfield') private formfield: FormFieldComponent;

  inputEnabled = false;

  onToggleInput(enable: boolean) {
    this.inputEnabled = enable;
    if (!enable) return;
    this.formfield.focus();
  }
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      kirby-checkbox {
        padding-left: 16px;
        padding-right: 4px;
      }
    `,
  ],
})
export class FormFieldFocusExampleComponent {
  @Input() size: InputSize;

  @ViewChild('formfield', { static: true })
  private formfield: FormFieldComponent;

  template: string = config.template;
  codeSnippet: string = config.codeSnippet;
  inputEnabled = false;

  onToggleInput(enable: boolean) {
    this.inputEnabled = enable;
    if (!enable) return;
    this.formfield.focus();
  }
}
