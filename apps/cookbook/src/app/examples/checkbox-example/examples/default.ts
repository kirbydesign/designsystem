import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-default-example',
  template: `<kirby-label>
  <kirby-checkbox [checked]="checked1"></kirby-checkbox>
  Checkbox 1
</kirby-label>
<kirby-label>
  <kirby-checkbox [checked]="checked2"></kirby-checkbox>
  Checkbox 2
</kirby-label>
<kirby-label>
  <kirby-checkbox [checked]="checked3"></kirby-checkbox>
  Checkbox 3
</kirby-label>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./checkbox-examples.shared.scss'],
})
export class CheckboxDefaultExampleComponent {
  template: string = config.template;

  checked1 = true;
  checked2 = false;
  checked3 = false;
}
