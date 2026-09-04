import { Component } from '@angular/core';
import { ProgressCircleComponent } from '@kirbydesign/designsystem/progress-circle';

const config = {
  selector: 'cookbook-progress-circle-example-content-steps',
  template: `<kirby-progress-circle aria-label="Your investment savings" themeColor="warning" value="50" size="sm" class="kirby-text-xsmall">2/4
</kirby-progress-circle> 

<kirby-progress-circle aria-label="Your investment savings" themeColor="warning" value="50" size="md">2/4
</kirby-progress-circle>

<kirby-progress-circle aria-label="Your investment savings" themeColor="warning" value="50" size="lg">2/4
</kirby-progress-circle>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./progress-circle-examples.shared.scss'],
  imports: [ProgressCircleComponent],
})
export class ProgressCircleExampleContentStepsComponent {
  template: string = config.template;
}
