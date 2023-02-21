import { NgModule } from '@angular/core';

import { ChartComponent } from './chart';
import { ChartConfigService } from './shared';
import { StockChartComponent } from './stock-chart';

@NgModule({
  declarations: [ChartComponent, StockChartComponent],
  exports: [ChartComponent, StockChartComponent],
  providers: [ChartConfigService],
})
export class ChartsModule {}
