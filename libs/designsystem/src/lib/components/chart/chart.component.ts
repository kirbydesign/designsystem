import { Component, OnInit, Input, OnChanges, ElementRef, Inject } from '@angular/core';
import { Options, PlotSeriesDataLabelsOptions, XAxisBreaksOptions, XAxisOptions } from 'highcharts';

import { ChartHelper } from './chart-helper';
import { ChartType } from './chart-type';
import { DONUT_OPTIONS, DonutOptions } from './options/donut';
import { AREASPLINE_OPTIONS, AreaSplineOptions } from './options/areaspline';
import { TIMESERIES_OPTIONS, TimeSeriesOptions } from './options/timeseries';
import { ACTIVITYGAUGE_OPTIONS, ActivityGaugeOptions } from './options/activitygauge';
import { mergeDeep } from '../../helpers/deep-merge';
import { getColumnOptions } from './options/column';
import { getBarOptions } from './options/bar';

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
  @Input() categories: string[] = [];
  @Input() breaks: Array<XAxisBreaksOptions> = [];
  @Input() height = 300;
  @Input() type: ChartType = ChartType.PIE;
  @Input() description = '';
  @Input() showDataLabels = true;
  @Input() options: Options;
  mergedOptions: Options = {
    accessibility: {},
  };

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
    this.chartHelper.init(this.mergedOptions, this.hostElement);
  }

  ngOnChanges() {
    this.updateProperties();
    this.chartHelper.updateChart(this.mergedOptions);
  }

  setupChartType() {
    switch (this.type) {
      case ChartType.DONUT: {
        this.mergedOptions = this.donutOptions;
        this.mergedOptions.chart.type = ChartType.PIE;
        this.mergedOptions.plotOptions.pie.innerSize = '50%';
        break;
      }
      case ChartType.PIE: {
        this.mergedOptions = this.donutOptions;
        this.mergedOptions.chart.type = this.type;
        this.mergedOptions.plotOptions.pie.innerSize = '0%';
        break;
      }
      case ChartType.AREASPLINE: {
        this.mergedOptions = this.areasplineOptions;
        this.mergedOptions.chart.type = this.type;
        break;
      }
      case ChartType.TIMESERIES: {
        this.mergedOptions = this.timeSeriesOptions;
        this.mergedOptions.chart.type = this.type;
        break;
      }
      case ChartType.ACTIVITYGAUGE: {
        this.mergedOptions = this.activitygaugeOptions;
        this.mergedOptions.chart.type = this.type;
        break;
      }
      case ChartType.COLUMN: {
        this.mergedOptions = getColumnOptions(this.data, this.categories);
        this.mergedOptions.chart.type = this.type;
        break;
      }
      case ChartType.BAR: {
        this.mergedOptions = getBarOptions(this.data, this.categories);
        this.mergedOptions.chart.type = this.type;
        break;
      }
    }
  }

  updateProperties() {
    if (this.mergedOptions.chart) {
      this.mergedOptions.chart.height = this.height;
      this.mergedOptions.accessibility.description = this.description;
      switch (this.mergedOptions.chart.type) {
        case ChartType.PIE:
          (this.mergedOptions.plotOptions.pie
            .dataLabels as PlotSeriesDataLabelsOptions).enabled = this.showDataLabels;
        /* falls through */
        case ChartType.DONUT: {
          this.mergedOptions.series = [
            {
              type: 'pie',
              data: this.data,
            },
          ];
          break;
        }
        case ChartType.AREASPLINE: {
          this.mergedOptions.series = [
            {
              type: 'areaspline',
              data: this.data,
            },
          ];
          break;
        }
        case ChartType.TIMESERIES: {
          this.mergedOptions.series = [
            {
              type: 'area',
              data: this.data,
            },
          ];
          this.mergedOptions.xAxis = {
            ...this.mergedOptions.xAxis,
            breaks: this.breaks,
          };
          break;
        }
        case ChartType.ACTIVITYGAUGE: {
          const data = this.data[0];

          this.mergedOptions.title.text = data.title;
          this.mergedOptions.subtitle.text = data.subtitle;

          if (data.paneBackgroundColor) {
            this.mergedOptions.pane.background = [
              {
                ...this.mergedOptions.pane.background[0],
                backgroundColor: data.paneBackgroundColor,
              },
            ];
          }
          if (data.color) {
            this.mergedOptions.title.style.color = data.color;
            this.mergedOptions.subtitle.style.color = data.color;
          }
          this.mergedOptions.series = [
            {
              type: 'solidgauge',
              data: data.series,
            },
          ];

          break;
        }
        case ChartType.COLUMN: {
          this.mergedOptions.series = [
            {
              type: 'column',
              data: this.data,
            },
          ];
          (this.mergedOptions.xAxis as XAxisOptions).categories = this.categories;
          break;
        }
        case ChartType.BAR: {
          this.mergedOptions.series = [
            {
              type: 'bar',
              data: this.data,
            },
          ];
          (this.mergedOptions.xAxis as XAxisOptions).categories = this.categories;
          break;
        }
      }
      if (!!this.options) {
        this.mergedOptions = mergeDeep(this.mergedOptions, this.options);
      }
    }
  }
}
