import { ElementRef, Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

import { CHART_TYPE_CONFIGS } from '../chart-wip.configs';
import { ChartData, ChartDataset, ChartType, isNumberArray } from '../chart-wip.types';

import { Chart } from './configured-chart-js';

@Injectable()
export class ChartJSService {
  private chart: Chart;

  public renderChart(
    targetElement: ElementRef<HTMLCanvasElement>,
    type: ChartType,
    data: ChartData,
    dataLabels?: string[],
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

  public updateData(data: ChartData): void {
    const datasets = this.createDatasets(data);
    this.chart.data.datasets = datasets;
  }

  public updateDataLabels(dataLabels: string[]) {
    this.chart.data.labels = dataLabels;
  }

  public updateType(type: ChartType, customOptions?: ChartOptions) {
    if (type === ChartType.bar || type === ChartType.column) {
      /* indexAxis does not update predictably; update by replacing the 
      chart entirely instead */
      this.destructivelyUpdateType(type, customOptions);
    }
  }

  public updateOptions(customOptions: ChartOptions, type: ChartType) {
    this.chart.options = this.getOptions(type, customOptions);
  }

  private destructivelyUpdateType(type: ChartType, customOptions?: ChartOptions) {
    const datasets = this.chart.data.datasets as ChartDataset[];
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

  private getOptions(type: ChartType, customOptions?: ChartOptions): ChartOptions {
    const typeConfig = this.getTypeConfig(type);
    const typeConfigOptions = typeConfig['options'];
    return {
      ...typeConfigOptions,
      ...customOptions,
    };
  }

  private createBlankLabels(datasets: ChartDataset[]): string[] {
    const largestDataset = datasets.reduce((previousDataset, currentDataset) =>
      previousDataset.data.length > currentDataset.data.length ? previousDataset : currentDataset
    );
    return Array(largestDataset.data.length).fill('');
  }

  private getConfig(
    type: ChartType,
    datasets: ChartDataset[],
    dataLabels?: unknown[],
    options?: ChartOptions
  ): ChartConfiguration {
    const config = {
      ...this.getTypeConfig(type),
      data: {
        /* chartJS requires labels; if none is provided create an empty string array
      to make it optional for consumer */
        labels: !dataLabels ? this.createBlankLabels(datasets) : dataLabels,
        datasets,
      },
    };

    if (options) {
      config['options'] = options;
    }

    return config;
  }

  private createDatasets(data: ChartData): ChartDataset[] {
    if (!isNumberArray(data)) return data;

    return [
      {
        data: data,
      },
    ];
  }
}
