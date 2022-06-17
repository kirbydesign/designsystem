import { Component, Input } from '@angular/core';

import { ChartDataLabelOptions } from '../chart';
import { ChartJSService } from '../chart/chart-js/chart-js.service';
import { BaseChartComponent } from '../chart/chart.component';

/* 
TODO: Find a better way to share decorator settings
*/
@Component({
  selector: 'kirby-stock-chart',
  providers: [ChartJSService],
  templateUrl: '../chart/chart.component.html',
  styleUrls: ['../chart/chart.component.scss'],
})
export class StockChartComponent extends BaseChartComponent {
  @Input() dataLabelOptions?: ChartDataLabelOptions;

  readonly type = 'stock';

  protected renderChart() {
    super.renderChart({ type: this.type, dataLabelOptions: this.dataLabelOptions });
  }
}
