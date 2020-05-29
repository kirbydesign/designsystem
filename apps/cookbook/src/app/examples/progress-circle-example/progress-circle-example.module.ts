import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ProgressCircleExampleDefaultMediumComponent } from './examples/default-medium';
import { ProgressCircleExampleContentStepsComponent } from './examples/content-steps';
import { ProgressCircleExampleContentIconComponent } from './examples/content-icon';
import { ProgressCircleExampleContentPercentComponent } from './examples/content-percent';
import { ProgressCircleExampleAnimatedComponent } from './examples/animated';
import { ProgressCircleExampleCardComponent } from './examples/card';
import { ProgressCircleExampleDefaultLargeComponent } from './examples/default-large';
import { ProgressCircleExampleDefaultSmallComponent } from './examples/default-small';

const COMPONENT_DECLARATIONS = [
  ProgressCircleExampleDefaultSmallComponent,
  ProgressCircleExampleDefaultMediumComponent,
  ProgressCircleExampleDefaultLargeComponent,
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
