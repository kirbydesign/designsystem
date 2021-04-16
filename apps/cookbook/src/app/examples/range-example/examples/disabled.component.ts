import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-range-disabled-form-example',
  template: `<kirby-range disabled minLabel="Min value" maxLabel="Max value" ticks="true" pin="true" max="15" min="1"></kirby-range>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class RangeDisabledFormExampleComponent {
  template: string = config.template;
}
