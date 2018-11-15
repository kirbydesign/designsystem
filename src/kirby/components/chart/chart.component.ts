import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() options: any = {};

  constructor() { }

  ngOnInit() {
    const chart: Chart = new Chart('chart', this.options);
  }

}
