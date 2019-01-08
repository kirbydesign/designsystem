import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import { DonutOptions } from './options/donut';
import { AreaSplineOptions } from './options/areaspline';

import * as exporting from 'highcharts/modules/exporting.src'; exporting(Highcharts);
import * as exportData from 'highcharts/modules/export-data'; exportData(Highcharts);
import * as accessibility from 'highcharts/modules/accessibility'; accessibility(Highcharts);

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data = [];
  @Input() height = 300;
  @Input() type = 'pie';
  @Input() description = '';
  @Input() dataLabelsEnabled = true;

  options: Options = {};

  constructor() { }

  @ViewChild('chartContainer') chartContainer: ElementRef;

  ngOnInit() {
    const chartType = this.type === 'donut' ? 'pie' : this.type;
    switch (chartType) {
      case 'pie': {
        this.options = new DonutOptions().options;
        break;
      }
      case 'areaspline': {
        this.options = new AreaSplineOptions().options;
        break;
      }
    }
    this.options.chart.type = chartType;
    this.setChartProperties();
    Highcharts.chart(this.chartContainer.nativeElement, this.options);
  }

  ngOnChanges() {
    if (this.options.chart) {
      this.updateChart();
    }
  }

  updateChart() {
    this.setChartProperties();
    Highcharts.chart(this.chartContainer.nativeElement, this.options);
  }

  setChartProperties() {
    this.options.chart.height = this.height;
    this.options.series[0].data = this.data;
    this.options.chart.description = this.description;
    if (this.options.chart && this.options.chart.type === 'pie') {
      this.options.plotOptions.pie.dataLabels.enabled = this.dataLabelsEnabled;
    }
  }

}
