import { ElementRef, Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AnnotationOptions } from 'chartjs-plugin-annotation';

import { CHART_ANNOTATION_CONFIGS, CHART_TYPE_CONFIGS } from '../chart-wip.configs';
import { ChartData, ChartDataset, ChartType, isNumberArray } from '../chart-wip.types';
import { deepCopy, deepMergeObjects } from '../utils';

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
    annotations?: AnnotationOptions[]
  ): void {
    const datasets = this.createDatasets(data);
    const options = this.createOptionsObject(type, customOptions, annotations);
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

  public updateType(type: ChartType, customOptions?: ChartOptions) {
    if (type === 'bar' || type === 'column') {
      /* indexAxis does not update predictably; update by replacing 
         the chart entirely instead */
      this.destructivelyUpdateType(type, customOptions);
    }
  }

  public updateOptions(customOptions: ChartOptions, type: ChartType) {
    const annotations = this.getExistingChartAnnotations();
    this.chart.options = this.createOptionsObject(type, customOptions, annotations);
  }

  public updateAnnotations(annotations: AnnotationOptions[]) {
    const annotationsWithDefaults = this.applyDefaultsToAnnotations(annotations);
    this.chart.options.plugins.annotation.annotations = annotationsWithDefaults;
  }

  private getExistingChartAnnotations(): AnnotationOptions[] | undefined {
    /* Plugin options type uses a utility type to mark all members as optional. 
       To not have to import this from the utility-types npm package, return as 
       AnnotationOptions[]; that is what we get in the end anyways */
    return this.chart.options.plugins?.annotation?.annotations as AnnotationOptions[];
  }

  private destructivelyUpdateType(type: ChartType, customOptions?: ChartOptions) {
    const datasets = this.chart.data.datasets as ChartDataset[];
    const dataLabels = this.chart.data.labels;
    const annotations = this.getExistingChartAnnotations();

    const options = this.createOptionsObject(type, customOptions, annotations);
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
    return annotations.map((annotation) => {
      const annotationTypeDefaults = this.getAnnotationDefaults(annotation.type);
      return deepMergeObjects(annotationTypeDefaults, annotation);
    });
  }

  private createAnnotationPluginOptionsObject(annotations: AnnotationOptions[]) {
    const annotationsWithDefaults = this.applyDefaultsToAnnotations(annotations);
    return {
      plugins: {
        annotation: {
          annotations: annotationsWithDefaults,
        },
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
    const annotationPluginOptions = annotations
      ? this.createAnnotationPluginOptionsObject(annotations)
      : {};

    return deepMergeObjects(typeConfigOptions, customOptions, annotationPluginOptions);
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
    //TODO: do we need deep merge here?
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
