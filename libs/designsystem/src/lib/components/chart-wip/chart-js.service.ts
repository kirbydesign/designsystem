import { ElementRef, Injectable } from '@angular/core';
import Chart from 'chart.js/auto';

import { ChartService, ChartType } from './chart-wip.types';

@Injectable()
export class ChartJSService implements ChartService {
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
    const config = {
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
