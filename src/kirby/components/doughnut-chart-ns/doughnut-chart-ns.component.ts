import { Component, OnInit } from '@angular/core';

export class ChartModel {
  constructor(
    public type?: string,
    public labelPercentage?: string,
    public drawingPercentage?: number,
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
