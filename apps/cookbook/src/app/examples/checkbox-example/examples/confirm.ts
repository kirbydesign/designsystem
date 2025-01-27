import { Component } from '@angular/core';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';

const config = {
  selector: 'cookbook-checkbox-confirm-example',
  template: `<kirby-checkbox attentionLevel="1" [checked]="true" text="Confirm terms"></kirby-checkbox>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [CheckboxComponent],
})
export class CheckboxConfirmExampleComponent {
  template: string = config.template;
}
