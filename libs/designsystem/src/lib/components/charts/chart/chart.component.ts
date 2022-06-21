import { Component, Input } from '@angular/core';

import { BaseChartComponent, ChartJSService, ChartType } from '../shared';

@Component({
  selector: 'kirby-chart',
  templateUrl: '../shared/base-chart/base-chart.component.html',
  styleUrls: ['../shared/base-chart/base-chart.component.scss'],
  providers: [ChartJSService],
})
export class ChartComponent extends BaseChartComponent {
  @Input() type: Exclude<ChartType, 'stock'> = 'column';
}
