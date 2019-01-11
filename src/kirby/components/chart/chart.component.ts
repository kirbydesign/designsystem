import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import { ChartHelper } from './chart-helper';
import { ChartType } from './chart-helper';

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
  @Input() type: ChartType = 'pie';
  @Input() description = '';
  @Input() dataLabelsEnabled = true;

  options: Options = {};
  chartHelper: ChartHelper;

  constructor() {
    this.chartHelper = new ChartHelper();
  }

  @ViewChild('chartContainer') chartContainer: ElementRef;

  ngOnInit() {
    this.options = this.chartHelper.setupChartType(this.options, this.type);
    this.options = this.chartHelper.updateProperties(this.options, this.height, this.data, this.description, this.dataLabelsEnabled);
    Highcharts.chart(this.chartContainer.nativeElement, this.options);
  }

  ngOnChanges() {
    if (this.options.chart) {
      this.updateChart();
    }
  }

  updateChart() {
    this.chartHelper.updateProperties(this.options, this.height, this.data, this.description, this.dataLabelsEnabled);
    Highcharts.chart(this.chartContainer.nativeElement, this.options);
  }
}
