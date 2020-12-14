import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-states-example',
  template: `<div class="states">
  <kirby-label>
    <kirby-checkbox [checked]="checked1"></kirby-checkbox>
    Checked
  </kirby-label>
  <kirby-label>
    <kirby-checkbox [checked]="checked2"></kirby-checkbox>
    Not checked
  </kirby-label>
  <kirby-label>
    <kirby-checkbox [checked]="checked3" [hasError]="true"></kirby-checkbox>
    Has error
  </kirby-label>
  <kirby-label>
    <kirby-checkbox disabled="true"></kirby-checkbox>
    Disabled
  </kirby-label>
  <kirby-label>
    <kirby-checkbox checked="true" disabled="true"></kirby-checkbox>
    Disabled checked
  </kirby-label>
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
