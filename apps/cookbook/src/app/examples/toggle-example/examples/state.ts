import { Component } from '@angular/core';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const config = {
  selector: 'cookbook-toggle-state-example',
  template: `<kirby-toggle aria-label="Default toggle"></kirby-toggle>
<kirby-toggle checked="true" aria-label="Checked toggle"></kirby-toggle>
<kirby-toggle disabled="true" aria-label="Disabled toggle"></kirby-toggle>
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
}
