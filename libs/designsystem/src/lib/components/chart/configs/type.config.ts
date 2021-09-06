import { ActiveElement, Chart, ChartEvent, ChartOptions } from 'chart.js';

import { ColorHelper, DesignTokenHelper } from '../../../helpers';

const { fontSize } = DesignTokenHelper;
const { getThemeColorHexString } = ColorHelper;

export const CHART_TYPE_CONFIGS = {
  bar: {
    type: 'bar',
    options: {
      barPercentage: 0.6,
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
          pointRadius: 0,
        },
        line: {
          spanGaps: true,
          borderColor: getThemeColorHexString('medium'),
        },
      },
    },
  },
  column: {
    type: 'bar',
    options: {
      barPercentage: 0.6,
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
  line: {
    type: 'line',
    options: {
      elements: {
        point: {
          radius: 0,
        },
      },
    },
  },
};

/* TODO: Find a proper place to store these two */
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
