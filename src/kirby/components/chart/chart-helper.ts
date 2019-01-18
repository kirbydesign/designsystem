import { Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import { ElementRef } from '@angular/core';

// Docs on importing accessibility: https://www.highcharts.com/docs/chart-concepts/accessibility
// Reason for .src suffix in exporting: https://github.com/highcharts/highcharts-angular/issues/54
import * as exporting from 'highcharts/modules/exporting.src'; exporting(Highcharts);
import * as exportData from 'highcharts/modules/export-data'; exportData(Highcharts);
import * as accessibility from 'highcharts/modules/accessibility'; accessibility(Highcharts);

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
