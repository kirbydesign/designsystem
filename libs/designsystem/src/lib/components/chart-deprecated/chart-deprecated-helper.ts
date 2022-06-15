import { ElementRef, Injectable } from '@angular/core';
import { chart, Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import brokenAxis from 'highcharts/modules/broken-axis';
import solidGauge from 'highcharts/modules/solid-gauge';

// Docs on importing accessibility: https://www.highcharts.com/docs/chart-concepts/accessibility

more(Highcharts);
solidGauge(Highcharts);
brokenAxis(Highcharts);

@Injectable()
export class ChartDeprecatedHelper {
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
