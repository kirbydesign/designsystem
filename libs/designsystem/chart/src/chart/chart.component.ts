import { Component, Input } from '@angular/core';

import { BaseChartComponent, ChartDataLabelOptions, ChartJSService, ChartType } from '../shared';

@Component({
  selector: 'kirby-chart',
  templateUrl: '../shared/base-chart/base-chart.component.html',
  styleUrls: ['../shared/base-chart/base-chart.component.scss'],
  providers: [ChartJSService],
})
export class ChartComponent extends BaseChartComponent {
  @Input() type: Exclude<ChartType, 'stock'> = 'column';

  @Input() dataLabelOptions?: ChartDataLabelOptions;

  protected renderChart() {
    super.renderChart({ dataLabelOptions: this.dataLabelOptions });
  }
}
