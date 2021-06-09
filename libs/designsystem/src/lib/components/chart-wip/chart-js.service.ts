import { ElementRef, Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import Chart from 'chart.js/auto';

import { ColorHelper } from '../../helpers';

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

  constructor() {
    Chart.defaults.elements.bar = {
      ...Chart.defaults.elements.bar,
      backgroundColor: ColorHelper.getThemeColorHexString('secondary'),
      hoverBackgroundColor: ColorHelper.getThemeColorHexString('primary'),
    };
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
