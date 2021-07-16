import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ChartDeprecatedExampleComponent } from './chart-deprecated-example.component';
import { ChartExampleActivityGaugeComponent } from './examples/chart-example-activity-gauge.component';
import { ChartExampleAreasplineComponent } from './examples/chart-example-areaspline.component';
import { ChartExampleBarComponent } from './examples/chart-example-bar.component';
import { ChartExampleColumnComponent } from './examples/chart-example-column.component';
import { ChartExampleDonutComponent } from './examples/chart-example-donut.component';
import { ChartExamplePieComponent } from './examples/chart-example-pie.component';
import { ChartExampleTimeseriesComponent } from './examples/chart-example-timeseries.component';

const COMPONENT_DECLARATIONS = [
  ChartDeprecatedExampleComponent,
  ChartExampleActivityGaugeComponent,
  ChartExampleAreasplineComponent,
  ChartExampleDonutComponent,
  ChartExampleColumnComponent,
  ChartExamplePieComponent,
  ChartExampleTimeseriesComponent,
  ChartExampleBarComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
})
export class ChartDeprecatedExampleModule {}
