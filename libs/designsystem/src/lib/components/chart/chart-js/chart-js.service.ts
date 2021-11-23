import { ElementRef, Injectable } from '@angular/core';
import { ActiveElement, ChartConfiguration, ChartOptions, ScatterDataPoint } from 'chart.js';
import { AnnotationOptions } from 'chartjs-plugin-annotation';
import { format, toDate } from 'date-fns';
import da from 'date-fns/locale/da';
import enUS from 'date-fns/locale/en-US';

import { mergeDeepAll } from '../../../helpers/merge-deep';
import {
  ChartDataset,
  ChartHighlightedElements,
  ChartType,
  ChartTypes,
  dataDateSpan,
  datalabelOptions,
  isNumberArray,
} from '../chart.types';
import { ChartConfigService } from '../configs/chart-config.service';

import { Chart } from './configured-chart-js';

@Injectable()
export class ChartJSService {
  private chart: Chart;

  constructor(private chartConfigService: ChartConfigService) {}

  public renderChart(args: {
    targetElement: ElementRef<HTMLCanvasElement>;
    type: ChartType;
    data: ChartDataset[] | number[];
    dataLabels?: string[] | string[][];
    customOptions?: ChartOptions;
    annotations?: AnnotationOptions[];
    datalabelOptions?: datalabelOptions;
    highlightedElements?: ChartHighlightedElements;
  }): void {
    const {
      targetElement,
      type,
      data,
      dataLabels,
      customOptions,
      annotations,
      datalabelOptions,
      highlightedElements,
    } = args;

    const suffix = datalabelOptions?.valueSuffix ? datalabelOptions.valueSuffix : '';

    // We need to modify the datasets in order to add tooltips.
    const datasets =
      datalabelOptions?.showCurrent || datalabelOptions?.showMax || datalabelOptions?.showMin
        ? this.createDatasets(this.addTooltips(data, datalabelOptions, suffix), highlightedElements)
        : this.createDatasets(data, highlightedElements);

    const options = this.createOptionsObject({ type, customOptions, annotations });
    let config = this.createConfigurationObject(type, datasets, options, dataLabels);

    if (type === ChartTypes.stock) {
      config.options.plugins.tooltip.callbacks.label = (context) => {
        return context.formattedValue + suffix;
      };

      config.options.scales.y.ticks.callback = (value) => {
        return value + suffix;
      };

      // The first dataset controls the datespan.
      const chartPeriod = this.chartConfigService.findChartPeriod(datasets[0]);
      config.options = this.handleLocalization(
        config.options,
        chartPeriod,
        datalabelOptions.locale
      );
    }

    this.initializeNewChart(targetElement.nativeElement, config);
  }

  private getLocale(key: string) {
    return { 'da-DK': da, 'en-US': enUS }[key];
  }
  private getDisplayFormats(key: string) {
    return {
      'da-DK': {
        hour: 'HH:mm',
        day: 'd MMM',
      },
      'en-US': {
        hour: 'HH:mm',
        day: 'MMM d',
      },
    }[key];
  }

  private handleLocalization(options, chartPeriod: dataDateSpan, language: string): ChartOptions {
    language = language || 'en-US';
    // Handle localization in graph.
    options.locale = language;

    // Update chart options with the given period.
    const scaleX = options.scales.x;
    scaleX.time.unit = chartPeriod;
    scaleX.adapters = {
      date: {
        locale: this.getLocale(language),
      },
    };
    scaleX.time.displayFormats = this.getDisplayFormats(language);

    let tooltipDateformat = '';
    switch (chartPeriod) {
      case dataDateSpan.oneDay:
        tooltipDateformat = 'HH:mm';
        break;
      case dataDateSpan.oneWeek:
      case dataDateSpan.oneMonth:
      case dataDateSpan.threeMonths:
      case dataDateSpan.sixMonths:
      case dataDateSpan.oneMonth:
      case dataDateSpan.oneYear:
        tooltipDateformat = this.getDisplayFormats(language).day;
        break;
      case dataDateSpan.fiveYears:
        tooltipDateformat = 'LLL yy';
        break;
    }

    options.plugins.tooltip.callbacks.title = (tooltipItems) => {
      const date = toDate(tooltipItems[0]?.parsed?.x);
      if (date.valueOf()) {
        return format(date, tooltipDateformat, { locale: this.getLocale(language) });
      }
    };

    return options;
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
    } else {
      this.nonDestructivelyUpdateType(type, customOptions);
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

  private getExistingChartAnnotations(): AnnotationOptions[] {
    const annotations = this.chart.options.plugins?.annotation?.annotations;
    /* In browser chart.js might return annotations as a Proxy object; force it to be an array.
       Each annotationOption in the resulting array  will also be a Proxy object. 
       But internally chart.js will just work with them as normal values */
    if (annotations !== undefined) {
      return Object.keys(annotations).map((key) => annotations[key]);
    } else {
      return [];
    }
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

  private nonDestructivelyUpdateType(chartType: ChartType, customOptions?: ChartOptions) {
    const annotations = this.getExistingChartAnnotations();
    const options = this.createOptionsObject({
      type: chartType,
      customOptions,
      annotations,
    });

    this.chart.options = options;
    this.chart.config.type = this.chartConfigService.chartTypeToChartJSType(chartType);
  }

  private initializeNewChart(canvasElement: HTMLCanvasElement, config: ChartConfiguration) {
    this.chart = new Chart(canvasElement, config);
  }

  private createBlankLabels(datasets: ChartDataset[]): string[] {
    const largestDataset = datasets.reduce((previousDataset, currentDataset) =>
      previousDataset.data.length > currentDataset.data.length ? previousDataset : currentDataset
    );
    return Array(largestDataset.data.length).fill('');
  }

  private applyDefaultsToAnnotations(annotations: AnnotationOptions[]) {
    return annotations.map((annotation) => {
      const annotationTypeDefaults = this.chartConfigService.getAnnotationDefaults(annotation.type);
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
    const interactionFunctionsExtensions = this.chartConfigService.getInteractionFunctionsExtensions();
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

    const typeConfig = this.chartConfigService.getTypeConfig(type);
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
    const typeConfig = this.chartConfigService.getTypeConfig(type);

    // chartJS requires labels; if none is provided create an empty string array
    // to make it optional for consumer.
    // However the stock chart, shouldn't have any custom datalabels supplied.
    // This type of chart uses `Time Cartesian Axis` and generates it's own labels.
    const noLabelsForStockType = type !== ChartTypes.stock;
    const labels =
      !dataLabels && noLabelsForStockType ? this.createBlankLabels(datasets) : dataLabels;

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

  private addTooltips(
    data: ChartDataset[] | number[],
    datalabelOptions: datalabelOptions,
    suffix: string
  ): ChartDataset[] | number[] {
    if (isNumberArray(data)) {
      throw Error("Currently it's impossible to add tooltips to non ScatterDataPoint datasets");
    }

    data.map((set) => {
      if (datalabelOptions.showMin) {
        const { value, pointer } = this.locateValueIndexInDataset(set, 'y', 'low');
        set.data[pointer] = {
          ...(set.data[pointer] as ScatterDataPoint),
          datalabel: {
            value: value + suffix,
            position: 'bottom',
          },
        } as ScatterDataPoint;
      }
      if (datalabelOptions.showMax) {
        const { value, pointer } = this.locateValueIndexInDataset(set, 'y', 'high');
        set.data[pointer] = {
          ...(set.data[pointer] as ScatterDataPoint),
          datalabel: {
            value: value + suffix,
            position: 'top',
          },
        } as ScatterDataPoint;
      }
      if (datalabelOptions.showCurrent) {
        const { value, pointer } = this.locateValueIndexInDataset(set, 'x', 'high');
        set.data[pointer] = {
          ...(set.data[pointer] as ScatterDataPoint),
          value,
          datalabel: {
            value: value + suffix,
            position: 'right',
          },
        } as ScatterDataPoint;
      }
    });

    return data;
  }

  private locateValueIndexInDataset(
    dataset: ChartDataset,
    axis: string,
    direction: 'low' | 'high'
  ): { value: number; pointer: number } {
    let pointer: number;
    let value: number;
    dataset.data.forEach((datapoint, index) => {
      if (direction == 'low' && (!value || datapoint[axis] < value)) {
        value = datapoint['y'];
        pointer = index;
      }
      if (direction == 'high' && (!value || datapoint[axis] > value)) {
        value = datapoint['y'];
        pointer = index;
      }
    });
    return { value, pointer };
  }
}
