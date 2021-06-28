import { ChartType as ChartJSType } from 'chart.js';

export const CHART_TYPE_CONFIGS = {
  bar: {
    type: 'bar' as ChartJSType,
    options: {
      indexAxis: 'y',
    },
  },
  column: {
    type: 'bar' as ChartJSType,
    options: {
      indexAxis: 'x',
    },
  },
};
