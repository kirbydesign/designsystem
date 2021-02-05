import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-input-icon-example',
  template: `
<kirby-form-field label="Input with Icon">
  <input type="text" kirby-input placeholder="Write something or Click Icon for Action "/>
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

  public onClick($event: any): void {
    console.log('onClick cookbook-form-field-input-icon-example', $event);
  }
}
