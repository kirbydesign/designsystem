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
  // tslint:disable-next-line: no-input-rename
  @Input('options') optionsForOverride: Options;
  options: Options = {
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
    this.chartHelper.init(this.options, this.hostElement);
  }

  ngOnChanges() {
    this.updateProperties();
    this.chartHelper.updateChart(this.options);
  }

  setupChartType() {
    switch (this.type) {
      case ChartType.DONUT: {
        this.options = this.donutOptions;
        this.options.chart.type = ChartType.PIE;
        this.options.plotOptions.pie.innerSize = '50%';
        break;
      }
      case ChartType.PIE: {
        this.options = this.donutOptions;
        this.options.chart.type = this.type;
        this.options.plotOptions.pie.innerSize = '0%';
        break;
      }
      case ChartType.AREASPLINE: {
        this.options = this.areasplineOptions;
        this.options.chart.type = this.type;
        break;
      }
      case ChartType.TIMESERIES: {
        this.options = this.timeSeriesOptions;
        this.options.chart.type = this.type;
        break;
      }
      case ChartType.ACTIVITYGAUGE: {
        this.options = this.activitygaugeOptions;
        this.options.chart.type = this.type;
        break;
      }
    }
  }

  updateProperties() {
    if (this.options.chart) {
      this.options.chart.height = this.height;
      this.options.accessibility.description = this.description;
      switch (this.options.chart.type) {
        case ChartType.PIE:
          (this.options.plotOptions.pie
            .dataLabels as PlotSeriesDataLabelsOptions).enabled = this.showDataLabels;
        /* falls through */
        case ChartType.DONUT: {
          this.options.series = [
            {
              type: 'pie',
              data: this.data,
            },
          ];
          break;
        }
        case ChartType.AREASPLINE: {
          this.options.series = [
            {
              type: 'areaspline',
              data: this.data,
            },
          ];
          break;
        }
        case ChartType.TIMESERIES: {
          this.options.series = [
            {
              type: 'area',
              data: this.data,
            },
          ];
          this.options.xAxis = {
            ...this.options.xAxis,
            breaks: this.breaks,
          };
          break;
        }
        case ChartType.ACTIVITYGAUGE: {
          const data = this.data[0];

          this.options.title.text = data.title;
          this.options.subtitle.text = data.subtitle;

          if (data.paneBackgroundColor) {
            this.options.pane.background = [
              {
                ...this.options.pane.background[0],
                backgroundColor: data.paneBackgroundColor,
              },
            ];
          }
          if (data.color) {
            this.options.title.style.color = data.color;
            this.options.subtitle.style.color = data.color;
          }
          this.options.series = [
            {
              type: 'solidgauge',
              data: data.series,
            },
          ];

          break;
        }
      }
    }
    if (!!this.optionsForOverride) {
      this.options = mergeDeep(this.options, this.optionsForOverride);
    }
  }
}
