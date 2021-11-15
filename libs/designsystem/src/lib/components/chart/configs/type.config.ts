import { format, toDate } from 'date-fns-tz';
import { da } from 'date-fns/locale';

import { ColorHelper, DesignTokenHelper } from '../../../helpers';
import { ChartTypesConfig } from '../chart.types';

const { fontSize } = DesignTokenHelper;
const { getThemeColorHexString, getThemeColorRgbString } = ColorHelper;

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
      backgroundColor: getThemeColorRgbString('semi-light', 0.5),
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
  stock: {
    type: 'line',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0,
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 30,
          bottom: 0,
        },
      },
      backgroundColor: getThemeColorRgbString('semi-light', 0.5),
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month',
            displayFormats: {
              hour: 'HH',
              day: 'D MMM',
            },
          },

          grid: {
            lineWidth: 0,
          },
          ticks: {
            maxRotation: 0,
            source: 'data',
            autoSkipPadding: 40,
            font: {
              size: 11,
            },
          },
        },
        y: {
          position: 'right',
          display: true,
          grid: {
            drawBorder: false,
          },
          ticks: {
            display: true,
            font: {
              size: parseInt(fontSize('xs')),
            },
          },
        },
      },
      elements: {
        line: {
          tension: 0, // Smooth curve (0 = no smoothing)
          borderWidth: 2,
        },
        point: {
          hitRadius: 20,
          radius: 0,
          hoverRadius: 8,
          hoverBackgroundColor: getThemeColorHexString('primary'),
          hoverBorderWidth: 0,
        },
      },
      normalized: true,
      hover: {
        axis: 'xy',
        mode: 'nearest',
        intersect: false,
      },
      plugins: {
        tooltip: {
          mode: 'nearest',
          intersect: false,
          caretSize: 1,
          caretPadding: 12,
          displayColors: false,
          backgroundColor: getThemeColorHexString('semi-light'),
          padding: 8,
          titleColor: 'black',
          bodyColor: 'black',
          titleFont: {
            weight: 'normal',
            size: 12,
          },
          bodyFont: {
            size: 15,
            weight: 'bold',
          },
          filter: function(tooltipItem) {
            return tooltipItem.datasetIndex === 0;
          },
          callbacks: {
            label: (context) => {
              return context.formattedValue;
            },
            title: (tooltipItems): string => {
              const date = toDate(tooltipItems[0]?.parsed?.x);
              if (date.valueOf()) {
                return format(date, 'PP', { locale: da });
              }
            },
          },
        },
      },
    },
  },
};
