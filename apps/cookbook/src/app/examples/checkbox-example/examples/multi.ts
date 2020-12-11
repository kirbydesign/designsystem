import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-multi-example',
  template: `<kirby-label>
  <kirby-checkbox type="multi" [checked]="multi1checked"></kirby-checkbox>
  Checked
</kirby-label>
<kirby-label>
  <kirby-checkbox type="multi" [checked]="multi2checked"></kirby-checkbox>
  Not checked
</kirby-label>
<kirby-label>
  <kirby-checkbox type="multi" [checked]="multi3checked" [error]="true"></kirby-checkbox>
  Error
</kirby-label>
<kirby-label>
  <kirby-checkbox type="multi" disabled="true"></kirby-checkbox>
  Disabled
</kirby-label>
<kirby-label>
  <kirby-checkbox type="multi" checked="true" disabled="true"></kirby-checkbox>
  Disabled checked
</kirby-label>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./checkbox-examples.shared.scss'],
})
export class CheckboxMultiExampleComponent {
  template: string = config.template;

  multi1checked = true;
  multi2checked = false;
  multi3checked = false;
}
