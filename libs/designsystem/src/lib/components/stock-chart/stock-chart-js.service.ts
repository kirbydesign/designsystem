import { ElementRef, Injectable } from '@angular/core';
import { ChartDataset, ChartOptions, ScatterDataPoint } from 'chart.js';
import { toDate } from 'date-fns';

import {
  AnnotationOptions,
  ChartDataLabelOptions,
  ChartHighlightedElements,
  ChartLabel,
  ChartLocale,
  ChartType,
} from '../chart';
import { ChartJSService } from '../chart/chart-js/chart-js.service';

// TODO: Make it part of Class
const CHART_LOCALE_DEFAULT = 'en-US';

@Injectable()
export class StockChartJSService extends ChartJSService {
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
    this.dataLabelOptions = args.dataLabelOptions || null;
    super.renderChart(superArgs);
  }

  private get locale(): ChartLocale {
    return this.dataLabelOptions?.locale || CHART_LOCALE_DEFAULT;
  }

  protected getDefaultLabels(datasets: ChartDataset[]) {
    return this.getDefaultStockLabels(datasets, this.locale);
  }

  protected createOptionsObjectHook(args: any[]) {
    const stockOptions: ChartOptions = this.createStockOptionsObject(this.dataLabelOptions);
    return [stockOptions, ...args];
  }

  private createStockOptionsObject(dataLabelOptions: ChartDataLabelOptions) {
    return {
      locale: this.locale,
      plugins: {
        tooltip: {
          callbacks: {
            title: (tooltipItems) => {
              const date = toDate((tooltipItems[0]?.raw as any)?.x);
              if (date.valueOf()) {
                return date.toLocaleTimeString(this.locale, {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                });
              }
            },
            label: (context) => {
              // It's not possible to add spacing between color legend and text so we
              // prefix with a space.
              return ' ' + context.formattedValue + (dataLabelOptions.valueSuffix || '');
            },
          },
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => {
              return value + (dataLabelOptions.valueSuffix || '');
            },
          },
        },
      },
    };
  }

  private getDefaultStockLabels(datasets: ChartDataset[], locale: ChartLocale) {
    const largestDataset = datasets.reduce((previousDataset, currentDataset) =>
      previousDataset.data.length > currentDataset.data.length ? previousDataset : currentDataset
    );
    return largestDataset.data.map((point: ScatterDataPoint) =>
      toDate(point.x).toLocaleDateString(locale, {
        month: 'short',
        day: 'numeric',
      })
    );
  }

  /* TODO: This might just be used for testing...? */
  public setDataLabelOptions(dataLabelOptions: ChartDataLabelOptions) {
    this.dataLabelOptions = dataLabelOptions;
  }

  protected createDatasetsHook(datasets: ChartDataset[]) {
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
