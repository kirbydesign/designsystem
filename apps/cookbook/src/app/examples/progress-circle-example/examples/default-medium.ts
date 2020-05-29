import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-progress-circle-example-default-medium',
  template: `<kirby-progress-circle value="33" themeColor="warning"></kirby-progress-circle>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ProgressCircleExampleDefaultMediumComponent {
  template: string = config.template;
}
