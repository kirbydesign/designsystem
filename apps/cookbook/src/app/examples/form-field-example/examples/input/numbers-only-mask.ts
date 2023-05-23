import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-numbers-only-mask-example',
  template: `<kirby-form-field label="Numbers only mask input">
  <input type="number" kirby-input kirby-numbers-only-mask [size]="size"/>
</kirby-form-field>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputNumbersOnlyMaskExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
