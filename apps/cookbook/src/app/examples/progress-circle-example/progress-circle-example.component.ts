import { Component } from '@angular/core';
import { ProgressCircleExampleDefaultComponent } from './examples/default';
import { ProgressCircleExampleSizesComponent } from './examples/sizes';
import { ProgressCircleExampleContentStepsComponent } from './examples/content-steps';
import { ProgressCircleExampleContentAvatarComponent } from './examples/avatar';
import { ProgressCircleExampleContentPercentComponent } from './examples/content-percent';
import { ProgressCircleExampleAnimatedComponent } from './examples/animated';
import { ProgressCircleExampleCardComponent } from './examples/card';

@Component({
  selector: 'cookbook-progress-circle-example',
  templateUrl: './progress-circle-example.component.html',
  styleUrls: ['./progress-circle-example.component.scss'],
  imports: [
    ProgressCircleExampleDefaultComponent,
    ProgressCircleExampleSizesComponent,
    ProgressCircleExampleContentStepsComponent,
    ProgressCircleExampleContentAvatarComponent,
    ProgressCircleExampleContentPercentComponent,
    ProgressCircleExampleAnimatedComponent,
    ProgressCircleExampleCardComponent,
  ],
})
export class ProgressCircleExampleComponent {}
