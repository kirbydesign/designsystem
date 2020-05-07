import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { Options } from 'highcharts';

import { ChartHelper } from './chart-helper';

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [ChartHelper],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() height = 300;
  @Input() options: Options = {};
  @ViewChild('chartContainer', { static: true }) chartContainer: ElementRef;

  constructor(private chartHelper: ChartHelper) {}

  ngOnInit() {
    this.chartHelper.init(this.options, this.chartContainer);
  }

  ngOnChanges() {
    this.chartHelper.updateChart(this.options);
  }
}
