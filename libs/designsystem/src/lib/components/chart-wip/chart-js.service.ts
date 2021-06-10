import { ElementRef, Injectable } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import { ChartConfiguration } from 'chart.js';

import { ColorHelper } from '../../helpers';

import { ChartService, ChartType } from './chart-wip.types';

@Injectable()
export class ChartJSService implements ChartService {
  constructor() {
    Chart.register(BarController, CategoryScale, LinearScale, BarElement);
    this.setDefaults();
  }

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

  /* TODO: Solve undefined issue when setting defaults directly & refactor*/
  private setDefaults() {
    // Set bar colors
    Chart.defaults.elements = {
      ...Chart.defaults.elements,
      bar: {
        ...Chart.defaults.elements.bar,
        backgroundColor: ColorHelper.getThemeColorHexString('secondary'),
        hoverBackgroundColor: ColorHelper.getThemeColorHexString('primary'),
      },
    };

    // TODO: Figure out why this gives an undefined error when display is set directly
    Chart.defaults.scales = {
      ...Chart.defaults.scales,
      linear: {
        ...Chart.defaults.scales.linear,
        display: false,
        ticks: {
          ...Chart.defaults.scales.linear.ticks,
          display: false,
        },
      },
      category: {
        ...Chart.defaults.scales.category,
        display: true,
        grid: {
          ...Chart.defaults.scales.category.grid,
          display: false,
        },
      },
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
