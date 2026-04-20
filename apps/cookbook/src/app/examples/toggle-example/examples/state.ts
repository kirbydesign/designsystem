import { Component } from '@angular/core';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const config = {
  selector: 'cookbook-toggle-state-example',
  template: `
    <kirby-toggle slot="end"></kirby-toggle>
    <kirby-toggle checked="true" (checkedChange)="onCheckedChange($event)" slot="end"></kirby-toggle>
    <kirby-toggle disabled="true" slot="end"></kirby-toggle>
`,
};

@Component({
  selector: config.selector,
  styleUrls: ['./toggle-examples.shared.scss'],
  template: config.template,
  imports: [ToggleComponent],
})
export class ToggleStateExampleComponent {
  template = config.template;

  onCheckedChange(checked: boolean) {
    console.log(`Toggle onCheckedChange: ${checked}`);
  }
}
