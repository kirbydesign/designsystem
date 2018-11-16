import { Component, OnInit, Input } from '@angular/core';
import { ChartObject, Options } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() options: Options = {};
  @Input() height = 300;

  constructor() { }

  ngOnInit() {
    this.options.chart.height = this.height;
    const chart: ChartObject = Highcharts.chart('chart-container', this.options);
  }

}
