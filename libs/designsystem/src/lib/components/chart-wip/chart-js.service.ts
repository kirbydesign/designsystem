import { ElementRef, Injectable } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType as ChartJSType } from 'chart.js';

import { ChartType } from './chart-wip.types';
import { Chart } from './configured-chart-js';

//---- TODO: move all of this somewhere smart ----//
const KIRBY_TO_CHARTJS_TYPES_MAP = {
  [ChartType.bar]: 'bar' as ChartJSType,
  [ChartType.column]: 'bar' as ChartJSType,
};

const CHART_TYPE_CONFIGS = {
  [ChartType.bar]: {
    options: {
      indexAxis: 'y',
    },
  },
};

function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number');
}

// --------- //

@Injectable()
export class ChartJSService {
  constructor() {}

  public renderChart(
    targetElement: ElementRef<HTMLCanvasElement>,
    type: ChartType,
    data: ChartDataset<'bar'>[] | number[],
    dataLabels: string[]
  ): void {
    const datasets = this.prepareDatasets(data);
    const config = this.prepareConfig(datasets, dataLabels, type);
    new Chart(targetElement.nativeElement, config as ChartConfiguration);
  }

  private prepareConfig(
    datasets: ChartDataset<'bar'>[],
    dataLabels: string[],
    type: ChartType
  ): ChartConfiguration {
    return {
      type: KIRBY_TO_CHARTJS_TYPES_MAP[type],
      data: {
        labels: dataLabels,
        datasets,
      },
      ...CHART_TYPE_CONFIGS[type],
    };
  }

  private prepareDatasets(data: ChartDataset<'bar'>[] | number[]): ChartDataset<'bar'>[] {
    if (!isNumberArray(data)) return data;

    return [
      {
        data: data,
      },
    ];
  }
}
