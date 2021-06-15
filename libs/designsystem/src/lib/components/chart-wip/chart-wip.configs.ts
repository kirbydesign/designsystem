import { ChartType as ChartJSType } from 'chart.js';

import { ChartType } from './chart-wip.types';

export const CHART_TYPE_CONFIGS = {
  [ChartType.bar]: {
    type: 'bar' as ChartJSType,
    options: {
      indexAxis: 'y',
    },
  },
  [ChartType.column]: {
    type: 'bar' as ChartJSType,
    options: {
      indexAxis: 'x',
    },
  },
};
