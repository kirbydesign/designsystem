import { ChartConfiguration, ChartType } from 'chart.js';
import { ColorHelper, DesignTokenHelper } from '../../../../helpers';

import { ChartBaseConfig } from '../chart-base-config';

const { getThemeColorHexString } = ColorHelper;
const { fontSize } = DesignTokenHelper;

/**
 * This class is still experimental. Feel free to use it, but please note that it is still subject to breaking changes.
 */
export class BarChartConfig extends ChartBaseConfig {
  public static baseConfig: ChartConfiguration<ChartType> = {
    type: 'bar',
    data: {
      datasets: [],
    },
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
  };
}
