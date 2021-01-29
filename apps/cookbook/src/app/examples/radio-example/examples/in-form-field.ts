import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-radio-in-form-field-example',
  template: `<kirby-form-field label="Label for radio group in form field" message="This is a message">
  <kirby-radio-group [items]="['Bacon', 'Salami', 'Tenderloin']"></kirby-radio-group>
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class RadioInFormFieldExampleComponent {
  template: string = config.template;
}
