import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-checkbox-single-example',
  template: `
<kirby-label>
  <kirby-checkbox [checked]="single1checked"></kirby-checkbox>
  Checked
</kirby-label>
<kirby-label>
  <kirby-checkbox [checked]="single2checked"></kirby-checkbox>
  Not checked
</kirby-label>
<kirby-label>
  <kirby-checkbox [checked]="single3checked" [error]="true"></kirby-checkbox>
  Error
</kirby-label>
<kirby-label>
  <kirby-checkbox disabled="true"></kirby-checkbox>
  Disabled
</kirby-label>
<kirby-label>
  <kirby-checkbox checked="true" disabled="true"></kirby-checkbox>
  Disabled checked
</kirby-label>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./checkbox-examples.shared.scss'],
})
export class CheckboxSingleExampleComponent {
  template: string = config.template.trim();

  single1checked = true;
  single2checked = false;
  single3checked = false;
}
