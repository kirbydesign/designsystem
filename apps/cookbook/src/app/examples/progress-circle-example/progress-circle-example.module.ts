import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ProgressCircleExampleDefaultComponent } from './examples/default';
import { ProgressCircleExampleSizesComponent } from './examples/sizes';
import { ProgressCircleExampleContentStepsComponent } from './examples/content-steps';
import { ProgressCircleExampleContentIconComponent } from './examples/content-icon';
import { ProgressCircleExampleContentPercentComponent } from './examples/content-percent';
import { ProgressCircleExampleAnimatedComponent } from './examples/animated';
import { ProgressCircleExampleCardComponent } from './examples/card';

const COMPONENT_DECLARATIONS = [
  ProgressCircleExampleDefaultComponent,
  ProgressCircleExampleSizesComponent,
  ProgressCircleExampleContentStepsComponent,
  ProgressCircleExampleContentIconComponent,
  ProgressCircleExampleContentPercentComponent,
  ProgressCircleExampleAnimatedComponent,
  ProgressCircleExampleCardComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ProgressCircleExampleModule {}
