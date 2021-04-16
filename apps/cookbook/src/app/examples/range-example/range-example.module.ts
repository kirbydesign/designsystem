import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';

import { RangeDefaultExampleComponent } from './examples/default.component';
import { RangeDisabledFormExampleComponent } from './examples/disabled.component';
import { RangePinExampleComponent } from './examples/pin.component';
import { RangeStepExampleComponent } from './examples/step.component';
import { RangeExampleComponent } from './range-example.component';

const COMPONENT_DECLARATIONS = [
  RangeExampleComponent,
  RangeDefaultExampleComponent,
  RangeStepExampleComponent,
  RangePinExampleComponent,
  RangeDisabledFormExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule, ReactiveFormsModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class RangeExampleModule {}
