import { Component } from '@angular/core';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';

const config = {
  selector: 'cookbook-checkbox-default-example',
  template: `<kirby-checkbox [checked]="true" text="Checkbox 1"></kirby-checkbox>
<kirby-checkbox [checked]="false" text="Checkbox 2"></kirby-checkbox>
<kirby-checkbox [checked]="false" text="Checkbox 3"></kirby-checkbox>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [CheckboxComponent],
})
export class CheckboxDefaultExampleComponent {
  template: string = config.template;
}
