import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { Options } from 'highcharts';
import { ChartHelper } from './chart-helper';
import { DonutOptions } from './options/donut';
import { AreaSplineOptions } from './options/areaspline';
import { ChartType } from './chart-type';

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit, OnChanges {
  @Input() data = [];
  @Input() height = 300;
  @Input() type: ChartType = ChartType.PIE;
  @Input() description = '';
  @Input() showDataLabels = true;

  options: Options = {};
  chartHelper: ChartHelper;

  constructor() {
    this.chartHelper = new ChartHelper();
  }

  @ViewChild('chartContainer') chartContainer: ElementRef;

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
    let pieInnerCircleSize = '0%';
    if (this.type === ChartType.DONUT) {
      this.type = ChartType.PIE;
      pieInnerCircleSize = '50%';
    }
    switch (this.type) {
      case ChartType.PIE: {
        this.options = new DonutOptions().options;
        this.options.plotOptions.pie.innerSize = pieInnerCircleSize;
        break;
      }
      case ChartType.AREASPLINE: {
        this.options = new AreaSplineOptions().options;
        break;
      }
    }
    this.options.chart.type = this.type;
  }

  updateProperties() {
    if (this.options.chart) {
      this.options.chart.height = this.height;
      this.options.series[0].data = this.data;
      this.options.chart.description = this.description;
      if (this.options.chart.type === ChartType.PIE) {
        this.options.plotOptions.pie.dataLabels.enabled = this.showDataLabels;
      }
    }

  }

}
