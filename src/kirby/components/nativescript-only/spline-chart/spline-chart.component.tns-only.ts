import { Component, OnInit, Input } from '@angular/core';
import * as platform from 'tns-core-modules/platform';
import { ObservableArray } from 'tns-core-modules/data/observable-array';

export class NativeScriptSplineChartItem {
  constructor(
    public category: number,
    public amount: number
    ) {
  }
}

@Component({
  selector: 'kirby-nativescript-spline-chart',
  templateUrl: './spline-chart.component.tns-only.html',
  styleUrls: ['./spline-chart.component.tns-only.scss']
})
export class NativeScriptSplineChartComponent implements OnInit {

  @Input() items: NativeScriptSplineChartItem[];

  constructor() {}

  ngOnInit() {
  }

}
