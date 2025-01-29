import { Component, Input } from '@angular/core';

import { BaseChartComponent, ChartDataLabelOptions, ChartJSService } from '../shared';

import { StockChartJSService } from './stock-chart-js.service';

@Component({
  selector: 'kirby-stock-chart',
  providers: [{ provide: ChartJSService, useClass: StockChartJSService }],
  templateUrl: '../shared/base-chart/base-chart.component.html',
  styleUrls: ['../shared/base-chart/base-chart.component.scss'],
  standalone: false,
})
export class StockChartComponent extends BaseChartComponent {
  @Input() dataLabelOptions?: ChartDataLabelOptions;

  readonly type = 'stock';

  protected renderChart() {
    super.renderChart({ dataLabelOptions: this.dataLabelOptions });
  }
}
