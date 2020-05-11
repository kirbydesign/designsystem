import { Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import { ElementRef } from '@angular/core';

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
