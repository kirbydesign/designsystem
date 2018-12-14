
import { Component, OnInit, Input } from '@angular/core';
import { Observable} from 'rxjs';
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
  private _chartModels: ChartModel[];
  public showLegend: boolean;
  public headline: string;

  constructor() {
    this.showLegend = false;
  }

  ngOnInit() {}

  @Input()
  set chartModels(chartModels: ChartModel[]) {
    this._chartModels = chartModels;
  }

  get chartModels(): ChartModel[] {
    return this._chartModels;
  }

  get startAngle(): number {
    if (platform.isAndroid) {
      return 270;
    }
    if (platform.isIOS) {
      return -90;
    }
  }

  get endAngle(): number {
    if (platform.isAndroid) {
      return 360;
    }
    if (platform.isIOS) {
      return 270;
    }
  }
}
