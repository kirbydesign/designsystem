import { ElementRef, Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AnnotationOptions } from 'chartjs-plugin-annotation';

import { CHART_ANNOTATION_CONFIGS, CHART_TYPE_CONFIGS } from '../chart-wip.configs';
import { ChartData, ChartDataset, ChartType, isNumberArray } from '../chart-wip.types';

import { Chart } from './configured-chart-js';

@Injectable()
export class ChartJSService {
  private chart: Chart;

  public renderChart(
    targetElement: ElementRef<HTMLCanvasElement>,
    type: ChartType,
    data: ChartData,
    dataLabels?: string[] | string[][],
    customOptions?: ChartOptions,
    customAnnotations?: AnnotationOptions[]
  ): void {
    const datasets = this.createDatasets(data);
    const options = this.createOptionsObject(type, customOptions, customAnnotations);
    const config = this.createConfigurationObject(type, datasets, options, dataLabels);
    this.initializeNewChart(targetElement.nativeElement, config);
  }

  public redrawChart() {
    this.chart.update();
  }

  public updateData(data: ChartData): void {
    const datasets = this.createDatasets(data);
    this.chart.data.datasets = datasets;
  }

  public updateDataLabels(dataLabels: string[] | string[][]) {
    this.chart.data.labels = dataLabels;
  }

  public updateType(
    type: ChartType,
    customOptions?: ChartOptions,
    customAnnotations?: AnnotationOptions[]
  ) {
    if (type === 'bar' || type === 'column') {
      /* indexAxis does not update predictably; update by replacing the 
      chart entirely instead */
      this.destructivelyUpdateType(type, customOptions, customAnnotations);
    }
  }

  public updateOptions(
    customOptions: ChartOptions,
    type: ChartType,
    customAnnotations?: AnnotationOptions[]
  ) {
    this.chart.options = this.createOptionsObject(type, customOptions, customAnnotations);
  }

  public updateAnnotations(annotationOptions: AnnotationOptions[]) {
    this.chart.options.plugins.annotation.annotations = annotationOptions;
  }

  private destructivelyUpdateType(
    type: ChartType,
    customOptions?: ChartOptions,
    customAnnotations?: AnnotationOptions[]
  ) {
    const datasets = this.chart.data.datasets as ChartDataset[];
    const dataLabels = this.chart.data.labels;

    const options = this.createOptionsObject(type, customOptions, customAnnotations);
    const config = this.createConfigurationObject(type, datasets, options, dataLabels);
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

  private createBlankLabels(datasets: ChartDataset[]): string[] {
    const largestDataset = datasets.reduce((previousDataset, currentDataset) =>
      previousDataset.data.length > currentDataset.data.length ? previousDataset : currentDataset
    );
    return Array(largestDataset.data.length).fill('');
  }

  private getAnnotationDefaults(type: string) {
    return CHART_ANNOTATION_CONFIGS[type];
  }

  private applyDefaultsToAnnotations(annotations: AnnotationOptions[]) {
    return annotations.map((annotation) => ({
      ...this.getAnnotationDefaults(annotation.type),
      ...annotation,
    }));
  }

  private createPluginOptionsObject(
    annotations: AnnotationOptions[],
    typeConfigPluginOptions: any,
    customPluginOptions: any
  ) {
    if (!annotations) return;

    const annotationsWithDefaults = this.applyDefaultsToAnnotations(annotations);
    return {
      ...typeConfigPluginOptions,
      ...customPluginOptions,
      annotation: {
        ...typeConfigPluginOptions?.annotation,
        ...customPluginOptions?.annotation,
        annotations: annotationsWithDefaults,
      },
    };
  }

  private createOptionsObject(
    type: ChartType,
    customOptions?: ChartOptions,
    annotations?: AnnotationOptions[]
  ): ChartOptions {
    const typeConfig = this.getTypeConfig(type);
    const typeConfigOptions = typeConfig?.options;
    const pluginOptions = this.createPluginOptionsObject(
      annotations,
      typeConfigOptions?.plugins,
      customOptions?.plugins
    );

    return {
      ...typeConfigOptions,
      ...customOptions,
      plugins: pluginOptions,
    };
  }
  private createConfigurationObject(
    type: ChartType,
    datasets: ChartDataset[],
    options: ChartOptions,
    dataLabels?: unknown[]
  ): ChartConfiguration {
    /* chartJS requires labels; if none is provided create an empty string array
    to make it optional for consumer */
    const labels = !dataLabels ? this.createBlankLabels(datasets) : dataLabels;
    const typeConfig = this.getTypeConfig(type);
    return {
      ...typeConfig,
      data: {
        labels,
        datasets,
      },
      options,
    };
  }

  private createDatasets(data: ChartData): ChartDataset[] {
    return isNumberArray(data) ? [{ data }] : data;
  }
}
