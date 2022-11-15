import { ChartConfiguration, ChartType } from 'chart.js';
import { chart } from 'highcharts';
import { ChartBaseOptions } from './chart-base-options';

class TestChartOptions extends ChartBaseOptions {
  public getBasicConfig() {
    return {
      type: this.options.type,
    } as ChartConfiguration<ChartType>;
  }

  constructor() {
    super('line');
  }
}

fdescribe(`Basic chart with type 'line' is loaded`, () => {
  let chartBaseOptions: TestChartOptions;
  const chartType: ChartType = 'line';

  beforeEach(() => {
    chartBaseOptions = new TestChartOptions();
  });

  it('TestChartOptions should be instantantiated', () => {
    expect(chartBaseOptions.options.type).toBe('line');
  });

  it(`TestChartOptions should throw error when the chart options type is set to 'bar'`, () => {
    const setChartTypeToBar = () => {
      chartBaseOptions.options = {
        ...chartBaseOptions.options,
        type: 'bar',
      };
    };

    expect(setChartTypeToBar).toThrow();
    expect(setChartTypeToBar).toThrowError(`Unable to change type. Type is: ${chartType}`);
  });

  it(`should not throw error when the chart options type is set to 'line'`, () => {
    const setChartTypeToBar = () => {
      chartBaseOptions.options = {
        ...chartBaseOptions.options,
        type: 'line',
      };
    };

    expect(setChartTypeToBar).not.toThrow();
  });

  it('should return options with aspectRatio set to 2', () => {
    expect(chartBaseOptions.options.options.aspectRatio).toBeUndefined();

    const testOptions: ChartConfiguration<ChartType> = {
      ...chartBaseOptions.options,
      options: {
        aspectRatio: 2,
      },
      data: {
        datasets: [],
      },
    };

    chartBaseOptions.options = testOptions;

    expect(chartBaseOptions.options.options.aspectRatio).toBe(2);
  });
});
