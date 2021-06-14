import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartDataset } from 'chart.js';

import { ChartJSService } from './chart-js.service';
import { ChartType } from './chart-wip.types';

@Component({
  selector: 'kirby-chart-wip',
  templateUrl: './chart-wip.component.html',
  styleUrls: ['./chart-wip.component.scss'],
  providers: [ChartJSService],
})
export class ChartWipComponent implements AfterViewInit, OnChanges {
  @Input() type: ChartType = ChartType.bar;
  @Input() data: ChartDataset<'bar'>[] | number[];
  @Input() dataLabels: string[];
  @Input() label: string;
  // TODO: implement
  // @Input() overrideConfiguration: ChartConfiguration;
  @Input() options: ChartConfiguration['options'];

  @ViewChild('chartCanvas')
  canvasElement: ElementRef<HTMLCanvasElement>;

  constructor(private chartService: ChartJSService) {}

  ngAfterViewInit() {
    this.renderChart();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    let shouldRedrawChart = false;

    const keyUpdateFnPairs = {
      data: () => this.updateData(),
      dataLabels: () => this.updateDataLabels(),
      type: () => this.updateType(),
    };

    Object.entries(keyUpdateFnPairs).forEach(([key, updateFn]) => {
      if (simpleChanges[key] && !simpleChanges[key].firstChange) {
        shouldRedrawChart = true;
        updateFn();
      }
    });

    if (shouldRedrawChart) this.redrawChart();
  }

  private renderChart() {
    this.chartService.renderChart(
      this.canvasElement,
      this.type,
      this.data,
      this.dataLabels,
      this.options
    );
  }

  private updateData() {
    this.chartService.updateData(this.data);
  }

  private updateDataLabels() {
    this.chartService.updateDataLabels(this.dataLabels);
  }

  private updateType() {
    this.chartService.updateType(this.type);
  }

  private redrawChart() {
    this.chartService.redrawChart();
  }
}
