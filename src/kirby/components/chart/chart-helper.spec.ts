import { ChartHelper, ChartType } from './chart-helper';
import { Options } from 'highcharts';
import { DonutOptions } from './options/donut';

describe('ChartHelper', () => {

  let chartHelper: ChartHelper;

  beforeEach(() => {
    chartHelper = new ChartHelper();
  });

  it('should update chart properties for pie', () => {
    let options: Options = new DonutOptions().options;
    options.chart.type = 'pie';
    options = chartHelper.updateProperties(
        options,
        100,
        [
            {
                name: 'Boomerangs 25%',
                y: 25,
                label: '25%'
            },
            {
                name: 'Bubbles 41%',
                y: 41,
                label: '41%'
            },
            {
                name: 'Jumping 33%',
                y: 33,
                label: '33%'
            },
            {
                name: 'Christmas < 1%',
                y: 1,
                label: '< 1%'
            }
        ],
        'Accessibility',
        false);
    expect(options.chart.height).toBe(100);
    expect(options.series[0].data.length).toBe(4);
    expect(options.series[0].data[0]).toEqual({
        name: 'Boomerangs 25%',
        y: 25,
        label: '25%'
    });
    expect(options.chart.description).toBe('Accessibility');
    expect(options.plotOptions.pie.dataLabels.enabled).toBeFalsy();
  });

  it('should setup donut chart type as a pie chart with an inner circle', () => {
    let options: Options = new DonutOptions().options;
    const chartType: ChartType = 'donut';
    options = chartHelper.setupChartType(options, chartType);
    expect(options.chart.type).toBe('pie');
    expect(options.plotOptions.pie.innerSize).toBe('50%');
  });

  it('should setup pie chart type as a pie without an inner circle', () => {
    let options: Options = new DonutOptions().options;
    const chartType: ChartType = 'pie';
    options = chartHelper.setupChartType(options, chartType);
    expect(options.chart.type).toBe('pie');
    expect(options.plotOptions.pie.innerSize).toBe('0%');
  });

});
