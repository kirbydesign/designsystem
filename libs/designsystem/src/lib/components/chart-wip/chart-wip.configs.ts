import { ChartType as ChartJSType } from 'chart.js';

import { ColorHelper } from '../../helpers';

const { getThemeColorHexString } = ColorHelper;

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
