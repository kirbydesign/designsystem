import { ElementRef, Injectable } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartOptions, ChartType as ChartJSType } from 'chart.js';

import { ChartType } from './chart-wip.types';
import { Chart } from './configured-chart-js';

const CHART_TYPE_CONFIGS = {
  [ChartType.bar]: {
    type: 'bar' as ChartJSType,
    options: {
      indexAxis: 'y',
    },
  },
  [ChartType.column]: {
    type: 'bar' as ChartJSType,
    options: {
      indexAxis: 'x',
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
  private options: ChartOptions;

  public renderChart(
    targetElement: ElementRef<HTMLCanvasElement>,
    type: ChartType,
    data: ChartDataset<'bar'>[] | number[],
    dataLabels: string[],
    options?: ChartOptions
  ): void {
    const datasets = this.createDatasets(data);
    const config = this.createConfig(type, datasets, dataLabels, options);
    this.initializeNewChart(targetElement.nativeElement, config);

    this.options = options;
  }

  public redrawChart() {
    this.chart.update();
  }

  public updateData(data: ChartDataset<'bar'>[] | number[]): void {
    const datasets = this.createDatasets(data);
    this.chart.data.datasets = datasets;
  }

  public updateDataLabels(dataLabels: string[]) {
    this.chart.data.labels = dataLabels;
  }

  public updateType(type: ChartType) {
    /* indexAxis does not update predictably; 
    update by replacing the chart entirely instead */
    this.destructivelyUpdateType(type);
  }

  private destructivelyUpdateType(type: ChartType) {
    const datasets = this.chart.data.datasets as ChartDataset<'bar'>[];
    const dataLabels = this.chart.data.labels;

    const config = this.createConfig(type, datasets, dataLabels, this.options);
    const canvasElement = this.chart.canvas;

    this.chart.destroy();
    this.initializeNewChart(canvasElement, config);
  }

  private initializeNewChart(canvasElement: HTMLCanvasElement, config: ChartConfiguration) {
    this.chart = new Chart(canvasElement, config);
  }

  private createConfig(
    type: ChartType,
    datasets?: ChartDataset<'bar'>[],
    dataLabels?: unknown[],
    options: ChartOptions = {}
  ): ChartConfiguration {
    const deepCopy = (obj: any) => JSON.parse(JSON.stringify(obj));

    /* Deep copy to avoid Chart object modifying parts of CHART_TYPE_CONFIGS 
    as it copies by reference when initialized */
    const config = deepCopy(CHART_TYPE_CONFIGS[type]);

    config['options'] = {
      ...config.options,
      ...options,
    };

    if (datasets || dataLabels) {
      config['data'] = {
        ...(datasets ? { datasets } : {}),
        ...(dataLabels ? { labels: dataLabels } : {}),
      };
    }

    return config;
  }

  private createDatasets(data: ChartDataset<'bar'>[] | number[]): ChartDataset<'bar'>[] {
    if (!isNumberArray(data)) return data;

    return [
      {
        data: data,
      },
    ];
  }
}
