import { ChartType, ChartTypesConfig } from '@kirbydesign/designsystem';
import {
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
  TooltipItem,
  TooltipLabelStyle,
  TooltipOptions,
} from 'chart.js';

export interface ChartConfig {
  type: ChartType;
  data: ChartData;
}

export class LineChartBuilder {
  private _config: ChartConfiguration;

  constructor() {
    this._config = {
      type: 'line',
      data: {
        datasets: [],
      },
      options: {
        responsive: true,
      },
    };
  }

  public data(data: ChartData): LineChartBuilder {
    this._config.data = data;

    return this;
  }

  public options(options: ChartOptions): LineChartBuilder {
    this._config.options = options;

    return this;
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
}
