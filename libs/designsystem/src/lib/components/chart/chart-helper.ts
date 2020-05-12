import { Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import { ElementRef } from '@angular/core';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
require('highcharts/modules/broken-axis')(Highcharts);

export class ChartHelper {
  chartContainer: ElementRef;

  public init(options: Options, chartContainer: ElementRef) {
    this.chartContainer = chartContainer;
    this.renderChart(options);
  }

  public updateChart(options: Options) {
    if (options.chart) {
      this.renderChart(options);
    }
  }

  private renderChart(options: Options) {
    if (this.chartContainer) {
      Highcharts.chart(this.chartContainer.nativeElement, options);
    }
  }
}
