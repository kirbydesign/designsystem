import { ElementRef, Injectable } from '@angular/core';
import { ActiveElement, ChartConfiguration, ChartOptions } from 'chart.js';
import { AnnotationOptions } from 'chartjs-plugin-annotation';

import { mergeDeepAll } from '../../../helpers/merge-deep';
import {
  CHART_ANNOTATION_CONFIGS,
  CHART_TYPE_CONFIGS,
  INTERACTION_FUNCTIONS_EXTENSIONS,
} from '../chart.configs';
import { ChartDataset, ChartHighlightedElements, ChartType, isNumberArray } from '../chart.types';
import { deepCopy } from '../utils';

import { Chart } from './configured-chart-js';

@Injectable()
export class ChartJSService {
  private chart: Chart;

  public renderChart(args: {
    targetElement: ElementRef<HTMLCanvasElement>;
    type: ChartType;
    data: ChartDataset[] | number[];
    dataLabels?: string[] | string[][];
    customOptions?: ChartOptions;
    annotations?: AnnotationOptions[];
    highlightedElements?: ChartHighlightedElements;
  }): void {
    const {
      targetElement,
      type,
      data,
      dataLabels,
      customOptions,
      annotations,
      highlightedElements,
    } = args;

    const datasets = this.createDatasets(data, highlightedElements);
    const options = this.createOptionsObject({ type, customOptions, annotations });
    const config = this.createConfigurationObject(type, datasets, options, dataLabels);
    this.initializeNewChart(targetElement.nativeElement, config);
  }

  public redrawChart() {
    this.chart.update();
  }

  public updateData(data: ChartDataset[] | number[]): void {
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
    this.chart.options = this.createOptionsObject({ type, customOptions, annotations });
  }

  public updateAnnotations(annotations: AnnotationOptions[]) {
    const annotationsWithDefaults = this.applyDefaultsToAnnotations(annotations);
    this.chart.options.plugins.annotation.annotations = annotationsWithDefaults;
  }

  public updateHighlightedElements(highlightedElements?: ChartHighlightedElements) {
    const oldDatasets = this.chart.data.datasets as ChartDataset[];

    // Clear old datasets of highlighted elements
    oldDatasets.map((dataset) => {
      if (dataset?.kirbyOptions?.highlightedElements) {
        delete dataset.kirbyOptions.highlightedElements;
      }
    });

    this.chart.data.datasets = this.createDatasets(oldDatasets, highlightedElements);
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

    const options = this.createOptionsObject({ type, customOptions, annotations });
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
      return mergeDeepAll(annotationTypeDefaults, annotation);
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

  private applyInteractionFunctionsExtensions(options: ChartOptions): ChartOptions {
    const interactionFunctionsExtensions = INTERACTION_FUNCTIONS_EXTENSIONS;
    Object.entries(interactionFunctionsExtensions).forEach(([key, _]) => {
      const callback = options[key];
      options[key] = (e: Event, a: ActiveElement[], c: Chart) => {
        interactionFunctionsExtensions[key](e, a, c, callback);
      };
    });
    return options;
  }

  private createOptionsObject(args: {
    type: ChartType;
    customOptions?: ChartOptions;
    annotations?: AnnotationOptions[];
  }): ChartOptions {
    const { type, customOptions, annotations } = args;

    const typeConfig = this.getTypeConfig(type);
    const typeConfigOptions = typeConfig?.options;
    const annotationPluginOptions = annotations
      ? this.createAnnotationPluginOptionsObject(annotations)
      : {};
    let options: ChartOptions = mergeDeepAll(
      typeConfigOptions,
      customOptions,
      annotationPluginOptions
    );
    return this.applyInteractionFunctionsExtensions(options);
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
    return mergeDeepAll(typeConfig, {
      data: {
        labels,
        datasets,
      },
      options,
    }) as ChartConfiguration;
  }

  private addHighlightedElementsToDatasets(
    highlightedElements: ChartHighlightedElements,
    datasets: ChartDataset[]
  ) {
    highlightedElements.forEach(([datasetIndex, dataIndex]) => {
      const dataset = datasets[datasetIndex];
      if (!dataset) return;

      if (dataset?.kirbyOptions?.highlightedElements) {
        dataset.kirbyOptions.highlightedElements.push(dataIndex);
      } else {
        dataset.kirbyOptions = {
          ...dataset.kirbyOptions,
          highlightedElements: [dataIndex],
        };
      }
    });
  }
  private createDatasets(
    data: ChartDataset[] | number[],
    highlightedElements?: ChartHighlightedElements
  ): ChartDataset[] {
    let datasets = isNumberArray(data) ? [{ data }] : data;

    if (highlightedElements) this.addHighlightedElementsToDatasets(highlightedElements, datasets);

    return datasets;
  }
}
