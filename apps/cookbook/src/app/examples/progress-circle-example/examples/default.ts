import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-progress-circle-example-default',
  template: `<kirby-progress-circle value="33"></kirby-progress-circle>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ProgressCircleExampleDefaultComponent {
  template: string = config.template;
}
