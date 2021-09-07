import { ChartDataset as ChartJSDataset, ChartOptions, ChartType as ChartJSType } from 'chart.js';

export type ChartHighlightedElements = number[][];

interface ChartTypeRegistry {
  column: any;
  bar: any;
  line: any;
}

export type ChartType = keyof ChartTypeRegistry;

export type ChartTypeConfigs = {
  [key in ChartType]: { type: ChartJSType; options?: ChartOptions };
};

//TODO: update this type to include 'line'
export interface ChartDataset extends ChartJSDataset<'bar'> {
  kirbyOptions?: {
    highlightedElements?: number[];
  };
}

export function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number');
}
