import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-states-example',
  template: `<div class="states">
  <kirby-checkbox labelText="Default"></kirby-checkbox>
  <kirby-checkbox checked="true" labelText="Checked"></kirby-checkbox>
  <kirby-checkbox disabled="true" labelText="Disabled"></kirby-checkbox>
  <kirby-checkbox disabled="true" checked="true" labelText="Disabled checked"></kirby-checkbox>
  <kirby-checkbox hasError="true" labelText="Has error"></kirby-checkbox>
</div>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./checkbox-examples.shared.scss'],
})
export class CheckboxStatesExampleComponent {
  template: string = config.template;

  checked1 = true;
  checked2 = false;
  checked3 = false;
}
