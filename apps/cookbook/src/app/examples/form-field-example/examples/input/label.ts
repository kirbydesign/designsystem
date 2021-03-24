import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-label-example',
  template: `<kirby-form-field label="Input with label">
  <input kirby-input [size]="size" />
</kirby-form-field>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputLabelExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
