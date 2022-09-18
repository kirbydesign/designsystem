import { ChartDataset as ChartJSDataset, ChartType as ChartJSType, ChartOptions } from 'chart.js';

export type ChartHighlightedElements = number[][];

export type ChartType = 'column' | 'bar' | 'line' | 'stock';

export type ChartTypeConfig = { type: ChartJSType; options?: ChartOptions };

export type ChartTypesConfig = {
  [key in ChartType]: ChartTypeConfig;
};
export type ChartLabel = string | string[]; // String[] allows for multi-line labels

export type ChartDataLabelOptions = {
  showMin?: boolean;
  showMax?: boolean;
  showCurrent?: boolean;
  locale?: ChartLocale;
  valueSuffix?: string;
};

export type ChartLocale = 'da-DK' | 'en-US';

/* 
  kirbyOptions.isStockChart is a hacky solution to this issue: 
  https://github.com/kirbydesign/designsystem/issues/1967 
*/
export type ChartDataset = {
  kirbyOptions?: { highlightedElements?: number[]; isStockChart?: boolean };
} & ChartJSDataset;

export function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number');
}
