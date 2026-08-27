import { Component } from '@angular/core';
import { RangeComponent } from '@kirbydesign/designsystem/range';

const config = {
  selector: 'cookbook-range-dual-knobs-example',
  template: `<kirby-range
  [dualKnobs]="true"
  [value]="value"
  minLabel="Min value"
  maxLabel="Max value"
  aria-label="Dual knob range"
  [min]="0"
  [max]="100"
></kirby-range>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [RangeComponent],
})
export class RangeDualKnobsExampleComponent {
  template: string = config.template;
  value = { lower: 20, upper: 80 };
}
