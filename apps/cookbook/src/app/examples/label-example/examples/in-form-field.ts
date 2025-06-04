import { Component } from '@angular/core';
import { FormFieldModule } from '@kirbydesign/designsystem/form-field';
import { RadioModule } from '@kirbydesign/designsystem/radio';

const config = {
  selector: 'cookbook-radio-in-form-field-example',
  template: `<kirby-form-field label="Label for radio group in form field" message="This is a message">
  <kirby-radio-group [items]="['Bacon', 'Salami', 'Tenderloin']"></kirby-radio-group>
</kirby-form-field>

<kirby-form-field label="Label for radio group with error" message="This is an error message">
  <kirby-radio-group #meat [hasError]="true" (valueChange)="meat.hasError = false" [items]="['Bacon', 'Salami', 'Tenderloin']"></kirby-radio-group>
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      :host {
        display: flex;
      }

      kirby-form-field:not(:last-of-type) {
        margin-right: 40px;
      }
    `,
  ],
  imports: [FormFieldModule, RadioModule],
})
export class RadioInFormFieldExampleComponent {
  template: string = config.template;
}
