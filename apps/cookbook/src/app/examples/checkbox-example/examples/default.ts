import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-default-example',
  template: `<kirby-checkbox [checked]="true" labelText="Checkbox 1"></kirby-checkbox>
<kirby-checkbox checked="false" labelText="Checkbox 2"></kirby-checkbox>
<kirby-checkbox checked="false" labelText="Checkbox 3"></kirby-checkbox>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./checkbox-examples.shared.scss'],
})
export class CheckboxDefaultExampleComponent {
  template: string = config.template;
}
