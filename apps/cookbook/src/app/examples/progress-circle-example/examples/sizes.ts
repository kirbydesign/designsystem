import { Component } from '@angular/core';
import { ProgressCircleComponent } from '@kirbydesign/designsystem/progress-circle';

const config = {
  selector: 'cookbook-progress-circle-example-sizes',
  template: `<kirby-progress-circle size="sm" aria-label="Your investment savings" value="25" themeColor="danger"><p>sm</p></kirby-progress-circle>
<kirby-progress-circle size="md" aria-label="Your investment savings" value="50" themeColor="warning"><p>md</p></kirby-progress-circle>
<kirby-progress-circle size="lg" aria-label="Your investment savings" value="75" themeColor="success"><p>lg</p></kirby-progress-circle>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./progress-circle-examples.shared.scss'],
  imports: [ProgressCircleComponent],
})
export class ProgressCircleExampleSizesComponent {
  template: string = config.template;
}
