import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartExampleAreasplineComponent } from './examples/chart-example-areaspline.component';
import { ChartExampleActivityGaugeComponent } from './examples/chart-example-activity-gauge.component';
import { ChartExampleDonutComponent } from './examples/chart-example-donut.component';
import { ChartExampleMonthlyOverviewComponent } from './examples/chart-example-monthly-overview.component';
import { ChartExamplePieComponent } from './examples/chart-example-pie.component';
import { ChartExampleTimeseriesComponent } from './examples/chart-example-timeseries.component';
import { ChartExampleYearlyOverviewComponent } from './examples/chart-example-yearly-overview.component';
import { ChartExampleComponent } from './chart-example.component';
import { KirbyModule } from '@kirbydesign/designsystem';

const DECLARATIONS = [
  ChartExampleComponent,
  ChartExampleActivityGaugeComponent,
  ChartExampleAreasplineComponent,
  ChartExampleDonutComponent,
  ChartExampleMonthlyOverviewComponent,
  ChartExamplePieComponent,
  ChartExampleTimeseriesComponent,
  ChartExampleYearlyOverviewComponent,
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule, KirbyModule],
  exports: DECLARATIONS,
  providers: [],
})
export class ChartExampleModule {}
