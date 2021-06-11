import { ElementRef, Injectable } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType as ChartJSType } from 'chart.js';

import { ChartType } from './chart-wip.types';
import { Chart } from './configured-chart-js';

//---- TODO: move all of this somewhere smart ----//
const CHART_TYPE_CONFIGS = {
  [ChartType.bar]: {
    type: 'bar' as ChartJSType,
    options: {
      indexAxis: 'y' as 'y' | 'x',
      scales: {},
    },
  },
  [ChartType.column]: {
    type: 'bar' as ChartJSType,
    options: {
      indexAxis: 'x' as 'y' | 'x',
    },
  },
};

function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number');
}

// --------- //

@Injectable()
export class ChartJSService {
  private chart: Chart;

  public renderChart(
    targetElement: ElementRef<HTMLCanvasElement>,
    type: ChartType,
    data: ChartDataset<'bar'>[] | number[],
    dataLabels: string[]
  ): void {
    const datasets = this.prepareDatasets(data);
    const config = this.prepareConfig(datasets, dataLabels, type);
    this.chart = new Chart(targetElement.nativeElement, config as ChartConfiguration);
  }

  public redrawChart() {
    this.chart.update();
  }

  public updateData(data: ChartDataset<'bar'>[] | number[]): void {
    const datasets = this.prepareDatasets(data);
    this.chart.data.datasets = datasets;
  }

  public updateDataLabels(dataLabels: string[]) {
    this.chart.data.labels = dataLabels;
  }

  private prepareConfig(
    datasets: ChartDataset<'bar'>[],
    dataLabels: string[],
    type: ChartType
  ): ChartConfiguration {
    return {
      type: 'bar',
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
