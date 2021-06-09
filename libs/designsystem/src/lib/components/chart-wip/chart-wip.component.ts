import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { ChartJSService } from './chart-js.service';
import { ChartService, ChartType } from './chart-wip.types';

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
  @Input() data: number[];
  @Input() dataLabels: string[];
  @Input() label: string;

  @ViewChild('chartCanvas')
  canvas: ElementRef<HTMLCanvasElement>;

  constructor(private chartService: ChartService) {}

  ngAfterViewInit() {
    this.renderChart();
  }

  private renderChart() {
    this.chartService.renderChart(this.canvas, this.type, this.data, this.dataLabels, this.label);
  }
}
