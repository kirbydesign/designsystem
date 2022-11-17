import {
  ChartConfiguration,
  ChartType,
  ChartTypeRegistry,
  ScatterDataPoint,
  TooltipCallbacks,
  TooltipItem,
  TooltipLabelStyle,
  TooltipOptions,
} from 'chart.js';
import { Context } from 'chartjs-plugin-datalabels/types/context';
import { Align, Options } from 'chartjs-plugin-datalabels/types/options';
import { ColorHelper, DesignTokenHelper } from '../../../../helpers';
import { ChartLocale } from '../../shared';
import { ChartBaseConfig } from '../chart-base-config';

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

  public getDataLabelsPluginConfig(): Partial<Options> {
    return {
      backgroundColor: '#005c3c',
      color: getThemeColorHexString('white'),
      borderRadius: 3,
      font: {
        lineHeight: 1,
        size: parseInt(fontSize('xs')),
      },
      padding: {
        top: 6,
        left: 5,
        right: 5,
        bottom: 5,
      },
      offset: 5,
      align: (context: Context): Align =>
        this.getDataLabelPosition(context.dataset.data as ScatterDataPoint[], context.dataIndex),
      display: (context: Context): boolean => {
        return this.showDataLabel(context);
      },
      formatter: (dataPoint: ScatterDataPoint): string => dataPoint.y.toString(),
    };
  }

  public getDataLabelPosition = (data: ScatterDataPoint[], dataIndex: number): Align | null => {
    const scatterPointDataYvalues: number[] = (data as ScatterDataPoint[]).map(
      (scatterDatapoint) => scatterDatapoint.y
    );

    const minValue = Math.min(...scatterPointDataYvalues);
    const minValueIndex = scatterPointDataYvalues.indexOf(minValue);

    if (dataIndex === minValueIndex) {
      return 'bottom';
    }

    const maxValue = Math.max(...scatterPointDataYvalues);
    const maxValueIndex = scatterPointDataYvalues.indexOf(maxValue);

    if (dataIndex === maxValueIndex) {
      return 'top';
    }

    return null;
  };

  private showDataLabel(context: Context) {
    const data: ScatterDataPoint[] = [...context.dataset.data] as ScatterDataPoint[];
    const yValues = data.map((dataPoints) => dataPoints.y);

    const minValue = Math.min(...yValues);
    const minValueIndex = yValues.indexOf(minValue);

    const maxValue = Math.max(...yValues);
    const maxValueIndex = yValues.indexOf(maxValue);

    return context.dataIndex === maxValueIndex || context.dataIndex === minValueIndex;
  }
}

const getChartStockShortDate = (dateInMiliseconds: number) => {
  const newDate = new Date(dateInMiliseconds);

  const newDateString = newDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  return newDateString;
};
