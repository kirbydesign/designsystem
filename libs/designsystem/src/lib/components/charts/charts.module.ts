import { NgModule } from '@angular/core';

import { StockChartComponent } from '../stock-chart/stock-chart.component';

import { ChartComponent } from './chart';
import { ChartConfigService } from './shared/base-chart';

@NgModule({
  declarations: [ChartComponent, StockChartComponent],
  exports: [ChartComponent, StockChartComponent],
  providers: [ChartConfigService],
})
export class ChartsModule {}
