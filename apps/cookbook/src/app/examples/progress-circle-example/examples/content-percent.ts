import { Component } from '@angular/core';
import { ProgressCircleComponent } from '@kirbydesign/designsystem/progress-circle';

const config = {
  selector: 'cookbook-progress-circle-example-content-percent',
  template: `<kirby-progress-circle value="33" size="lg">33%</kirby-progress-circle>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ProgressCircleComponent],
})
export class ProgressCircleExampleContentPercentComponent {
  template: string = config.template;
}
