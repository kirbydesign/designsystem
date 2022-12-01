import { ChartConfiguration, ChartType } from 'chart.js';
import { ColorHelper, DesignTokenHelper } from '../../../../helpers';
import { ChartLocale } from '../../shared';

import { ChartBaseConfig } from '../chart-base-config';

const { getThemeColorHexString } = ColorHelper;
const { fontSize } = DesignTokenHelper;

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
      indexAxis: 'y',
      scales: {
        y: {
          grid: {
            drawBorder: false,
          },
          ticks: {
            callback(tickValue, index, ticks) {
              console.log(tickValue, index, ticks);
              const dateInMiliseconds = parseInt(this.getLabelForValue(parseInt(tickValue + '')));

              return BarChartConfig.getDateAsddMMYYY(
                dateInMiliseconds,
                BarChartConfig.BAR_CHART_LOCALE_DEFAULT
              );
            },
            font: {
              size: parseInt(fontSize('s')),
            },
          },
        },
        x: {
          ticks: {
            callback(tickValue, index, ticks) {
              console.log(tickValue, index, ticks);
              const dateInMiliseconds = parseInt(this.getLabelForValue(parseInt(tickValue + '')));

              return BarChartConfig.getDateAsddMMYYY(
                dateInMiliseconds,
                BarChartConfig.BAR_CHART_LOCALE_DEFAULT
              );
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

  public static getDateAsMMYYY = (dateInMiliseconds: number, locale: ChartLocale) => {
    const date = new Date(dateInMiliseconds);

    return date.toLocaleDateString(locale, {
      month: 'short',
      year: 'numeric',
    });
  };

  public static getDateAsddMMYYY = (dateInMiliseconds: number, locale: ChartLocale) => {
    const date = new Date(dateInMiliseconds);

    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
}
