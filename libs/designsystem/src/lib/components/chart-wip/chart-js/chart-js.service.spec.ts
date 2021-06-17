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
        chartJSService.renderChart(
          canvasElement,
          ChartType.bar,
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

    describe('when custom options are given', () => {
      it('should overwrite options set by global config', () => {
        // Check if a global default is actually being overwritten
        expect(GLOBAL_DEFAULTS.elements.bar.backgroundColor).not.toBeUndefined();
        const customElementBackgroundColor = '#ffffff';

        chartJSService.renderChart(
          canvasElement,
          ChartType.bar,
          [1, 2, 3],
          ['one', 'two', 'three'],
          {
            elements: {
              bar: {
                backgroundColor: customElementBackgroundColor,
              },
            },
          }
        );

        const chart = chartJSService['chart'];
        expect(chart.options.elements.bar.backgroundColor).toEqual(customElementBackgroundColor);
      });

      it('should overwrite type specific options', () => {
        // Check if a type config is actually being overwritten
        const type = ChartType.bar;
        const customIndexAxis = 'x';
        expect(CHART_TYPE_CONFIGS[type].options.indexAxis).not.toBeUndefined();
        expect(CHART_TYPE_CONFIGS[type].options.indexAxis).not.toEqual(customIndexAxis);

        chartJSService.renderChart(
          canvasElement,
          ChartType.bar,
          [1, 2, 3],
          ['one', 'two', 'three'],
          {
            indexAxis: customIndexAxis,
          }
        );

        const chart = chartJSService['chart'];
        expect(chart.options.indexAxis).toEqual(customIndexAxis);
      });
    });
  });

  describe('function: redrawChart', () => {
    beforeEach(() => {
      chartJSService.renderChart(canvasElement, ChartType.bar, [1, 2, 3], ['one', 'two', 'three']);
    });

    it('should update the chart', () => {
      const updateSpy = spyOn(chartJSService['chart'], 'update');

      chartJSService.redrawChart();

      expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    it('should keep the same chart', () => {
      const initialId = chartJSService['chart'].id;

      chartJSService.redrawChart();

      expect(chartJSService['chart'].id).toEqual(initialId);
    });
  });

  describe('function: updateData', () => {
    let chart: Chart;

    beforeEach(() => {
      chartJSService.renderChart(canvasElement, ChartType.bar, [1, 2, 3], ['one', 'two', 'three']);
      chart = chartJSService['chart'];
    });

    describe('when data is given as a number[]', () => {
      it('should update the chart data', () => {
        const newData = [4, 5, 6];
        expect(chart.data.datasets[0].data).not.toEqual(newData);

        chartJSService.updateData(newData);

        expect(chart.data.datasets[0].data).toEqual(newData);
      });
    });

    describe('when data is given as a chartJSDataset[]', () => {
      it('should update the chart data', () => {
        const newDataset = [
          {
            data: [7, 8, 9],
          },
        ];
        expect(chart.data.datasets[0].data).not.toEqual(newDataset[0].data);

        chartJSService.updateData(newDataset);

        expect(chart.data.datasets[0].data).toEqual(newDataset[0].data);
      });

      describe('that contains more than one entry', () => {
        it('should update to have multiple datasets', () => {
          const newDatasets = [
            {
              data: [7, 8, 9],
            },
            { data: [10, 11, 12] },
          ];
          expect(chart.data.datasets.length).toBe(1);

          chartJSService.updateData(newDatasets);

          expect(chart.data.datasets[0].data).toEqual(newDatasets[0].data);
          expect(chart.data.datasets[1].data).toEqual(newDatasets[1].data);
        });
      });
    });
  });

  describe('function: updateDataLabels', () => {
    let chart: Chart;

    beforeEach(() => {
      chartJSService.renderChart(canvasElement, ChartType.bar, [1, 2, 3], ['one', 'two', 'three']);
      chart = chartJSService['chart'];
    });

    it('should update the data labels of the chart', () => {
      const newDatalabels = ['Tre', 'Fire', 'Fem'];
      expect(chart.data.labels).not.toEqual(newDatalabels);

      chartJSService.updateDataLabels(newDatalabels);

      expect(chart.data.labels).toEqual(newDatalabels);
    });
  });

  describe('function: updateType', () => {
    beforeEach(() => {
      chartJSService.renderChart(canvasElement, ChartType.bar, [1, 2, 3], ['one', 'two', 'three']);
    });

    describe('if the new type is ChartType.bar', () => {
      it('should destructively update the type', () => {
        const destructivelyUpdateTypeSpy = spyOn<any>(chartJSService, 'destructivelyUpdateType');

        chartJSService.updateType(ChartType.bar, {});

        expect(destructivelyUpdateTypeSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('if the new type is ChartType.column', () => {
      it('should destructively update the type', () => {
        const destructivelyUpdateTypeSpy = spyOn<any>(chartJSService, 'destructivelyUpdateType');

        chartJSService.updateType(ChartType.column, {});

        expect(destructivelyUpdateTypeSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('private function: destructivelyUpdateType', () => {
    let chart: Chart;

    beforeEach(() => {
      chartJSService.renderChart(canvasElement, ChartType.bar, [1, 2, 3], ['one', 'two', 'three']);
      chart = chartJSService['chart'];
    });

    it('should replace the old chart element', () => {
      const oldChartId = chart.id;

      chartJSService['destructivelyUpdateType'](ChartType.bar);

      expect(chartJSService['chart'].id).not.toEqual(oldChartId);
    });

    it('should preserve the original data', () => {
      const oldDatasets = chart.data.datasets;

      chartJSService['destructivelyUpdateType'](ChartType.bar);

      expect(chartJSService['chart'].data.datasets).toEqual(oldDatasets);
    });

    it('should preserve the original dataLabels', () => {
      const oldDatalabels = chart.data.labels;

      chartJSService['destructivelyUpdateType'](ChartType.bar);

      expect(chartJSService['chart'].data.labels).toEqual(oldDatalabels);
    });
  });

  fdescribe('function: updateOptions', () => {
    const chartType = ChartType.bar;

    beforeEach(() => {
      chartJSService.renderChart(canvasElement, chartType, [1, 2, 3], ['one', 'two', 'three']);
    });

    it('should update the options of the chart', () => {
      expect(true).toBeFalse();
    });

    it('should overwrite options set by global config', () => {
      // Check if a global default is actually being overwritten
      expect(GLOBAL_DEFAULTS.elements.bar.backgroundColor).not.toBeUndefined();
      const customElementBackgroundColor = '#ffffff';

      chartJSService.updateOptions(
        {
          elements: {
            bar: {
              backgroundColor: customElementBackgroundColor,
            },
          },
        },
        chartType
      );
      // Options are resolved as part of update
      chartJSService['chart'].update();

      expect(chartJSService['chart'].options.elements.bar.backgroundColor).toEqual(
        customElementBackgroundColor
      );
    });

    it('should overwrite type specific options', () => {
      // Check if a type config is actually being overwritten
      const customIndexAxis = 'x';
      expect(CHART_TYPE_CONFIGS[chartType].options.indexAxis).not.toBeUndefined();
      expect(CHART_TYPE_CONFIGS[chartType].options.indexAxis).not.toEqual(customIndexAxis);

      chartJSService.updateOptions(
        {
          indexAxis: customIndexAxis,
        },
        chartType
      );
      chartJSService['chart'].update();

      const chart = chartJSService['chart'];
      expect(chart.options.indexAxis).toEqual(customIndexAxis);
    });
  });
});
