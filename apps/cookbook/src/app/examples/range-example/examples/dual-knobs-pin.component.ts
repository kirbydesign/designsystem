import { Component } from '@angular/core';
import { RangeComponent } from '@kirbydesign/designsystem/range';

const config = {
  selector: 'cookbook-range-dual-knobs-pin-example',
  template: `<kirby-range
  [dualKnobs]="true"
  [pin]="true"
  [value]="value"
  minLabel="Min value"
  maxLabel="Max value"
  aria-label="Dual knob range with pin"
  [min]="0"
  [max]="100"
></kirby-range>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [RangeComponent],
})
export class RangeDualKnobsPinExampleComponent {
  template: string = config.template;
  value = { lower: 10, upper: 90 };
}
