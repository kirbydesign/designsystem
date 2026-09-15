import { Component } from '@angular/core';
import { RangeDefaultExampleComponent } from './examples/default.component';
import { RangeStepExampleComponent } from './examples/step.component';
import { RangeDisabledFormExampleComponent } from './examples/disabled.component';
import { RangeDualKnobsExampleComponent } from './examples/dual-knobs.component';
import { RangeDualKnobsPinExampleComponent } from './examples/dual-knobs-pin.component';

@Component({
  selector: 'cookbook-range-example',
  templateUrl: './range-example.component.html',
  imports: [
    RangeDefaultExampleComponent,
    RangeStepExampleComponent,
    RangeDisabledFormExampleComponent,
    RangeDualKnobsExampleComponent,
    RangeDualKnobsPinExampleComponent,
  ],
})
export class RangeExampleComponent {}
