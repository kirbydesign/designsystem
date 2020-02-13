import { Options } from 'highcharts';
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
    Highcharts.chart(this.chartContainer.nativeElement, options);
  }
}
