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
  selector: 'kirby-chart',
  templateUrl: './chart-ns.component.html',
  styleUrls: ['./chart-ns.component.scss'],
})
export class ChartNsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
