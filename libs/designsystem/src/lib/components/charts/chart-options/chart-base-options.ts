import { ChartConfiguration, ChartType } from 'chart.js';

export abstract class ChartBaseOptions {
  public get options(): ChartConfiguration<ChartType> {
    return this._options;
  }

  public set options(options: ChartConfiguration<ChartType>) {
    if (options.type !== this._chartType) {
      throw new Error(`Unable to change type. Type is: ${this._chartType}`);
    }
    this._options = options;
  }

  private _chartType: ChartType;
  private _options: ChartConfiguration<ChartType> = {} as ChartConfiguration<ChartType>;

  constructor(chartType: ChartType) {
    this._chartType = chartType;
    this._options = {
      ...this._options,
      options: {},
      type: chartType,
    };
  }

  public abstract getBasicConfig(): ChartConfiguration<ChartType>;
}
