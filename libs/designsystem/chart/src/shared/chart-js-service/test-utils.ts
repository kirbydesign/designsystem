import { AnnotationTypeRegistry } from 'chartjs-plugin-annotation';
import { ChartTypesConfig } from '../charts.types';

export const TEST_CHART_TYPES_CONFIG: ChartTypesConfig = {
  bar: {
    type: 'bar',
    options: {
      indexAxis: 'y',
      elements: {
        line: {
          borderColor: 'blue',
        },
      },
    },
  },
  column: {
    type: 'bar',
    options: {
      backgroundColor: 'red',
    },
  },
  line: {
    type: 'line',
    options: {
      backgroundColor: 'blue',
      elements: {
        line: {
          borderColor: 'red',
        },
      },
    },
  },
  stock: {
    type: 'line',
    options: {
      locale: 'en-US',
      responsive: true,
      animation: {
        duration: 0,
      },
      layout: {
        padding: {
          left: 0,
          right: 10,
          top: 30,
          bottom: 0,
        },
      },
      backgroundColor: 'rgba(235, 235, 235, 0.5)',
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              hour: 'HH:mm',
              day: 'MMM d',
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
              size: 12,
            },
          },
          adapters: {
            date: {
              locale: {
                code: 'en-US',
                formatLong: {},
                localize: {},
                match: {},
                options: {
                  weekStartsOn: 0,
                  firstWeekContainsDate: 1,
                },
              },
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
              size: 12,
            },
          },
        },
      },
      elements: {
        line: {
          tension: 0,
          borderWidth: 2,
        },
        point: {
          hitRadius: 20,
          radius: 0,
          hoverRadius: 0,
          hoverBorderWidth: 0,
        },
      },
      normalized: true,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
          caretSize: 1,
          caretPadding: 12,
          displayColors: true,
          backgroundColor: '#ebebeb',
          padding: 8,
          titleColor: 'black',
          bodyColor: 'black',
          titleFont: {
            weight: 'normal',
            size: 12,
          },
          bodyFont: {
            size: 16,
            weight: 'bold',
          },
          callbacks: {},
        },
        // marker: {
        //   line: {
        //     color: 'red',
        //   },
        // },
        datalabels: {
          color: '#ffffff',
          borderRadius: 3,
          font: {
            lineHeight: 1,
            size: 12,
          },
          padding: {
            top: 6,
            left: 5,
            right: 5,
            bottom: 5,
          },
          offset: 5,
        },
      },
    },
  },
};

export const TEST_CHART_ANNOTATIONS_CONFIG: Omit<AnnotationTypeRegistry, 'label' | 'polygon'> = {
  line: {
    borderDash: [6, 3],
  },
  ellipse: {
    borderDash: [3, 6],
  },
  box: {},
  point: {
    backgroundColor: 'initial',
  },
};
