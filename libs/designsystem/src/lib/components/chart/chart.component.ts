import { Component, OnInit, Input, OnChanges, ElementRef, Inject } from '@angular/core';
import { Options, PlotSeriesDataLabelsOptions, XAxisBreaksOptions } from 'highcharts';

import { ChartHelper } from './chart-helper';
import { ChartType } from './chart-type';
import { DONUT_OPTIONS, DonutOptions } from './options/donut';
import { AREASPLINE_OPTIONS, AreaSplineOptions } from './options/areaspline';
import { TIMESERIES_OPTIONS, TimeSeriesOptions } from './options/timeseries';
import { ACTIVITYGAUGE_OPTIONS, ActivityGaugeOptions } from './options/activitygauge';
import { mergeDeep } from '../../helpers/deep-merge';

@Component({
  selector: 'kirby-chart',
  template: '',
  styleUrls: ['./chart.component.scss'],
  providers: [
    ChartHelper,
    { provide: DONUT_OPTIONS, useValue: DonutOptions },
    { provide: AREASPLINE_OPTIONS, useValue: AreaSplineOptions },
    { provide: TIMESERIES_OPTIONS, useValue: TimeSeriesOptions },
    { provide: ACTIVITYGAUGE_OPTIONS, useValue: ActivityGaugeOptions },
  ],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data = [];
  @Input() breaks: Array<XAxisBreaksOptions> = [];
  @Input() height = 300;
  @Input() type: ChartType = ChartType.PIE;
  @Input() description = '';
  @Input() showDataLabels = true;
  @Input() options: Options = {};
  private _options: Options = {};

  constructor(
    private chartHelper: ChartHelper,
    private hostElement: ElementRef,
    @Inject(DONUT_OPTIONS) public donutOptions: Options,
    @Inject(AREASPLINE_OPTIONS) public areasplineOptions: Options,
    @Inject(TIMESERIES_OPTIONS) public timeSeriesOptions: Options,
    @Inject(ACTIVITYGAUGE_OPTIONS) public activitygaugeOptions: Options
  ) {}

  ngOnInit() {
    this.setupChartType();
    this.updateProperties();
    this.chartHelper.init(this._options, this.hostElement);
  }

  ngOnChanges() {
    this.updateProperties();
    this.chartHelper.updateChart(this._options);
  }

  setupChartType() {
    switch (this.type) {
      case ChartType.DONUT: {
        this._options = this.donutOptions;
        this._options.chart.type = ChartType.PIE;
        this._options.plotOptions.pie.innerSize = '50%';
        break;
      }
      case ChartType.PIE: {
        this._options = this.donutOptions;
        this._options.chart.type = this.type;
        this._options.plotOptions.pie.innerSize = '0%';
        break;
      }
      case ChartType.AREASPLINE: {
        this._options = this.areasplineOptions;
        this._options.chart.type = this.type;
        break;
      }
      case ChartType.TIMESERIES: {
        this._options = this.timeSeriesOptions;
        this._options.chart.type = this.type;
        break;
      }
      case ChartType.ACTIVITYGAUGE: {
        this._options = this.activitygaugeOptions;
        this._options.chart.type = this.type;
        break;
      }
    }
  }

  updateProperties() {
    if (this._options.chart) {
      this._options.chart.height = this.height;
      this._options.accessibility.description = this.description;
      switch (this._options.chart.type) {
        case ChartType.PIE:
          (this._options.plotOptions.pie
            .dataLabels as PlotSeriesDataLabelsOptions).enabled = this.showDataLabels;
        /* falls through */
        case ChartType.DONUT: {
          this._options.series = [
            {
              type: 'pie',
              data: this.data,
            },
          ];
          break;
        }
        case ChartType.AREASPLINE: {
          this._options.series = [
            {
              type: 'areaspline',
              data: this.data,
            },
          ];
          break;
        }
        case ChartType.TIMESERIES: {
          this._options.series = [
            {
              type: 'area',
              data: this.data,
            },
          ];
          this._options.xAxis = {
            ...this._options.xAxis,
            breaks: this.breaks,
          };
          break;
        }
        case ChartType.ACTIVITYGAUGE: {
          const data = this.data[0];

          this._options.title.text = data.title;
          this._options.subtitle.text = data.subtitle;

          if (data.paneBackgroundColor) {
            this._options.pane.background = [
              {
                ...this._options.pane.background[0],
                backgroundColor: data.paneBackgroundColor,
              },
            ];
          }
          if (data.color) {
            this._options.title.style.color = data.color;
            this._options.subtitle.style.color = data.color;
          }
          this._options.series = [
            {
              type: 'solidgauge',
              data: data.series,
            },
          ];

          break;
        }
      }

      this._options = mergeDeep(this._options, this.options);
    }
  }
}
