import { ChartType as ChartJSType, ScriptableContext } from 'chart.js';

import { ColorHelper, DesignTokenHelper } from '../../helpers';

import { ChartWipDataset } from '.';

const { fontSize } = DesignTokenHelper;
const { getThemeColorHexString } = ColorHelper;

function scriptedBackgroundColor(context: ScriptableContext<'bar'>) {
  const dataset = context.dataset as ChartWipDataset;
  const highlightedElements = dataset?.kirbyOptions?.highlightedElements;

  if (highlightedElements && highlightedElements.includes(context.dataIndex)) {
    return 'red';
  } else {
    return getThemeColorHexString('secondary');
  }
}

export const CHART_GLOBAL_DEFAULTS = {
  maintainAspectRatio: false,
  elements: {
    bar: {
      backgroundColor: scriptedBackgroundColor,
      hoverBackgroundColor: getThemeColorHexString('primary'),
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
    size: parseInt(fontSize('xs')),
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const CHART_TYPE_CONFIGS = {
  bar: {
    type: 'bar' as ChartJSType,
    options: {
      barPercentage: 0.6,
      indexAxis: 'y',
      elements: {
        point: {
          pointRadius: 0,
        },
        line: {
          spanGaps: true,
          tension: 0.2,
          borderColor: getThemeColorHexString('medium'),
        },
      },
    },
  },
  column: {
    type: 'bar' as ChartJSType,
    options: {
      barPercentage: 0.6,
      indexAxis: 'x',
      elements: {
        line: {
          spanGaps: true,
          tension: 0.2,
          borderColor: getThemeColorHexString('medium'),
        },
        point: {
          pointRadius: 0,
        },
      },
    },
  },
};

/* The chart.js annotation does not allow for changing the 
defaults it comes with. In order to have sensible defaults 
this object is used instead and manually merged with the 
rest of the annotations object */
const borderColor = getThemeColorHexString('semi-dark');
const borderDash = [6, 3];
const borderWidth = 1;

export const CHART_ANNOTATION_CONFIGS = {
  line: {
    borderDash,
    borderWidth,
    borderColor,
  },
  ellipse: {
    borderDash,
    borderWidth,
    borderColor,
    backgroundColor: 'transparent',
  },
  box: {
    borderDash,
    borderWidth,
    borderColor,
    backgroundColor: 'transparent',
  },
};
