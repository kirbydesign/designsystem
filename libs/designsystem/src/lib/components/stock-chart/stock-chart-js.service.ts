import { Injectable } from '@angular/core';
import { ChartDataset, ChartOptions, ScatterDataPoint } from 'chart.js';
import { toDate } from 'date-fns';

import { ChartDataLabelOptions, ChartLocale } from '../chart';
import { ChartJSService } from '../chart/chart-js/chart-js.service';

// TODO: Make it part of Class
const CHART_LOCALE_DEFAULT = 'en-US';

@Injectable()
export class StockChartJSService extends ChartJSService {
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
    return datasets.map((dataset: any) => ({
      ...dataset,
      kirbyOptions: { ...dataset.kirbyOptions, isStockChart: true },
    }));
  }
}
