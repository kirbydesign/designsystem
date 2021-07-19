import { ChartDataset as ChartJSDataset } from 'chart.js';

export type ChartHighlightedElements = number[][];

export type ChartType = 'column' | 'bar';

export interface ChartDataset extends ChartJSDataset<'bar'> {
  kirbyOptions?: {
    highlightedElements?: number[];
  };
}

export function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number');
}
