import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ChartDeprecatedExampleComponent } from './chart-deprecated-example.component';
import { ChartDeprecatedExampleActivityGaugeComponent } from './examples/chart-deprecated-example-activity-gauge.component';
import { ChartDeprecatedExampleAreasplineComponent } from './examples/chart-deprecated-example-areaspline.component';
import { ChartDeprecatedExampleBarComponent } from './examples/chart-deprecated-example-bar.component';
import { ChartDeprecatedExampleColumnComponent } from './examples/chart-deprecated-example-column.component';
import { ChartDeprecatedExampleDonutComponent } from './examples/chart-deprecated-example-donut.component';
import { ChartDeprecatedExamplePieComponent } from './examples/chart-deprecated-example-pie.component';
import { ChartDeprecatedExampleTimeseriesComponent } from './examples/chart-deprecated-example-timeseries.component';

const COMPONENT_DECLARATIONS = [
  ChartDeprecatedExampleComponent,
  ChartDeprecatedExampleActivityGaugeComponent,
  ChartDeprecatedExampleAreasplineComponent,
  ChartDeprecatedExampleDonutComponent,
  ChartDeprecatedExampleColumnComponent,
  ChartDeprecatedExamplePieComponent,
  ChartDeprecatedExampleTimeseriesComponent,
  ChartDeprecatedExampleBarComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
})
export class ChartDeprecatedExampleModule {}
