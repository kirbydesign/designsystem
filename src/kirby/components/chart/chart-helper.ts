import { Options } from 'highcharts';
import { DonutOptions } from './options/donut';

export type ChartType = 'pie' | 'donut';

export class ChartHelper {

  public updateProperties(options: Options, height: number, data: any[], description: string, dataLabelsEnabled: boolean ): Options {
    if (options.chart && options.chart.type === 'pie') {
      options.chart.height = height;
      options.series[0].data = data;
      options.chart.description = description;
      options.plotOptions.pie.dataLabels.enabled = dataLabelsEnabled;
      options.plotOptions.pie.dataLabels.format = '{point.label}';
    }
    return options;
  }

  public setupChartType(options: Options, type: ChartType): Options {
    let pieInnerCircleSize = '0%';
    if (type === 'donut') {
      type = 'pie';
      pieInnerCircleSize = '50%';
    }
    if (type === 'pie') {
      options = new DonutOptions().options;
      options.plotOptions.pie.innerSize = pieInnerCircleSize;
    }
    options.chart.type = type;
    return options;
  }
}
