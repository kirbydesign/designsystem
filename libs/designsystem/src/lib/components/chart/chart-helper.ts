import { ElementRef, Injectable } from '@angular/core';
import { chart, Options } from 'highcharts';
import * as Highcharts from 'highcharts';

// Docs on importing accessibility: https://www.highcharts.com/docs/chart-concepts/accessibility

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
require('highcharts/modules/broken-axis')(Highcharts);

@Injectable()
export class ChartHelper {
  chartContainer: ElementRef;

  public init(chartContainer: ElementRef) {
    this.chartContainer = chartContainer;
  }

  public renderChart(options: Options) {
    if (this.chartContainer && options.chart) {
      chart(this.chartContainer.nativeElement, options);
    }
  }
}
