import { ColorHelper } from '@kirbydesign/designsystem/helpers';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ChartLocale } from '../../shared';

import { ChartBaseConfig } from '../chart-base-config';

const { getThemeColorHexString } = ColorHelper;

/**
 * This class is still experimental. Feel free to use it, but please note that it is still subject to breaking changes.
 */
export class BarChartConfig extends ChartBaseConfig {
  private static BAR_CHART_LOCALE_DEFAULT: ChartLocale = 'en-US';

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
        },
        x: {},
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
