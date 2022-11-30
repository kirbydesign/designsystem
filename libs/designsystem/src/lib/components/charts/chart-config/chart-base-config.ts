import { ChartConfiguration, ChartType, TooltipOptions } from 'chart.js';

export abstract class ChartBaseConfig {
  private _chartType: ChartType;
  private _config: ChartConfiguration<ChartType> = {} as ChartConfiguration<ChartType>;

  public static basicConfig: ChartConfiguration<ChartType>;
  public static tooltipPlugin: Partial<TooltipOptions<'line'>>;
  public static registerPlugins = () => {};
}
