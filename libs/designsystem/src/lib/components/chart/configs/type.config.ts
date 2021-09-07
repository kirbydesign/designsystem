import { ActiveElement, Chart, ChartEvent, ChartOptions } from 'chart.js';
import { AnnotationTypeRegistry } from 'chartjs-plugin-annotation';

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
const borderDash: [number, number] = [6, 3];
const borderWidth = 1;

export const CHART_ANNOTATIONS_CONFIG: AnnotationTypeRegistry = {
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
  point: {
    backgroundColor: 'initial',
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
