import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

export enum ChartType {
  column = 'column',
}

@Component({
  selector: 'kirby-chart-wip',
  templateUrl: './chart-wip.component.html',
  styleUrls: ['./chart-wip.component.scss'],
})
export class ChartWipComponent implements AfterViewInit {
  @Input() type: ChartType = ChartType.column;

  @ViewChild(HTMLCanvasElement) canvas: HTMLCanvasElement;

  ngAfterViewInit() {}
}
