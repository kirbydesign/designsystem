import { ElementRef, Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

import { ChartService, ChartType } from './chart-wip.types';
import { Chart } from './configured-chart-js';

@Injectable()
export class ChartJSService implements ChartService {
  constructor() {}

  public renderChart(
    targetElement: ElementRef<HTMLCanvasElement>,
    type: ChartType,
    data: number[],
    dataLabels: string[],
    label: string
  ): void {
    switch (type) {
      case ChartType.column:
        this.renderColumnChart(targetElement, data, dataLabels, label);
    }
  }

  private renderColumnChart(
    targetElement: ElementRef<HTMLCanvasElement>,
    data: number[],
    dataLabels: string[],
    label: string
  ) {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: dataLabels,
        datasets: [
          {
            label,
            data,
          },
        ],
      },
    };

    new Chart(targetElement.nativeElement, config);
  }
}
