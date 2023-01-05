import { ColorHelper } from '@kirbydesign/designsystem/helpers';
import { ChartType, ScriptableContext } from 'chart.js';

import { ChartDataset } from '../../';

const { getThemeColorHexString } = ColorHelper;

const hoverBackgroundColor = getThemeColorHexString('primary');
const backgroundColor = getThemeColorHexString('secondary');

function scriptedBackgroundColor(context: ScriptableContext<ChartType>) {
  const dataset = context.dataset as ChartDataset;
  const highlightedElements = dataset?.kirbyOptions?.highlightedElements;

  if (highlightedElements && highlightedElements.includes(context.dataIndex)) {
    return hoverBackgroundColor;
  } else {
    return backgroundColor;
  }
}

// Only adds a hovercolor if an onClick handler is provided
function scriptedHoverBackgroundColor(context: ScriptableContext<ChartType>) {
  if (context.chart.options.onClick) {
    return hoverBackgroundColor;
  }
}

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
