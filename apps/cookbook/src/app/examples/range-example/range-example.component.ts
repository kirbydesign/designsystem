import { Component } from '@angular/core';
import { RangeDefaultExampleComponent } from './examples/default.component';
import { RangeStepExampleComponent } from './examples/step.component';
import { RangeDisabledFormExampleComponent } from './examples/disabled.component';

@Component({
  selector: 'cookbook-range-example',
  templateUrl: './range-example.component.html',
  styleUrls: ['./range-example.component.scss'],
  imports: [
    RangeDefaultExampleComponent,
    RangeStepExampleComponent,
    RangeDisabledFormExampleComponent,
  ],
})
export class RangeExampleComponent {}
