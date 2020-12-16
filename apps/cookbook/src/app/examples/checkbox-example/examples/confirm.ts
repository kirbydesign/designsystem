import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-confirm-example',
  template: `<kirby-checkbox attentionLevel="1" [checked]="true" labelText="Confirm terms"></kirby-checkbox>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class CheckboxConfirmExampleComponent {
  template: string = config.template;
}
