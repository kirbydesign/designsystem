import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-range-step-example',
  template: `<kirby-range minLabel="Min value" maxLabel="Max value" ticks="true" max="15" min="1" value="5"></kirby-range>`,
};
@Component({
  selector: config.selector,
  template: config.template,
})
export class RangeStepExampleComponent {
  template: string = config.template;
}
