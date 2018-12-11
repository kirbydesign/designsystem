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
  selector: 'kirby-distribution-chart-ns',
  templateUrl: './distribution-chart-ns.component.html',
  styleUrls: ['./distribution-chart-ns.component.scss'],
})
export class DistributionChartNsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
