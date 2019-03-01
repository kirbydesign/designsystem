import { Component, OnInit, Input } from '@angular/core';
import * as platform from 'tns-core-modules/platform';

export class NativeScriptChartItem {
  constructor(
    public type?: string,
    public labelPercentage?: string,
    public drawingPercentage?: number,
    public color?: string
  ) {}
}

@Component({
  selector: 'kirby-nativescript-doughnut-chart',
  templateUrl: './doughnut-chart.component.tns-only.html',
  styleUrls: ['./doughnut-chart.component.tns-only.scss'],
})
export class NativeScriptDoughnutChartComponent implements OnInit {
  public startAngle = platform.isIOS ? -90 : 270;
  public endAngle = platform.isIOS ? 270 : 360;

  @Input() items: NativeScriptChartItem[];

  constructor() {}

  ngOnInit() {}
}
