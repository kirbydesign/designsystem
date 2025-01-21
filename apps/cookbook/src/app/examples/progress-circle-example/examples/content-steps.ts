import { Component } from '@angular/core';
import { ProgressCircleComponent } from '@kirbydesign/designsystem/progress-circle';

const config = {
  selector: 'cookbook-progress-circle-example-content-steps',
  template: `<kirby-progress-circle themeColor="warning" value="50" size="sm" class="kirby-text-xsmall">
  2/4
</kirby-progress-circle>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ProgressCircleComponent],
})
export class ProgressCircleExampleContentStepsComponent {
  template: string = config.template;
}
