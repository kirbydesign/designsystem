import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-affix-example',
  template: `
    <kirby-form-field label="Input field with prefix">
      <input kirby-input affix [size]="size" />
    </kirby-form-field>
    <kirby-form-field label="Input field with suffix">
      <input kirby-input affix [size]="size" />
    </kirby-form-field>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputAffixExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
