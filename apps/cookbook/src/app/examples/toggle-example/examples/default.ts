import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-toggle-default-example',
  template: `<kirby-toggle>Default</kirby-toggle>
<kirby-toggle checked="true" (checkedChange)="onCheckedChange($event)">Checked</kirby-toggle>
<kirby-toggle disabled="true">Disabled</kirby-toggle>`,
};

@Component({
  selector: config.selector,
  styleUrls: ['../toggle-example.component.scss'],
  template: config.template,
})
export class ToggleDefaultExampleComponent {
  template = config.template;

  onCheckedChange(checked: boolean) {
    console.log(`Toggle onCheckedChange: ${checked}`);
  }
}
