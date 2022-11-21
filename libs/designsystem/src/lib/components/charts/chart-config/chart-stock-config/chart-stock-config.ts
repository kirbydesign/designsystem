import {
  ChartConfiguration,
  ChartType,
  ChartTypeRegistry,
  TooltipCallbacks,
  TooltipItem,
  TooltipLabelStyle,
  TooltipOptions,
} from 'chart.js';
import { ColorHelper, DesignTokenHelper } from '../../../../helpers';
import { ChartLocale } from '../../shared';
import { ChartBaseConfig } from '../chart-base-config';
import {
  getDataLabelPosition,
  getDataLabelsPluginConfig,
} from './data-label-position/data-label-position';
import { getVerticalLinePluginConfig } from './vertical-line-plugin/vertical-line-plugin';

const { getThemeColorHexString, getThemeColorRgbString } = ColorHelper;
const { fontSize } = DesignTokenHelper;

export class StockChartConfig extends ChartBaseConfig {
  private STOCK_CHART_LOCALE_DEFAULT: ChartLocale = 'en-US';

  constructor() {
    super('line');
  }

  public getBasicConfig(): ChartConfiguration<ChartType> {
    return {
      type: 'line',
      data: {
        datasets: [],
      },
      options: {
        responsive: true,
        animation: {
          duration: 0,
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 30,
            bottom: 0,
          },
        },
        backgroundColor: getThemeColorRgbString('semi-light', 0.5),
        scales: {
          x: {
            adapters: {
              date: {
                locale: this.STOCK_CHART_LOCALE_DEFAULT,
              },
            },
            grid: {
              lineWidth: 0,
            },
            ticks: {
              maxRotation: 0,
              autoSkipPadding: 120,
              font: {
                size: parseInt(fontSize('xs')),
              },
              callback(tickValue) {
                const dateInMiliseconds = parseInt(this.getLabelForValue(parseInt(tickValue + '')));

                return getChartStockShortDate(dateInMiliseconds);
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
            hoverRadius: 0,
            hoverBorderWidth: 0,
          },
        },
        normalized: true,
        plugins: {},
      },
    };
  }

  public getTooltipPlugin(): Partial<TooltipOptions<'line'>> {
    return {
      padding: 10,
      enabled: true,
      mode: 'index',
      intersect: false,
      backgroundColor: getThemeColorHexString('semi-light'),
      titleColor: getThemeColorHexString('semi-light-contrast'),
      bodyColor: getThemeColorHexString('semi-light-contrast'),
      caretSize: 0,
      bodySpacing: 5,
      titleSpacing: 5,
      borderColor: 'transparent',
      callbacks: {
        title: (toolTipItem) => {
          const dateInMiliseconds = parseInt(toolTipItem[0].label); // TODO: Right now we use index === 0. I expect multiple datasets will change this
          return getChartStockShortDateTime(dateInMiliseconds);
        },
        label: (context) => context.parsed.y.toString(),
        labelColor: (tooltipItem: TooltipItem<keyof ChartTypeRegistry>) => {
          return {
            backgroundColor: tooltipItem.dataset.borderColor,
            borderColor: getThemeColorHexString('semi-light'),
            borderWidth: 2, // This value must be exactly 2. If it is less, a white "border" will appear, if greater than, a shadow around the box will be shown.
            // An issue has been created, requesting a test to check this value doesn´t change: https://github.com/kirbydesign/designsystem/issues/2578
          } as TooltipLabelStyle;
        },
      } as TooltipCallbacks<'line'>,
    };
  }

  public getDataLabelsPluginConfig = getDataLabelsPluginConfig;

  public getVerticalLinePluginConfig = getVerticalLinePluginConfig;

  public getDataLabelPosition = getDataLabelPosition;
}

const getChartStockShortDate = (dateInMiliseconds: number) => {
  const newDate = new Date(dateInMiliseconds);

  return newDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
};

const getChartStockShortDateTime = (dateInMiliseconds: number) => {
  const newDate = new Date(dateInMiliseconds);

  return newDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};
