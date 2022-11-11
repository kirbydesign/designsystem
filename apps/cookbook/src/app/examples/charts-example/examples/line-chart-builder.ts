import { ChartType } from '@kirbydesign/designsystem';
import {
  Align,
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
  Color,
  Point,
  TooltipItem,
  TooltipLabelStyle,
} from 'chart.js';
import { Context } from 'chartjs-plugin-datalabels';

const semiLightRGB = 'rgb(0,0,150)';
const semiLightContrastRGB = 'rgb(0,0,190)';
const whiteRGB = 'rgb(255,255,255)';

const fontSize = {
  xs: 16,
};

export interface ChartConfig {
  type: ChartType;
  data: ChartData;
}

export class LineChartBuilder {
  private _config: ChartConfiguration;

  constructor() {
    this._config = this.theKirbyChartOptions;
  }

  public data(data: ChartData): LineChartBuilder {
    this._config.data = data;

    return this;
  }

  public options(options: ChartOptions): LineChartBuilder {
    this._config.options = options;

    return this;
  }

  public getOptions(): ChartOptions {
    return this._config.options;
  }

  public getKirbyToolTip(): any {
    return {
      padding: 10,
      enabled: true,
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgb(220,220,220)',
      titleColor: 'rgb(0,0,0)',
      bodyColor: 'rgb(0,0,0)',
      caretSize: 0,
      bodySpacing: 5,
      titleSpacing: 5,
      borderColor: 'transparent',
      callbacks: {
        labelColor: (tooltipItem: TooltipItem<keyof ChartTypeRegistry>) => {
          return {
            backgroundColor: 'rgb(200,100,0)',
            borderColor: 'rgb(0,0,0)',
            borderWidth: 2, // This value must be exactly 2. If it is less, a white "border" will appear, if greater than, a shadow around the box will be shown.
            // An issue has been created, requesting a test to check this value doesn´t change: https://github.com/kirbydesign/designsystem/issues/2578
          } as TooltipLabelStyle;
        },
      },
    };
  }

  public build = (): ChartConfiguration => this._config;

  private theKirbyChartOptions: any = {
    type: 'line',
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
      backgroundColor: semiLightRGB,
      x: {
        grid: {
          lineWidth: 0,
        },
        ticks: {
          maxRotation: 0,
          autoSkipPadding: 120,
          font: {
            size: 16,
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
            size: 16,
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
    plugins: {
      datalabels: {
        backgroundColor: (context: Context) => context.dataset.borderColor as Color,
        color: whiteRGB,
        borderRadius: 3,
        font: {
          lineHeight: 1,
          size: fontSize.xs,
        },
        padding: {
          top: 6,
          left: 5,
          right: 5,
          bottom: 5,
        },
        offset: 5,
        align: (context: Context): Align =>
          (this.getChartPointFromContext(context) as any)?.datalabel.position,
        display: (context: Context): boolean =>
          !!(this.getChartPointFromContext(context) as any)?.datalabel,
        formatter: (value: any): string => value.datalabel.value,
      },
    },
  };

  /**
   * A filter to read a chartpoint from a Chart.js point context (used for chartdata points). Context is provided by Chart.js.
   */
  getChartPointFromContext = (context: Context): Point => {
    return context.dataset.data[context.dataIndex] as Point;
  };
}
