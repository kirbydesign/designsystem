import { Component, OnInit } from '@angular/core';

export class ChartModel {
    constructor(
      public type?: string,
      public percentage?: number,
      public drawingPercentage?: number,
      public labelPercentage?: string,
      public color?: string
      ) {
    }
}
@Component({
  selector: 'kirby-doughnut-chart-ns',
  templateUrl: './doughnut-chart-ns.component.html',
  styleUrls: ['./doughnut-chart-ns.component.scss'],
})
export class DoughnutChartNsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
