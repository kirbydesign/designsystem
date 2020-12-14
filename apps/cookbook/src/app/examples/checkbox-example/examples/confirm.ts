import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-confirm-example',
  template: `<kirby-label>
  <kirby-checkbox attentionLevel="1" [checked]="checked1"></kirby-checkbox>
  Confirm terms
</kirby-label>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./checkbox-examples.shared.scss'],
})
export class CheckboxConfirmExampleComponent {
  template: string = config.template;

  checked1 = true;
}
