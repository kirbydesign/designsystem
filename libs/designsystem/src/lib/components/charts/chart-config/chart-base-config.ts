import { ChartConfiguration, ChartType, TooltipOptions } from 'chart.js';

export class ChartBaseConfig {
  public static baseConfig: ChartConfiguration<ChartType>;
  public static tooltipPlugin: Partial<TooltipOptions<'line'>>;
  public static registerPlugins = () => {};
}
