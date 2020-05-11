import { Component, OnInit, Input, OnChanges, ElementRef, HostBinding } from '@angular/core';
import { Options } from 'highcharts';

import { ChartHelper } from './chart-helper';

@Component({
  selector: 'kirby-chart',
  template: '',
  styleUrls: ['./chart.component.scss'],
  providers: [ChartHelper],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input()
  set height(height: number) {
    if (this.options.chart) {
      this.options.chart.height = height;
    }
  }

  @Input() options: Options = {};

  constructor(private chartHelper: ChartHelper, private hostElement: ElementRef) {}

  ngOnInit() {
    this.chartHelper.init(this.options, this.hostElement);
  }

  ngOnChanges() {
    this.chartHelper.updateChart(this.options);
  }
}
