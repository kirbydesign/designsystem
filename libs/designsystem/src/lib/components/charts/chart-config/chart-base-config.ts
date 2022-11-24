import { ChartConfiguration, ChartType, TooltipOptions } from 'chart.js';

export abstract class ChartBaseConfig {
  public get config(): ChartConfiguration<ChartType> {
    return this._config;
  }

  public set config(config: ChartConfiguration<ChartType>) {
    if (config.type !== this._chartType) {
      throw new Error(`Unable to change type. Type is: ${this._chartType}`);
    }
    this._config = config;
  }

  private _chartType: ChartType;
  private _config: ChartConfiguration<ChartType> = {} as ChartConfiguration<ChartType>;

  constructor(chartType: ChartType) {
    this._chartType = chartType;
    this._config = {
      ...this._config,
      options: {},
      type: chartType,
    };
  }

  public static basicConfig: ChartConfiguration<ChartType>;
  public static tooltipPlugin: Partial<TooltipOptions<'line'>>;
  public static registerPlugins = () => {};
  public static unRegisterPlugins = () => {};
}
