import { ElementRef, Injectable } from '@angular/core';
import { mergeDeepAll } from '@kirbydesign/designsystem/helpers';
import { ChartDataset, ChartOptions, ScatterDataPoint } from 'chart.js';
import { AnnotationOptions } from 'chartjs-plugin-annotation';
import { toDate } from 'date-fns';

import {
  ChartDataLabelOptions,
  ChartHighlightedElements,
  ChartJSService,
  ChartLabel,
  ChartLocale,
  ChartType,
} from '../shared';

@Injectable()
export class StockChartJSService extends ChartJSService {
  static STOCK_CHART_LOCALE_DEFAULT: ChartLocale = 'en-US';

  protected readonly chartType = 'stock';
  private dataLabelOptions: ChartDataLabelOptions;

  public renderChart(args: {
    targetElement: ElementRef<HTMLCanvasElement>;
    type: ChartType;
    data: ChartDataset[] | number[];
    labels?: ChartLabel[];
    customOptions?: ChartOptions;
    annotations?: AnnotationOptions[];
    dataLabelOptions?: ChartDataLabelOptions;
    highlightedElements?: ChartHighlightedElements;
  }): void {
    const { dataLabelOptions, ...superArgs } = args;
    this.dataLabelOptions = dataLabelOptions || null;
    super.renderChart(superArgs);
  }

  private get locale(): ChartLocale {
    return this.dataLabelOptions?.locale || StockChartJSService.STOCK_CHART_LOCALE_DEFAULT;
  }

  protected getDefaultLabels(datasets: ChartDataset[]) {
    const largestDataset = datasets.reduce((previousDataset, currentDataset) =>
      previousDataset.data.length > currentDataset.data.length ? previousDataset : currentDataset
    );
    return largestDataset.data.map((point: ScatterDataPoint) =>
      toDate(point.x).toLocaleDateString(this.locale, {
        month: 'short',
        day: 'numeric',
      })
    );
  }

  protected createOptionsObject(args: {
    customOptions?: ChartOptions;
    annotations?: AnnotationOptions[];
  }): ChartOptions {
    const superOptions = super.createOptionsObject(args);
    const stockOptions: ChartOptions = this.chartConfigService.getStockChartOptions(
      this.dataLabelOptions,
      this.locale
    );

    return mergeDeepAll(stockOptions, superOptions);
  }

  protected createDatasets(data: ChartDataset[] | number[]) {
    let datasets = super.createDatasets(data);
    /* 
       Hacky solution. Should be fixed in this issue:
      https://github.com/kirbydesign/designsystem/issues/1967 
    */
    // We need to modify the datasets in order to add datalabels.
    if (
      this.dataLabelOptions?.showCurrent ||
      this.dataLabelOptions?.showMax ||
      this.dataLabelOptions?.showMin
    ) {
      datasets = this.addDataLabelsData(datasets);
    }

    return datasets.map((dataset: any) => ({
      ...dataset,
      kirbyOptions: { ...dataset.kirbyOptions, isStockChart: true },
    }));
  }

  /**
   * Decorate ChartDataset with properties to allow for datalabels.
   *
   * @param data
   * @returns ChartDataset[]
   */
  private addDataLabelsData(data: ChartDataset[]): ChartDataset[] {
    const decorateDataPoint = (
      set: ChartDataset,
      axis: 'x' | 'y',
      direction: 'high' | 'low',
      position: 'bottom' | 'top' | 'left' | 'right'
    ): void => {
      const { value, pointer } = this.locateValueIndexInDataset(set, axis, direction);
      set.data[pointer] = {
        ...(set.data[pointer] as ScatterDataPoint),
        datalabel: {
          value: value + (this.dataLabelOptions.valueSuffix || ''),
          position,
        },
      } as ScatterDataPoint;
    };

    data.map((set) => {
      if (this.dataLabelOptions.showMin) {
        decorateDataPoint(set, 'y', 'low', 'bottom');
      }
      if (this.dataLabelOptions.showMax) {
        decorateDataPoint(set, 'y', 'high', 'top');
      }
      if (this.dataLabelOptions.showCurrent) {
        decorateDataPoint(set, 'x', 'high', 'right');
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
