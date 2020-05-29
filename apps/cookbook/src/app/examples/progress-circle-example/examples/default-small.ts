import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-progress-circle-example-default-small',
  template: `<kirby-progress-circle size="sm" value="33"></kirby-progress-circle>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ProgressCircleExampleDefaultSmallComponent {
  template: string = config.template;
}
