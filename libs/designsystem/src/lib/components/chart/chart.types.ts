import { ChartDataset as ChartJSDataset, ChartOptions, ChartType as ChartJSType } from 'chart.js';

export type ChartHighlightedElements = number[][];

export enum ChartTypes {
  column = 'column',
  bar = 'bar',
  line = 'line',
  stock = 'stock',
}

export type ChartType = ChartTypes.column | ChartTypes.bar | ChartTypes.line | ChartTypes.stock;

export type ChartTypeConfig = { type: ChartJSType; options?: ChartOptions };

export type ChartTypesConfig = {
  [key in ChartType]: ChartTypeConfig;
};

export type datalabelOptions = {
  showMin?: boolean;
  showMax?: boolean;
  showCurrent?: boolean;
  locale?: 'en-US' | 'da-DK';
};

export type ChartDataset = { kirbyOptions?: { highlightedElements?: number[] } } & ChartJSDataset;

export function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number');
}

export enum dataDateSpan {
  oneDay = 'hour',
  oneWeek = 'day',
  oneMonth = 'day',
  threeMonths = 'day',
  sixMonths = 'day',
  oneYear = 'quarter',
  fiveYears = 'year',
}
