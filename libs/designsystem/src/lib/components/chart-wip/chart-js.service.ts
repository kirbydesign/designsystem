import { ElementRef, Injectable } from '@angular/core';
import { ChartConfiguration, ChartDataset } from 'chart.js';

import { ChartType } from './chart-wip.types';
import { Chart } from './configured-chart-js';

function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number');
}

@Injectable()
export class ChartJSService {
  constructor() {}

  public renderChart(
    targetElement: ElementRef<HTMLCanvasElement>,
    type: ChartType,
    data: ChartDataset<'bar'>[] | number[],
    dataLabels: string[]
  ): void {
    const datasets = isNumberArray(data) ? this.convertNumberArrayToDataset(data) : data;

    switch (type) {
      case ChartType.column:
        this.renderColumnChart(targetElement, datasets, dataLabels);
    }
  }

  private convertNumberArrayToDataset(numberArray: number[]): ChartDataset<'bar'>[] {
    return [
      {
        data: numberArray,
      },
    ];
  }

  private renderColumnChart(
    targetElement: ElementRef<HTMLCanvasElement>,
    datasets: ChartDataset<'bar'>[],
    dataLabels: string[]
  ) {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: dataLabels,
        datasets,
      },
    };

    new Chart(targetElement.nativeElement, config);
  }
}
