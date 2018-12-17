import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { ChartObject, Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import { DonutOptions } from './donut/options';

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
    if (chartType === 'pie') {
      this.options = new DonutOptions().options;
      this.options.chart.type = chartType;
    }
    this.setChartProperties();
    const chart: ChartObject = Highcharts.chart(this.chartContainer.nativeElement, this.options);
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    this.setChartProperties();
    const chart: ChartObject = Highcharts.chart(this.chartContainer.nativeElement, this.options);
  }

  setChartProperties() {
    if (this.options.chart && this.options.chart.type === 'pie') {
      this.options.chart.height = this.height;
      this.options.series[0].data = this.data;
      this.options.chart.description = this.description;
      this.options.plotOptions.pie.dataLabels.enabled = this.dataLabelsEnabled;
      this.options.plotOptions.pie.dataLabels.format = '{point.label}';
    }
  }

}
