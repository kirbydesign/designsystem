import { ElementRef, Injectable } from '@angular/core';
import { chartConfigHasType, mergeDeepAll } from '@kirbydesign/designsystem/helpers';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AnnotationOptions } from 'chartjs-plugin-annotation';

import { ChartConfigService } from '../chart-config-service';
import {
  ChartDataset,
  ChartHighlightedElements,
  ChartLabel,
  ChartType,
  isNumberArray,
} from '../charts.types';

import { AnnotationsDelegate } from './annotations.delegate';
import { Chart } from './configured-chart-js';

@Injectable()
export class ChartJSService {
  private chart: Chart;
  private highlightedElements: ChartHighlightedElements;
  protected chartType: ChartType;
  private annotationsDelegate: AnnotationsDelegate;

  constructor(protected chartConfigService: ChartConfigService) {
    this.annotationsDelegate = new AnnotationsDelegate(chartConfigService);
  }

  public renderChart(args: {
    targetElement: ElementRef<HTMLCanvasElement>;
    type: ChartType;
    data: ChartDataset[] | number[];
    labels?: ChartLabel[];
    customOptions?: ChartOptions;
    annotations?: AnnotationOptions[];
    highlightedElements?: ChartHighlightedElements;
  }): void {
    const { targetElement, type, data, labels, customOptions, annotations, highlightedElements } =
      args;

    this.highlightedElements = highlightedElements || null;
    this.chartType = type;

    const datasets = this.createDatasets(data);

    const options = this.createOptionsObject({
      customOptions,
      annotations,
    });
    const config = this.createConfigurationObject(type, datasets, options, labels);

    this.initializeNewChart(targetElement.nativeElement, config);
  }

  public redrawChart() {
    this.chart.update();
  }

  public destroyChart() {
    this.chart?.destroy();
  }

  public updateData(data: ChartDataset[] | number[]): void {
    const datasets = this.createDatasets(data);

    this.chart.data.datasets = datasets;
  }

  public updateLabels(labels: ChartLabel[]) {
    /* As labels provided via the 'labels' input property always has 
    highest priority - we can just set the property directly */
    this.chart.data.labels = labels;
  }

  public updateType(type: ChartType, customOptions?: ChartOptions) {
    if (type === 'bar' || type === 'column') {
      /* indexAxis does not update predictably; update by replacing 
         the chart entirely instead */
      this.destructivelyUpdateType(type, customOptions);
    } else {
      this.nonDestructivelyUpdateType(type, customOptions);
    }
  }

  public updateOptions(customOptions: ChartOptions, type: ChartType) {
    const annotations = this.annotationsDelegate.getExistingChartAnnotations(this.chart);
    this.chartType = type;
    this.chart.options = this.createOptionsObject({ customOptions, annotations });
  }

  public updateAnnotations(annotations: AnnotationOptions[]) {
    const annotationsWithDefaults =
      this.annotationsDelegate.applyDefaultsToAnnotations(annotations);
    this.chart.options.plugins.annotation.annotations = annotationsWithDefaults;
  }

  public updateHighlightedElements(highlightedElements?: ChartHighlightedElements) {
    this.highlightedElements = highlightedElements;
    const oldDatasets = this.chart.data.datasets as ChartDataset[];

    // Clear old datasets of highlighted elements
    oldDatasets.map((dataset) => {
      if (dataset?.kirbyOptions?.highlightedElements) {
        delete dataset.kirbyOptions.highlightedElements;
      }
    });

    this.chart.data.datasets = this.createDatasets(oldDatasets);
  }

  protected createOptionsObject(args: {
    customOptions?: ChartOptions;
    annotations?: AnnotationOptions[];
  }): ChartOptions {
    const { customOptions, annotations } = args;

    const typeConfig = this.chartConfigService.getTypeConfig(this.chartType);
    const typeConfigOptions = typeConfig?.options;
    const annotationPluginOptions = annotations
      ? this.annotationsDelegate.createAnnotationPluginOptionsObject(annotations)
      : {};

    const mergedOptions: ChartOptions = mergeDeepAll(
      typeConfigOptions,
      customOptions,
      annotationPluginOptions
    );

    return this.chartConfigService.applyInteractionFunctionsExtensions(mergedOptions);
  }

  protected getDefaultLabels(datasets: ChartDataset[]): ChartLabel | ChartLabel[] {
    /* 
      Chart.js requires labels along the index axis to render anything therefore
      use blank labels 
    */
    const largestDataset = datasets.reduce((previousDataset, currentDataset) =>
      previousDataset.data.length > currentDataset.data.length ? previousDataset : currentDataset
    );
    return Array(largestDataset.data.length).fill('');
  }

  private createConfigurationObject(
    type: ChartType,
    datasets: ChartDataset[],
    options: ChartOptions,
    labels?: ChartLabel[]
  ): ChartConfiguration {
    const typeConfig = this.chartConfigService.getTypeConfig(type);

    const indexAxis = typeConfig?.options?.indexAxis ?? 'x';
    const labelsToApply = this.getLabelsToApply({ labels, datasets, type, indexAxis });

    return mergeDeepAll(typeConfig, {
      data: {
        labels: labelsToApply,
        datasets,
      },
      options,
    }) as ChartConfiguration;
  }

  protected createDatasets(data: ChartDataset[] | number[]): ChartDataset[] {
    const datasets = isNumberArray(data) ? [{ data }] : data;

    if (this.highlightedElements)
      this.addHighlightedElementsToDatasets(this.highlightedElements, datasets);

    return datasets;
  }

  private destructivelyUpdateType(type: ChartType, customOptions?: ChartOptions) {
    const datasets = this.chart.data.datasets as ChartDataset[];
    const labels = this.chart.data.labels as ChartLabel[]; // chart.js stores labels as unknown[]; cast it to ChartLabel[]
    const annotations = this.annotationsDelegate.getExistingChartAnnotations(this.chart);

    this.chartType = type;
    const options = this.createOptionsObject({ customOptions, annotations });
    const config = this.createConfigurationObject(type, datasets, options, labels);
    const canvasElement = this.chart.canvas;

    this.chart.destroy();
    this.initializeNewChart(canvasElement, config);
  }

  private nonDestructivelyUpdateType(chartType: ChartType, customOptions?: ChartOptions) {
    const annotations = this.annotationsDelegate.getExistingChartAnnotations(this.chart);
    this.chartType = chartType;
    const options = this.createOptionsObject({
      customOptions,
      annotations,
    });

    this.chart.options = options;

    if (chartConfigHasType(this.chart.config)) {
      this.chart.config.type = this.chartConfigService.chartTypeToChartJSType(chartType);
    }
  }

  private initializeNewChart(canvasElement: HTMLCanvasElement, config: ChartConfiguration) {
    this.chart = new Chart(canvasElement, config);
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

  private getLabelsToApply(args: {
    datasets: ChartDataset[];
    type: ChartType;
    indexAxis: 'x' | 'y';
    labels?: ChartLabel[];
  }) {
    const { datasets, labels, indexAxis } = args;

    const datasetHasLabels = ({ data }: ChartDataset) =>
      !!data?.some(
        (datapoint) => typeof datapoint === 'object' && typeof datapoint[indexAxis] === 'string'
      );

    /*
       Labels can be provided by the user two ways:
       1. As a seperate ChartLabel[] via the 'labels' input prop - this has highest priority
       2. Together with the dataset via the 'data' input prop - here each datapoint contains 
       a label for the indexAxis. 
       For example: { x: 'label1', y: 1} in the case where the index axis is 'x'. 

       If no labels are provided then default labels are used. 
    */
    const labelsAreGivenAsSeperateArray = labels !== undefined;
    const labelsAreGivenTogetherWithDataset = datasets.some(datasetHasLabels);

    if (labelsAreGivenAsSeperateArray) {
      return labels;
    } else if (labelsAreGivenTogetherWithDataset) {
      return null;
    } else {
      return this.getDefaultLabels(datasets);
    }
  }
}
