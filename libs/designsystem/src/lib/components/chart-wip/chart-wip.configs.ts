import { ChartType as ChartJSType } from 'chart.js';

import { ColorHelper, DesignTokenHelper } from '../../helpers';

const { fontSize } = DesignTokenHelper;
const { getThemeColorHexString } = ColorHelper;

export const CHART_GLOBAL_DEFAULTS = {
  maintainAspectRatio: false,
  elements: {
    bar: {
      backgroundColor: getThemeColorHexString('secondary'),
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
export const CHART_ANNOTATION_CONFIGS = {
  line: {
    borderDash: [6, 3],
    borderWidth: 1,
    drawTime: 'beforeDatasetsDraw',
    borderColor: getThemeColorHexString('semi-dark'),
  },
};
