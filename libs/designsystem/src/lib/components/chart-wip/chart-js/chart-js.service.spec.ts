/*TODO: where did i leave? 
  write tests :) Complete writing tests */
import { ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

import { ColorHelper } from '../../../helpers';
import { CHART_TYPE_CONFIGS } from '../chart-wip.configs';
import { ChartType } from '../chart-wip.types';

import { ChartJSService } from './chart-js.service';
import { GLOBAL_DEFAULTS } from './configured-chart-js';

describe('ChartJSService', () => {
  let chartJSService: ChartJSService;
  let canvasElement: ElementRef<HTMLCanvasElement>;

  beforeEach(() => {
    chartJSService = new ChartJSService();
    const nativeElement = document.createElement('canvas');
    canvasElement = new ElementRef<HTMLCanvasElement>(nativeElement);
  });

  describe('function: renderChart', () => {
    describe('when data is given as a number[]', () => {
      it('should render a new chart', () => {
        expect(chartJSService['chart']).toBeUndefined();

        chartJSService.renderChart(
          canvasElement,
          ChartType.bar,
          [1, 2, 3],
          ['one', 'two', 'three']
        );

        expect(chartJSService['chart']).toBeInstanceOf(Chart);
      });

      it('should use the supplied data in the chart', () => {
        const data = [1, 2, 3];

        chartJSService.renderChart(canvasElement, ChartType.bar, data, ['one', 'two', 'three']);

        const chart = chartJSService['chart'];
        expect(chart.data.datasets[0].data).toEqual(data);
      });
    });

    describe('when data is given as a chartJSDataset[]', () => {
      it('should render a new chart', () => {
        expect(chartJSService['chart']).toBeUndefined();

        chartJSService.renderChart(
          canvasElement,
          ChartType.bar,
          [{ data: [1, 2, 3] }],
          ['one', 'two', 'three']
        );

        expect(chartJSService['chart']).toBeInstanceOf(Chart);
      });

      it('should use the supplied data in the chart', () => {
        const data = [1, 2, 3];
        const dataset = {
          data: data,
        };

        chartJSService.renderChart(
          canvasElement,
          ChartType.bar,
          [dataset],
          ['one', 'two', 'three']
        );

        const chart = chartJSService['chart'];
        expect(chart.data.datasets[0].data).toEqual(data);
      });

      describe('that contains more than one entry', () => {
        it('should use every supplied dataset in the chart', () => {
          const data1 = [1, 2, 3];
          const data2 = [4, 5, 6];
          const datasets = [
            {
              data: data1,
            },
            { data: data2 },
          ];

          chartJSService.renderChart(canvasElement, ChartType.bar, datasets, [
            'one',
            'two',
            'three',
          ]);

          const chart = chartJSService['chart'];
          expect(chart.data.datasets[0].data).toEqual(data1);
          expect(chart.data.datasets[1].data).toEqual(data2);
        });
      });
    });
  });

  describe('when type is ChartType.column & no custom options are passed', () => {
    let chart: Chart;

    beforeEach(() => {
      chartJSService.renderChart(
        canvasElement,
        ChartType.column,
        [1, 2, 3],
        ['one', 'two', 'three']
      );
      chart = chartJSService['chart'];
    });

    it('should have correct background color for elements', () => {
      expect(chart.options.elements.bar.backgroundColor).toEqual(
        ColorHelper.getThemeColorHexString('secondary')
      );
    });

    it('should have correct hover background color for elements', () => {
      expect(chart.options.elements.bar.hoverBackgroundColor).toEqual(
        ColorHelper.getThemeColorHexString('primary')
      );
    });

    it('should have no grid', () => {
      expect(chart.options.scales.linear.display).toBeFalse();
      expect(chart.options.scales.linear.ticks.display).toBeFalse();
      expect(chart.options.scales.category.grid.display).toBeFalse();
    });

    it('should have no legend', () => {
      expect(chart.options.plugins.legend.display).toBeFalse();
    });
  });

  describe('when type is ChartType.bar & no custom options are passed', () => {
    let chart: Chart;

    beforeEach(() => {
      chartJSService.renderChart(canvasElement, ChartType.bar, [1, 2, 3], ['one', 'two', 'three']);
      chart = chartJSService['chart'];
    });

    it('should have correct background color for elements', () => {
      expect(chart.options.elements.bar.backgroundColor).toEqual(
        ColorHelper.getThemeColorHexString('secondary')
      );
    });

    it('should have correct hover background color for elements', () => {
      expect(chart.options.elements.bar.hoverBackgroundColor).toEqual(
        ColorHelper.getThemeColorHexString('primary')
      );
    });

    it('should have no grid', () => {
      expect(chart.options.scales.linear.display).toBeFalse();
      expect(chart.options.scales.linear.ticks.display).toBeFalse();
      expect(chart.options.scales.category.grid.display).toBeFalse();
    });

    it('should have no legend', () => {
      expect(chart.options.plugins.legend.display).toBeFalse();
    });
  });

  describe('when custom options are given', () => {
    it('should overwrite options set by global config', () => {
      // Check if a global default is actually being overwritten
      expect(GLOBAL_DEFAULTS.elements.bar.backgroundColor).not.toBeUndefined();
      const customElementBackgroundColor = '#ffffff';

      chartJSService.renderChart(canvasElement, ChartType.bar, [1, 2, 3], ['one', 'two', 'three'], {
        elements: {
          bar: {
            backgroundColor: customElementBackgroundColor,
          },
        },
      });

      const chart = chartJSService['chart'];
      expect(chart.options.elements.bar.backgroundColor).toEqual(customElementBackgroundColor);
    });

    fit('should overwrite type specific options', () => {
      // Check if a type config is actually being overwritten
      const type = ChartType.bar;
      const customIndexAxis = 'x';
      expect(CHART_TYPE_CONFIGS[type].options.indexAxis).not.toBeUndefined();
      expect(CHART_TYPE_CONFIGS[type].options.indexAxis).not.toEqual(customIndexAxis);

      chartJSService.renderChart(canvasElement, ChartType.bar, [1, 2, 3], ['one', 'two', 'three'], {
        indexAxis: customIndexAxis,
      });

      const chart = chartJSService['chart'];
      expect(chart.options.indexAxis).toEqual(customIndexAxis);
    });
  });
});

describe('function: redrawChart', () => {
  it('should update the existing chart', () => {});
  it('should keep the same chart', () => {});
});

describe('function: updateData', () => {
  describe('when data is given as a number[]', () => {
    it('should update the chart data', () => {});
  });
  describe('when data is given as a chartJSDataset[]', () => {
    it('should update the chart data', () => {});

    describe('that contains more than one entry', () => {
      it('should update to have multiple datasets', () => {});
    });
  });
});

describe('function: updateDataLabels', () => {
  it('should update the data labels of the chart', () => {});
});

describe('function: updateType', () => {
  it('should create a new chart if the type is ChartType.bar', () => {});
  it('should create a new chart if the type is ChartType.column', () => {});
});

describe('function: updateOptions', () => {
  it('should update the options of the chart', () => {});

  it('should overwrite options set by global config', () => {});

  it('should overwrite type specific options', () => {});
});
