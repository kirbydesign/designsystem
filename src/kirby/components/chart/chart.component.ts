import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { Options } from 'highcharts';
import { ChartHelper } from './chart-helper';
import { DonutOptions } from './options/donut';
import { ChartTypes } from './chart-types';

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit, OnChanges {
  @Input() data = [];
  @Input() height = 300;
  @Input() type: ChartTypes = ChartTypes.PIE;
  @Input() description = '';
  @Input() dataLabelsEnabled = true;

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
    this.chartHelper.onChanges(this.options);
  }

  setupChartType() {
    let pieInnerCircleSize = '0%';
    if (this.type === ChartTypes.DONUT) {
      this.type = ChartTypes.PIE;
      pieInnerCircleSize = '50%';
    }
    if (this.type === ChartTypes.PIE) {
      this.options = new DonutOptions().options;
      this.options.plotOptions.pie.innerSize = pieInnerCircleSize;
    }
    this.options.chart.type = this.type;
  }

  updateProperties() {
    if (this.options.chart && this.options.chart.type === ChartTypes.PIE) {
      this.options.chart.height = this.height;
      this.options.series[0].data = this.data;
      this.options.chart.description = this.description;
      this.options.plotOptions.pie.dataLabels.enabled = this.dataLabelsEnabled;
    }
  }

}
