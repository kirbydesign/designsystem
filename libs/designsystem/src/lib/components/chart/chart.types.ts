import { ChartDataset as ChartJSDataset, ChartOptions, ChartType as ChartJSType } from 'chart.js';

export type ChartHighlightedElements = number[][];

export type ChartType = 'column' | 'bar' | 'line';

export type ChartTypeConfig = { type: ChartJSType; options?: ChartOptions };

export type ChartTypesConfig = {
  [key in ChartType]: ChartTypeConfig;
};

export type ChartDataset = { kirbyOptions?: { highlightedElements?: number[] } } & ChartJSDataset;

export function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number');
}
