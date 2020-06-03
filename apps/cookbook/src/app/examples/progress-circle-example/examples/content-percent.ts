import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-progress-circle-example-content-percent',
  template: `<kirby-progress-circle value="33" size="lg">33%</kirby-progress-circle>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ProgressCircleExampleContentPercentComponent {
  template: string = config.template;
}
