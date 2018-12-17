
import { Component, OnInit, Input } from '@angular/core';
import * as platform from 'tns-core-modules/platform';

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
  templateUrl: './doughnut-chart-ns.component.tns.html',
  styleUrls: ['./doughnut-chart-ns.component.tns.scss']
})
export class DoughnutChartNsComponent implements OnInit {
  public showLegend = false;
  public headline: string;
  public startAngle = (platform.isIOS) ? -90 : 270;
  public endAngle = (platform.isIOS) ? 270 : 360;

  @Input() chartModels: ChartModel[];

  constructor() {}

  ngOnInit() {}

}
