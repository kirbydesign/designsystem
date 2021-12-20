import { ColorHelper } from '../../../helpers';

import { scriptedBackgroundColor, scriptedHoverBackgroundColor } from './shared.utils';

const { getThemeColorHexString } = ColorHelper;

export const CHART_GLOBAL_DEFAULTS = {
  maintainAspectRatio: false,
  color: getThemeColorHexString('black'),
  resizeDelay: 10,
  elements: {
    bar: {
      backgroundColor: scriptedBackgroundColor,
      hoverBackgroundColor: scriptedHoverBackgroundColor,
    },
    line: {
      borderColor: scriptedBackgroundColor,
      borderWidth: 2,
      tension: 0.3,
    },
  },
  scales: {
    linear: {
      display: false,
      ticks: {
        display: false,
      },
    },
    category: {
      display: true,
      grid: {
        display: false,
      },
    },
  },
  font: {
    family: 'Roboto',
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};
