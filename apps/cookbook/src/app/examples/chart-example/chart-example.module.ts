import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ChartExampleAreasplineComponent } from './examples/chart-example-areaspline.component';
import { ChartExampleActivityGaugeComponent } from './examples/chart-example-activity-gauge.component';
import { ChartExampleDonutComponent } from './examples/chart-example-donut.component';
import { ChartExampleColumnComponent } from './examples/chart-example-column.component';
import { ChartExamplePieComponent } from './examples/chart-example-pie.component';
import { ChartExampleTimeseriesComponent } from './examples/chart-example-timeseries.component';
import { ChartExampleBarComponent } from './examples/chart-example-bar.component';
import { ChartExampleComponent } from './chart-example.component';

const COMPONENT_DECLARATIONS = [
  ChartExampleComponent,
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
export class ChartExampleModule {}
