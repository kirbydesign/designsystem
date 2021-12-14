import { ChartDataset as ChartJSDataset, ChartOptions, ChartType as ChartJSType } from 'chart.js';

export type ChartHighlightedElements = number[][];

export type ChartType = 'column' | 'bar' | 'line' | 'stock';

export type ChartTypeConfig = { type: ChartJSType; options?: ChartOptions };

export type ChartTypesConfig = {
  [key in ChartType]: ChartTypeConfig;
};

export type ChartDataLabelOptions = {
  showMin?: boolean;
  showMax?: boolean;
  showCurrent?: boolean;
  locale?: ChartLocale;
  valueSuffix?: string;
};

export type ChartLocale = 'da-DK' | 'en-US';

export type ChartDataset = { kirbyOptions?: { highlightedElements?: number[] } } & ChartJSDataset;

export function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number');
}
