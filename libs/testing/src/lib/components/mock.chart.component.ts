import { Component, Input } from '@angular/core';

export enum ChartType {
  PIE = 'pie',
  DONUT = 'donut',
  AREASPLINE = 'areaspline',
  TIMESERIES = 'timeseries',
  ACTIVITYGAUGE = 'activitygauge',
  // SOLIDGAUGE = 'solidgauge',
}

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-chart',
  template: '<ng-content></ng-content>',
})
export class MockChartComponent {
  @Input() data;
  // @Input() breaks: Array<Highcharts.XAxisBreaksOptions>;
  @Input() height;
  @Input() type: ChartType;
  @Input() description;
  @Input() showDataLabels;
}

// #endregion
