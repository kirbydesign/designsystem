import { ElementRef, Injectable } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import { ChartConfiguration } from 'chart.js';

import { ColorHelper, DesignTokenHelper } from '../../helpers';

import { ChartService, ChartType } from './chart-wip.types';

const { fontSize } = DesignTokenHelper;
const { getThemeColorHexString } = ColorHelper;

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

  private setDefaults() {
    /* TODO: Solve undefined issue when setting defaults directly & refactor these two*/
    this.removeDefaultScaleGrids();
    this.setDefaultElementColors();
    this.setDefaultFonts();
  }

  private setDefaultElementColors() {
    Chart.defaults.elements = {
      ...Chart.defaults.elements,
      bar: {
        ...Chart.defaults.elements.bar,
        backgroundColor: getThemeColorHexString('secondary'),
        hoverBackgroundColor: getThemeColorHexString('primary'),
      },
    };
  }

  private removeDefaultScaleGrids() {
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

  private setDefaultFonts() {
    // TODO: Remove magic string
    Chart.defaults.font.family = 'Roboto';
    Chart.defaults.font.size = parseInt(fontSize('xs'));
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
