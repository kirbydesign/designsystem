import { Component, ElementRef, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  Options,
  PlotSeriesDataLabelsOptions,
  XAxisBreaksOptions,
  XAxisOptions,
  YAxisOptions,
} from 'highcharts';

import { mergeDeep } from '../../helpers/deep-merge';

import { ChartHelper } from './chart-helper';
import { ChartType } from './chart-type';
import { ActivityGaugeOptions, ACTIVITYGAUGE_OPTIONS } from './options/activitygauge';
import { AreaSplineOptions, AREASPLINE_OPTIONS } from './options/areaspline';
import { barOptions } from './options/bar';
import { columnOptions } from './options/column';
import { DonutOptions, DONUT_OPTIONS } from './options/donut';
import { TimeSeriesOptions, TIMESERIES_OPTIONS } from './options/timeseries';

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
export class ChartComponent implements OnChanges {
  @Input() data: any[] = [];
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
  ) {
    this.chartHelper.init(this.hostElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type) {
      this.setupChartType();
    }
    this.updateProperties();
    this.chartHelper.renderChart(this.mergedOptions);
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
        this.mergedOptions = columnOptions;
        this.mergedOptions.chart.type = this.type;
        break;
      }
      case ChartType.BAR: {
        this.mergedOptions = barOptions;
        this.mergedOptions.chart.type = this.type;
        break;
      }
    }
  }

  updateProperties() {
    this.mergedOptions.chart.height = this.height;
    this.mergedOptions.accessibility.description = this.description;
    switch (this.mergedOptions.chart.type) {
      case ChartType.PIE:
      case ChartType.DONUT: {
        this.setPieInput();
        break;
      }
      case ChartType.AREASPLINE: {
        this.setSeries('areaspline');
        break;
      }
      case ChartType.TIMESERIES: {
        this.setTimeseriesInput();
        break;
      }
      case ChartType.ACTIVITYGAUGE: {
        this.setActivitygaugeInput();
        break;
      }
      case ChartType.COLUMN: {
        this.setColumnInput();
        break;
      }
      case ChartType.BAR: {
        this.setBarInput();
        break;
      }
    }
    if (!!this.options) {
      this.mergedOptions = mergeDeep(this.mergedOptions, this.options);
    }
  }

  private setPieInput() {
    (this.mergedOptions.plotOptions.pie
      .dataLabels as PlotSeriesDataLabelsOptions).enabled = this.showDataLabels;
    this.setSeries('pie');
  }

  private setBarInput() {
    const dataMaxValue = Math.max(...this.data);
    this.mergedOptions.series = [
      {
        type: 'bar',
        name: 'InvisibleClickReceiver',
        data: this.data.map((dataEntry) => dataMaxValue - dataEntry),
        edgeColor: 'rgb(255, 255, 255, 0)',
        opacity: 0,
      },
      {
        type: 'bar',
        data: this.data,
      },
    ];
    (this.mergedOptions.xAxis as XAxisOptions).categories = this.categories;
  }

  private setColumnInput() {
    this.mergedOptions.series = [
      {
        type: 'column',
        data: this.data,
      },
    ];
    const dataMaxValue = Math.max(...this.data);
    ((this.mergedOptions.yAxis as YAxisOptions).tickPositioner = () => {
      var positions = [0, dataMaxValue];
      return positions;
    }),
      (this.mergedOptions.series = [
        {
          type: 'column',
          name: 'InvisibleClickReceiver',
          data: this.data.map((_, idx) => dataMaxValue - this.data[idx]),
          opacity: 0,
        },
        {
          type: 'column',
          data: this.data,
        },
      ]);
    (this.mergedOptions.xAxis as XAxisOptions).categories = this.categories;
  }

  private setActivitygaugeInput() {
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
  }

  private setTimeseriesInput() {
    this.setSeries('area');
    this.mergedOptions.xAxis = {
      ...this.mergedOptions.xAxis,
      breaks: this.breaks,
    };
  }

  private setSeries(type: any) {
    this.mergedOptions.series = [
      {
        type,
        data: this.data,
      },
    ];
  }
}
