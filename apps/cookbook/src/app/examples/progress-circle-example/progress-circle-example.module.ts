import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ProgressCircleExampleDefaultComponent } from './examples/default';
import { ProgressCircleExampleContentStepsComponent } from './examples/content-steps';
import { ProgressCircleExampleContentIconComponent } from './examples/content-icon';
import { ProgressCircleExampleContentPercentComponent } from './examples/content-percent';
import { ProgressCircleExampleAnimatedComponent } from './examples/animated';
import { ProgressCircleExampleCardComponent } from './examples/card';
import { ProgressCircleExampleDefaultLargeComponent } from './examples/default-large';

const COMPONENT_DECLARATIONS = [
  ProgressCircleExampleDefaultComponent,
  ProgressCircleExampleDefaultLargeComponent,
  ProgressCircleExampleContentStepsComponent,
  ProgressCircleExampleContentIconComponent,
  ProgressCircleExampleContentPercentComponent,
  ProgressCircleExampleAnimatedComponent,
  ProgressCircleExampleCardComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule, ReactiveFormsModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ProgressCircleExampleModule {}
