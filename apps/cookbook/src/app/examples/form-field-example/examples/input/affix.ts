import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-affix-example',
  template: `
    <kirby-form-field label="Input field with prefix">
      <input kirby-input affix prefix="+45" [size]="size" />
    </kirby-form-field>
    <kirby-form-field label="Input field with suffix">
      <input kirby-input kirby-decimal-mask type="number" affix suffix="DKK" [size]="size" />
    </kirby-form-field>
    <kirby-form-field label="Use a custom template">
      <input kirby-input affix [prefix]="spinner" [size]="size" />
    </kirby-form-field>
    <kirby-form-field label="Also works with a date mask">
      <input kirby-input type="date" affix prefix="Hello" [size]="size" />
    </kirby-form-field>

    <!-- templates for example -->
    <ng-template #spinner>
      <kirby-spinner></kirby-spinner>
    </ng-template>
    <ng-template #withContext let-config="config">
    {{config.date | date: 'hh:mm'}}
    </ng-template>
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
