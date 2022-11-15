import { ChartConfiguration, ChartType } from 'chart.js';
import { ChartBaseConfig } from './chart-base-config';

class TestChartConfigurations extends ChartBaseConfig {
  public getBasicConfig() {
    return {
      type: this.config.type,
    } as ChartConfiguration<ChartType>;
  }

  constructor() {
    super('line');
  }
}

fdescribe(`Basic chart with type 'line' is loaded`, () => {
  let chartBaseConfigurations: TestChartConfigurations;
  const chartType: ChartType = 'line';

  beforeEach(() => {
    chartBaseConfigurations = new TestChartConfigurations();
  });

  it('TestChartConfigurations should be instantantiated', () => {
    expect(chartBaseConfigurations.config.type).toBe('line');
  });

  it(`TestChartConfigurations should throw error when the chart options type is set to 'bar'`, () => {
    const setChartTypeToBar = () => {
      chartBaseConfigurations.config = {
        ...chartBaseConfigurations.config,
        type: 'bar',
      };
    };

    expect(setChartTypeToBar).toThrow();
    expect(setChartTypeToBar).toThrowError(`Unable to change type. Type is: ${chartType}`);
  });

  it(`should not throw error when the chart options type is set to 'line'`, () => {
    const setChartTypeToBar = () => {
      chartBaseConfigurations.config = {
        ...chartBaseConfigurations.config,
        type: 'line',
      };
    };

    expect(setChartTypeToBar).not.toThrow();
  });

  it('should set configs aspectRatio set 2', () => {
    expect(chartBaseConfigurations.config.options.aspectRatio).toBeUndefined();

    const testOptions: ChartConfiguration<ChartType> = {
      ...chartBaseConfigurations.config,
      options: {
        aspectRatio: 2,
      },
      data: {
        datasets: [],
      },
    };

    chartBaseConfigurations.config = testOptions;

    expect(chartBaseConfigurations.config.options.aspectRatio).toBe(2);
  });
});
