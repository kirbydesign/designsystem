import { Component, ElementRef, Inject, Input, LOCALE_ID, ViewChild } from '@angular/core';

import { Options } from 'highcharts';
import * as Highcharts from 'highcharts/highstock';
import * as AnnotationsModule from 'highcharts/modules/annotations';

import { annotations, HighstockDataPoint } from './options/highstock-chart-options';

@Component({
  selector: 'kirby-highstock-chart',
  templateUrl: './highstock-chart.component.html',
  styleUrls: ['./highstock-chart.component.scss'],
})
export class HighstockChartComponent {
  private _data: HighstockDataPoint[];
  @Input() set data(val: HighstockDataPoint[]) {
    this.onDataChanges(val);
  }
  get data() {
    return this._data;
  }
  private _options: Options;
  @Input() set options(val: Options) {
    this.onOptionsChanges(val);
  }
  get options() {
    return this._options;
  }
  private _height = 300;
  @Input() set height(height: number) {
    this._height = height;
    if (this.chart) {
      this.chart.setSize(null, height);
    }
  }
  get height() {
    return this._height;
  }
  @Input() description = '';

  @ViewChild('chartContainer', { static: true }) chartContainer: ElementRef;

  chart: Highcharts.Chart;

  constructor(@Inject(LOCALE_ID) private locale: string) {
    // @ts-ignore
    AnnotationsModule(Highcharts);
  }

  onOptionsChanges(options: Options) {
    this._options = options;
    this.chart = Highcharts.stockChart(this.chartContainer.nativeElement, this._options);
  }

  onDataChanges(data: HighstockDataPoint[]) {
    this._data = data;
    if (this.chart != null) {
      // First delete all points in the previous series.
      this.chart.update(
        {
          series: [],
        },
        false,
        false
      );
      // Then update the chart with new series data.
      this.chart.update(
        {
          series: [
            {
              type: 'area',
              data: data,
            },
          ],
        },
        false,
        false
      );
      // Remove the annotations.
      this.chart.removeAnnotation('minmax');
      // Add the new annotations.
      this.chart.addAnnotation(annotations(this.locale), false);
      // And finally redraw the graph with all the changes.
      this.chart.redraw();
    }
  }
}
