import { AfterViewInit, Component, ElementRef, Injectable, Input, ViewChild } from '@angular/core';

export enum ChartType {
  column = 'column',
}

export abstract class ChartService {
  renderChart: (targetElement: ElementRef, type: ChartType) => void;
}

@Injectable()
class ChartJSService implements ChartService {
  public renderChart(targetElement: ElementRef, type: ChartType): void {
    console.log('element:', targetElement, 'type:', type);
  }
}

@Component({
  selector: 'kirby-chart-wip',
  templateUrl: './chart-wip.component.html',
  styleUrls: ['./chart-wip.component.scss'],
  providers: [
    {
      provide: ChartService,
      useClass: ChartJSService,
    },
  ],
})
export class ChartWipComponent implements AfterViewInit {
  @Input() type: ChartType = ChartType.column;

  @ViewChild('chartCanvas') canvas: ElementRef<HTMLCanvasElement>;

  constructor(private chartService: ChartService) {}

  ngAfterViewInit() {
    this.renderChart();
  }

  private renderChart() {
    this.chartService.renderChart(this.canvas, this.type);
  }
}
