import { ChartDataset as ChartJSDataset } from 'chart.js';

export enum ChartType {
  column = 'column',
  bar = 'bar',
}

export type ChartDataset = ChartJSDataset<'bar'>;
export type ChartData = ChartDataset[] | number[];

export function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number');
}
