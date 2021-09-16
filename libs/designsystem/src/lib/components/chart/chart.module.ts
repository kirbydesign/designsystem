import { NgModule } from '@angular/core';

import { ChartComponent } from './chart.component';
import { ChartConfigService } from './configs/chart-config.service';

@NgModule({
  declarations: [ChartComponent],
  exports: [ChartComponent],
  providers: [ChartConfigService],
})
export class ChartModule {}
