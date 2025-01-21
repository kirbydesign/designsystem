import { Component } from '@angular/core';
import { RangeComponent } from '@kirbydesign/designsystem/range';

const config = {
  selector: 'cookbook-range-disabled-form-example',
  template: `<kirby-range disabled minLabel="Min value" maxLabel="Max value" max="15" min="1"></kirby-range>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [RangeComponent],
})
export class RangeDisabledFormExampleComponent {
  template: string = config.template;
}
