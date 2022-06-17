import { NgModule } from '@angular/core';

import { StockChartComponent } from '../stock-chart/stock-chart.component';

import { ChartComponent } from './chart.component';
import { ChartConfigService } from './configs/chart-config.service';

@NgModule({
  declarations: [ChartComponent, StockChartComponent],
  exports: [ChartComponent, StockChartComponent],
  providers: [ChartConfigService],
})
export class ChartModule {}
