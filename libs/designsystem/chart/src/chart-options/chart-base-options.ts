import { Chart, ChartConfiguration, ChartType } from 'chart.js';

export abstract class BaseChartOptions {
  public get options(): ChartConfiguration<'line'> {
    return this._options;
  }
  public set options(value: ChartConfiguration<'line'>) {
    this._options = value;
  }
  private _chartType: ChartType;
  private _options: ChartConfiguration<'line'>;

  constructor(chartType: ChartType) {
    this._chartType = chartType;

    const chart = new Chart(this._chartType, this._options);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    chart.options;
  }

  public abstract getBasicConfig(): unknown;
}
