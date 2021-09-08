import { ActiveElement, Chart, ChartEvent, ChartOptions } from 'chart.js';

import { ColorHelper, DesignTokenHelper } from '../../../helpers';
import { ChartTypesConfig } from '../chart.types';

const { fontSize } = DesignTokenHelper;
const { getThemeColorHexString } = ColorHelper;

export const CHART_TYPES_CONFIG: ChartTypesConfig = {
  bar: {
    type: 'bar',
    options: {
      datasets: {
        bar: {
          barPercentage: 0.6,
        },
        line: {
          spanGaps: true,
        },
      },
      indexAxis: 'y',
      scales: {
        y: {
          grid: {
            drawBorder: false,
          },
          ticks: {
            font: {
              size: parseInt(fontSize('s')),
            },
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
        line: {
          borderColor: getThemeColorHexString('medium'),
        },
      },
    },
  },
  column: {
    type: 'bar',
    options: {
      datasets: {
        bar: {
          barPercentage: 0.6,
        },
        line: {
          spanGaps: true,
        },
      },
      indexAxis: 'x',
      scales: {
        x: {
          grid: {
            drawBorder: false,
          },
          ticks: {
            font: {
              size: parseInt(fontSize('xs')),
            },
          },
        },
      },
      elements: {
        line: {
          tension: 0.2,
          borderColor: getThemeColorHexString('medium'),
        },
        point: {
          radius: 0,
        },
      },
    },
  },
  line: {
    type: 'line',
    options: {
      color: getThemeColorHexString('semi-dark'),
      scales: {
        x: {
          grid: {
            borderColor: getThemeColorHexString('medium'),
            borderWidth: 1,
          },
          ticks: {
            font: {
              size: parseInt(fontSize('xs')),
            },
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    },
  },
};

/* Allows for adding functionality to interactions chart.js while 
preserving the interaction functionality the consumer of the component has 
passed by being provided as a callback. */
export const INTERACTION_FUNCTIONS_EXTENSIONS = {
  onHover: (
    _event: ChartEvent,
    activeElements: ActiveElement[],
    _chart: Chart,
    callback: ChartOptions['onHover']
  ) => {
    if (_chart.options.onClick) {
      _chart.canvas.style.cursor = activeElements[0] ? 'pointer' : 'default';
    }

    if (callback) callback(_event, activeElements, _chart);
  },
};
