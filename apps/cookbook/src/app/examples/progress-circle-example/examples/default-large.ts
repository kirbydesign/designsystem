import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-progress-circle-example-default-large',
  template: `<kirby-progress-circle size="lg" value="58" themeColor="warning"></kirby-progress-circle>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ProgressCircleExampleDefaultLargeComponent {
  template: string = config.template;
}
