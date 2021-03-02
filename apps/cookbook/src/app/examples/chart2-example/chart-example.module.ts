import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartExampleLine3Component } from '~/app/examples/chart2-example/examples/chart-example-line-3.component';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ChartExampleComponent } from './chart-example.component';
import { ChartExampleAreaLine1Component } from './examples/chart-example-areaspline-1.component';
import { ChartExampleBar1Component } from './examples/chart-example-bar-1.component';
import { ChartExampleBar2Component } from './examples/chart-example-bar-2.component';
import { ChartExampleBar3Component } from './examples/chart-example-bar-3.component';
import { ChartExampleDoughnut1Component } from './examples/chart-example-doughnut-1.component';
import { ChartExampleHorizontalBarComponent } from './examples/chart-example-horizontal-bar.component';
import { ChartExampleLine1Component } from './examples/chart-example-line-1.component';
import { ChartExampleLine2Component } from './examples/chart-example-line-2.component';
import { ChartExamplePie1Component } from './examples/chart-example-pie-1.component';
import { ChartExampleTimeseries1Component } from './examples/chart-example-timeseries-1.component';
import { ChartExampleTimeseries2Component } from './examples/chart-example-timeseries-2.component';

const COMPONENT_DECLARATIONS = [
  ChartExampleComponent,
  ChartExampleBar1Component,
  ChartExampleBar2Component,
  ChartExampleBar3Component,
  ChartExamplePie1Component,
  ChartExampleHorizontalBarComponent,
  ChartExampleDoughnut1Component,
  ChartExampleLine1Component,
  ChartExampleLine2Component,
  ChartExampleLine3Component,
  ChartExampleAreaLine1Component,
  ChartExampleTimeseries1Component,
  ChartExampleTimeseries2Component,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
})
export class Chart2ExampleModule {}
