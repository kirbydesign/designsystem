import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChartDataset } from 'chart.js';

import { ChartJSService } from './chart-js.service';
import { ChartType } from './chart-wip.types';

@Component({
  selector: 'kirby-chart-wip',
  templateUrl: './chart-wip.component.html',
  styleUrls: ['./chart-wip.component.scss'],
  providers: [ChartJSService],
})
export class ChartWipComponent implements AfterViewInit {
  @Input() type: ChartType = ChartType.bar;
  private _data: ChartDataset<'bar'>[] | number[];

  @Input() set data(value: ChartDataset<'bar'>[] | number[]) {
    this._data = value;
    this.updateData();
  }
  @Input() dataLabels: string[];
  @Input() label: string;

  @ViewChild('chartCanvas')
  canvasElement: ElementRef<HTMLCanvasElement>;

  constructor(private chartService: ChartJSService) {}

  ngAfterViewInit() {
    this.renderChart();
  }

  private renderChart() {
    this.chartService.renderChart(this.canvasElement, this.type, this._data, this.dataLabels);
  }

  private updateData() {
    this.chartService.updateData(this._data);
  }
}
