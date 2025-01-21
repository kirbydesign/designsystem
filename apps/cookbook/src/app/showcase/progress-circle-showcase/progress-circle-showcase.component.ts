import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { ProgressCircleExampleDefaultComponent } from '../../examples/progress-circle-example/examples/default';
import { ProgressCircleExampleSizesComponent } from '../../examples/progress-circle-example/examples/sizes';
import { ProgressCircleExampleContentStepsComponent } from '../../examples/progress-circle-example/examples/content-steps';
import { ProgressCircleExampleContentAvatarComponent } from '../../examples/progress-circle-example/examples/avatar';
import { ProgressCircleExampleContentPercentComponent } from '../../examples/progress-circle-example/examples/content-percent';
import { ProgressCircleExampleAnimatedComponent } from '../../examples/progress-circle-example/examples/animated';
import { ProgressCircleExampleCardComponent } from '../../examples/progress-circle-example/examples/card';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-progress-circle-showcase',
  templateUrl: './progress-circle-showcase.component.html',
  styleUrls: ['./progress-circle-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    ProgressCircleExampleDefaultComponent,
    ProgressCircleExampleSizesComponent,
    ProgressCircleExampleContentStepsComponent,
    ProgressCircleExampleContentAvatarComponent,
    ProgressCircleExampleContentPercentComponent,
    ProgressCircleExampleAnimatedComponent,
    ProgressCircleExampleCardComponent,
    ApiDescriptionPropertiesComponent,
  ],
})
export class ProgressCircleShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'value',
      description: 'Sets the progress percentage',
      defaultValue: '0',
      type: ['[0 - 100]'],
    },
    {
      name: 'size',
      description: 'Sets the size of the circle',
      defaultValue: 'md',
      type: ['sm', 'md', 'lg'],
    },
    {
      name: 'themeColor',
      description: 'The color of the progress stroke',
      defaultValue: 'success',
      type: ['success', 'warning', 'danger'],
    },
  ];
}
