import { Component } from '@angular/core';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const config = {
  selector: 'cookbook-toggle-default-example',
  template: `<div class="toggle-item-container">
  <div class="toggle-item-inner-container">
    <kirby-toggle></kirby-toggle>
  </div>
    <span class="toggle-item-title">Default</span>
</div>

<div class="toggle-item-container">
  <div class="toggle-item-inner-container">
    <kirby-toggle checked="true" (checkedChange)="onCheckedChange($event)"></kirby-toggle>
  </div>
    <span class="toggle-item-title">Checked</span>
</div>

<div class="toggle-item-container">
  <div class="toggle-item-inner-container">
    <kirby-toggle disabled="true"></kirby-toggle>
  </div>
    <span class="toggle-item-title">Disabled</span>
</div>`,
  htmlSnippet: `<kirby-toggle>Default</kirby-toggle>
<kirby-toggle checked="true" (checkedChange)="onCheckedChange($event)">Checked</kirby-toggle>
<kirby-toggle disabled="true">Disabled</kirby-toggle>`,
};

@Component({
  selector: config.selector,
  styleUrls: ['./toggle-examples.shared.scss'],
  template: config.template,
  imports: [ToggleComponent],
})
export class ToggleDefaultExampleComponent {
  htmlSnippet: string = config.htmlSnippet;

  onCheckedChange(checked: boolean) {
    console.log(`Toggle onCheckedChange: ${checked}`);
  }
}
