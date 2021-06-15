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

  public renderChart(
    targetElement: ElementRef<HTMLCanvasElement>,
    type: ChartType,
    data: ChartDataset<'bar'>[] | number[],
    dataLabels: string[],
    customOptions?: ChartOptions
  ): void {
    const datasets = this.createDatasets(data);
    const options = this.getOptions(type, customOptions);
    const config = this.getConfig(type, datasets, dataLabels, options);
    this.initializeNewChart(targetElement.nativeElement, config);
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

  public updateType(type: ChartType, customOptions: ChartOptions) {
    if (type === ChartType.bar || type === ChartType.column) {
      /* indexAxis does not update predictably; update by replacing the 
      chart entirely instead */
      this.destructivelyUpdateType(type, customOptions);
    }
  }

  public updateOptions(customOptions: ChartOptions, type: ChartType) {
    this.chart.options = this.getOptions(type, customOptions);
  }

  private destructivelyUpdateType(type: ChartType, customOptions: ChartOptions) {
    const datasets = this.chart.data.datasets as ChartDataset<'bar'>[];
    const dataLabels = this.chart.data.labels;

    const options = this.getOptions(type, customOptions);
    const config = this.getConfig(type, datasets, dataLabels, options);
    const canvasElement = this.chart.canvas;

    this.chart.destroy();
    this.initializeNewChart(canvasElement, config);
  }

  private initializeNewChart(canvasElement: HTMLCanvasElement, config: ChartConfiguration) {
    this.chart = new Chart(canvasElement, config);
  }

  private getTypeConfig(type: ChartType) {
    /* Deep copy to avoid Chart object modifying parts of CHART_TYPE_CONFIGS 
    as it copies by reference when initialized */
    const deepCopy = (obj: any) => JSON.parse(JSON.stringify(obj));
    return deepCopy(CHART_TYPE_CONFIGS[type]);
  }

  private getOptions(type: ChartType, customOptions?: ChartOptions): ChartOptions | undefined {
    const typeConfig = this.getTypeConfig(type);
    const typeConfigOptions = typeConfig['options'];
    return {
      ...typeConfigOptions,
      ...customOptions,
    };
  }

  private getConfig(
    type: ChartType,
    datasets?: ChartDataset<'bar'>[],
    dataLabels?: unknown[],
    options?: ChartOptions
  ): ChartConfiguration {
    const config = this.getTypeConfig(type);

    if (options) {
      config.options = options;
    }

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
