import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild, Inject } from '@angular/core';
import { Options } from 'highcharts';
import { ChartHelper } from './chart-helper';
import { DonutOptions, DONUT_OPTIONS } from './options/donut';
import { AreaSplineOptions, AREASPLINE_OPTIONS } from './options/areaspline';
import { ChartType } from './chart-type';

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [
    ChartHelper,
    { provide: DONUT_OPTIONS, useValue: DonutOptions },
    { provide: AREASPLINE_OPTIONS, useValue: AreaSplineOptions }
  ]
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data = [];
  @Input() height = 300;
  @Input() type: ChartType = ChartType.PIE;
  @Input() description = '';
  @Input() showDataLabels = true;
  @ViewChild('chartContainer') chartContainer: ElementRef;

  options: Options = {};

  constructor(
    private chartHelper: ChartHelper,
    @Inject(DONUT_OPTIONS) public donutOptions: Options,
    @Inject(AREASPLINE_OPTIONS) public areasplineOptions: Options) {
  }

  ngOnInit() {
    this.setupChartType();
    this.updateProperties();
    this.chartHelper.init(this.options, this.chartContainer);
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
    }
  }

  updateProperties() {
    if (this.options.chart) {
      this.options.chart.height = this.height;
      this.options.chart.description = this.description;

      switch (this.options.chart.type) {
        case ChartType.PIE:
          this.options.plotOptions.pie.dataLabels.enabled = this.showDataLabels;
          /* falls through */
        case ChartType.DONUT: {
          this.options.series = [{
            type: 'pie',
            data: this.data as Array<Highcharts.SeriesPieDataOptions>
          }];
          break;
        }
        case ChartType.AREASPLINE: {
          this.options.series = [{
            type: 'areaspline',
            data: this.data as Array<Highcharts.SeriesAreasplineDataOptions>
          }];
        }
      }
    }
  }
}
