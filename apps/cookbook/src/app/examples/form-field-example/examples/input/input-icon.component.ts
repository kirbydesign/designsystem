import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-icon-example',
  template: `
<kirby-form-field label="Input with Icon"  message="This is additional info that will be shown below the input">
  <input type="text" kirby-input [size]="size" placeholder="Write something or Click Icon for Action "/>
  <kirby-input-icon icon="attach"  (click)="onClick($event)"></kirby-input-icon>
</kirby-form-field>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputIconExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
  public onClick($event: any): void {
    console.log('onClick cookbook-form-field-input-icon-example', $event);
  }
}
