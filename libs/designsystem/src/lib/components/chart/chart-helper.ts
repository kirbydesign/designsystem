import { Options, chart } from 'highcharts';
import * as Highcharts from 'highcharts';
import { ElementRef } from '@angular/core';

// Docs on importing accessibility: https://www.highcharts.com/docs/chart-concepts/accessibility
import * as exporting from 'highcharts/modules/exporting';
import * as exportData from 'highcharts/modules/export-data';
import * as accessibility from 'highcharts/modules/accessibility';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
require('highcharts/modules/broken-axis')(Highcharts);

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
