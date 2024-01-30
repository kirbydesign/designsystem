import { ElementRef } from '@angular/core';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Chart, ChartType as ChartJSType, ChartOptions } from 'chart.js';
import { AnnotationOptions } from 'chartjs-plugin-annotation';
import { MockProvider } from 'ng-mocks';

import { chartConfigHasType } from '@kirbydesign/designsystem/helpers';
import { deepCopy } from '@kirbydesign/designsystem/helpers';
import { ChartConfigService } from '../';
import { ChartDataset, ChartHighlightedElements, ChartType } from '../charts.types';
import { CHART_GLOBAL_DEFAULTS } from '../chart-config-service/configs/global-defaults.config';

import { ChartJSService } from './chart-js.service';
import { TEST_CHART_ANNOTATIONS_CONFIG, TEST_CHART_TYPES_CONFIG } from './test-utils';

describe('ChartJSService', () => {
  let spectator: SpectatorService<ChartJSService>;
  let chartJSService: ChartJSService;
  let canvasElement: ElementRef<HTMLCanvasElement>;

  const mockChartConfigService = MockProvider(ChartConfigService, {
    getTypeConfig: (chartType: ChartType) => deepCopy(TEST_CHART_TYPES_CONFIG[chartType]),
    getAnnotationDefaults: (type: string) => TEST_CHART_ANNOTATIONS_CONFIG[type],
    chartTypeToChartJSType: (type: ChartType) => TEST_CHART_TYPES_CONFIG[type].type as ChartJSType,
    applyInteractionFunctionsExtensions: (options: ChartOptions) => options,
  });

  const createService = createServiceFactory({
    service: ChartJSService,
    providers: [mockChartConfigService],
  });

  beforeEach(() => {
    spectator = createService();
    const nativeElement = document.createElement('canvas');

    chartJSService = spectator.service;
    canvasElement = new ElementRef<HTMLCanvasElement>(nativeElement);
  });

  describe('function: renderChart', () => {
    it('should render chart with correct defaults for filler plugin', () => {
      const data = [7, 7.37, 7.46];

      chartJSService.renderChart({
        targetElement: canvasElement,
        type: 'line',
        data: data,
        labels: ['one', 'two', 'three'],
      });

      const fillerOptions = chartJSService['chart'].options.plugins.filler;

      expect(fillerOptions.propagate).toBeTrue();
      expect(fillerOptions.drawTime).toBe('beforeDatasetDraw');
    });

    describe('when annotations are given', () => {
      it('should render the chart with annotations applied', () => {
        const annotations: AnnotationOptions[] = [
          { type: 'line', yMin: 10, yMax: 10 },
          { type: 'line', yMin: 20, yMax: 20 },
        ];

        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'bar',
          data: [1, 2, 3],
          labels: ['one', 'two', 'three'],
          annotations,
        });

        expect(chartJSService['chart'].options.plugins.annotation.annotations.length).toEqual(2);
      });
    });

    describe('when data is given as a number[]', () => {
      it('should render a new chart', () => {
        expect(chartJSService['chart']).toBeUndefined();

        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'bar',
          data: [1, 2, 3],
          labels: ['one', 'two', 'three'],
        });

        expect(chartJSService['chart']).toBeInstanceOf(Chart);
      });

      it('should use the supplied data in the chart', () => {
        const data = [1, 2, 3];

        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'bar',
          data,
          labels: ['one', 'two', 'three'],
        });

        const chart = chartJSService['chart'];
        expect(chart.data.datasets[0].data).toEqual(data);
      });

      describe('when highlightedElements are given', () => {
        it('should mark given elements as highlighted', () => {
          const highlightedElements = [
            [0, 0],
            [0, 2],
          ];

          chartJSService.renderChart({
            targetElement: canvasElement,
            type: 'bar',
            data: [1, 2, 3],
            labels: ['one', 'two', 'three'],
            highlightedElements,
          });

          const datasets = chartJSService['chart'].data.datasets as ChartDataset[];

          expect(datasets.length).toEqual(1);
          expect(datasets[0].kirbyOptions.highlightedElements).toEqual([0, 2]);
        });
      });
    });

    describe('when custom options are given', () => {
      it('should overwrite options set by global defaults', () => {
        // Check if a global default is actually being overwritten
        expect(CHART_GLOBAL_DEFAULTS.elements.bar.backgroundColor).not.toBeUndefined();
        const customElementBackgroundColor = '#ffffff';

        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'bar',
          data: [1, 2, 3],
          labels: ['one', 'two', 'three'],
          customOptions: {
            elements: {
              bar: {
                backgroundColor: customElementBackgroundColor,
              },
            },
          },
        });

        const chart = chartJSService['chart'];
        expect(chart.options.elements.bar.backgroundColor).toEqual(customElementBackgroundColor);
      });

      it('should overwrite type specific options', () => {
        // Check if a type config is actually being overwritten
        const type = 'bar';
        const customIndexAxis = 'x';
        expect(TEST_CHART_TYPES_CONFIG[type].options.indexAxis).toBe('y');

        chartJSService.renderChart({
          targetElement: canvasElement,
          type: type,
          data: [1, 2, 3],
          labels: ['one', 'two', 'three'],
          customOptions: {
            indexAxis: customIndexAxis,
          },
        });

        const chart = chartJSService['chart'];
        expect(chart.options.indexAxis).toEqual(customIndexAxis);
      });
    });

    describe('when labels are provided', () => {
      describe("via 'labels' argument", () => {
        it('should apply them to the graph', () => {
          const data = [1, 2, 3];
          const labels = ['one', 'two', 'three'];
          expect(labels.length).toBeGreaterThan(0);
          expect(data.length).toBeGreaterThan(0);

          chartJSService.renderChart({
            targetElement: canvasElement,
            type: 'bar',
            data,
            labels,
          });

          const chartLabels = chartJSService['chart'].data.labels;
          expect(chartLabels.length).toEqual(labels.length);
          expect(chartLabels).toEqual(labels);
        });

        describe('and the dataset also contains labels', () => {
          it('should apply argument labels', () => {
            const data = [
              {
                data: [
                  { x: 'en', y: 1 },
                  { x: 'to', y: 2 },
                  { x: 'tre', y: 3 },
                ],
              },
            ] as any;
            const labels = ['one', 'two', 'three'];
            expect(labels.length).toBeGreaterThan(0);
            expect(data.length).toBeGreaterThan(0);

            chartJSService.renderChart({
              targetElement: canvasElement,
              type: 'column',
              data,
              labels,
            });

            const chartLabels = chartJSService['chart'].data.labels;
            expect(chartLabels.length).toEqual(labels.length);
            expect(chartLabels).toEqual(labels);
          });
        });
      });
    });

    describe('when no labels are provided', () => {
      it('should have a blank label for each data point', () => {
        const data = [1, 2, 3];
        const expectedLabels = ['', '', ''];
        expect(data.length).toBeGreaterThan(0);
        expect(expectedLabels.length).toEqual(data.length);

        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'column',
          data,
        });

        const chartLabels = chartJSService['chart'].data.labels;
        expect(chartLabels.length).toEqual(data.length);
        expect(chartLabels).toEqual(expectedLabels);
      });

      describe('but the dataset contains labels for the index axis', () => {
        it('should use the dataset labels', () => {
          const data = [
            { x: 'en', y: 1 },
            { x: 'to', y: 2 },
            { x: 'tre', y: 3 },
          ] as any;
          const dataset = [
            {
              data,
            },
          ];
          expect(data.length).toBeGreaterThan(0);
          expect(data.every(({ x }) => typeof x === 'string')).toBeTrue();

          chartJSService.renderChart({
            targetElement: canvasElement,
            type: 'column',
            data: dataset,
          });

          /* This assertion relies on the assumption that:
          1. if chart.data.labels is empty &
          2. datasets contains string along the index axis 
          : then the strings in datasets will be used as labels. 

          This assumption comes from the internal logic of chartjs. 
          */
          const chartData = chartJSService['chart'].data;
          expect(chartJSService['chart'].options.indexAxis).toEqual('x');
          expect(chartData.labels.length).toEqual(0);
          expect(chartData.datasets).toEqual(dataset);
        });
      });

      describe('when data is given as a chartJSDataset[]', () => {
        it('should render a new chart', () => {
          expect(chartJSService['chart']).toBeUndefined();

          chartJSService.renderChart({
            targetElement: canvasElement,
            type: 'bar',
            data: [{ data: [1, 2, 3] }],
            labels: ['one', 'two', 'three'],
          });

          expect(chartJSService['chart']).toBeInstanceOf(Chart);
        });

        it('should use the supplied data in the chart', () => {
          const data = [1, 2, 3];
          const dataset = {
            data: data,
          };

          chartJSService.renderChart({
            targetElement: canvasElement,
            type: 'bar',
            data: [dataset],
            labels: ['one', 'two', 'three'],
          });

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

            chartJSService.renderChart({
              targetElement: canvasElement,
              type: 'bar',
              data: datasets,
              labels: ['one', 'two', 'three'],
            });

            const chart = chartJSService['chart'];
            expect(chart.data.datasets[0].data).toEqual(data1);
            expect(chart.data.datasets[1].data).toEqual(data2);
          });
        });

        describe('when highlightedElements are given', () => {
          it('should mark given elements as highlighted', () => {
            const highlightedElements = [
              [0, 0],
              [0, 2],
            ];

            chartJSService.renderChart({
              targetElement: canvasElement,
              type: 'bar',
              data: [{ data: [1, 2, 3] }],
              labels: ['one', 'two', 'three'],
              highlightedElements,
            });

            const datasets = chartJSService['chart'].data.datasets as ChartDataset[];

            expect(datasets.length).toEqual(1);
            expect(datasets[0].kirbyOptions.highlightedElements).toEqual([0, 2]);
          });
        });
      });
    });
  });

  describe('function: redrawChart', () => {
    beforeEach(() => {
      chartJSService.renderChart({
        targetElement: canvasElement,
        type: 'bar',
        data: [1, 2, 3],
        labels: ['one', 'two', 'three'],
      });
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

  describe('function: destroyChart', () => {
    beforeEach(() => {
      chartJSService.renderChart({
        targetElement: canvasElement,
        type: 'bar',
        data: [1, 2, 3],
        labels: ['one', 'two', 'three'],
      });
    });
    it('should destroy the chart', () => {
      const destroySpy = spyOn(chartJSService['chart'], 'destroy');

      chartJSService.destroyChart();

      expect(destroySpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('function: updateData', () => {
    let chart: Chart;

    beforeEach(() => {
      chartJSService.renderChart({
        targetElement: canvasElement,
        type: 'bar',
        data: [1, 2, 3],
        labels: ['one', 'two', 'three'],
      });
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

  describe('function: updateLabels', () => {
    let chart: Chart;

    beforeEach(() => {
      chartJSService.renderChart({
        targetElement: canvasElement,
        type: 'bar',
        data: [1, 2, 3],
        labels: ['one', 'two', 'three'],
      });
      chart = chartJSService['chart'];
    });

    it('should update the labels of the chart', () => {
      const newLabels = ['four', 'five', 'six'];
      expect(chart.data.labels).not.toEqual(newLabels);

      chartJSService.updateLabels(newLabels);

      expect(chart.data.labels).toEqual(newLabels);
    });
  });

  describe('function: updateType', () => {
    beforeEach(() => {
      chartJSService.renderChart({
        targetElement: canvasElement,
        type: 'bar',
        data: [1, 2, 3],
        labels: ['one', 'two', 'three'],
      });
    });

    const chartTypesThatDestructivelyUpdate: ChartType[] = ['bar', 'column'];
    const chartTypesThatUpdateNormally: ChartType[] = ['line'];

    chartTypesThatDestructivelyUpdate.forEach((chartType) => {
      describe(`if the new type is ChartType.${chartType}`, () => {
        it('should destructively update type', () => {
          const destructivelyUpdateTypeSpy = spyOn<any>(chartJSService, 'destructivelyUpdateType');

          chartJSService.updateType(chartType, {});

          expect(destructivelyUpdateTypeSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    chartTypesThatUpdateNormally.forEach((chartType) => {
      describe(`if the new type is ChartType.${chartType}`, () => {
        it('should non-destructively update type', () => {
          const nonDestructivelyUpdateTypeSpy = spyOn<any>(
            chartJSService,
            'nonDestructivelyUpdateType'
          );

          chartJSService.updateType(chartType, {});

          expect(nonDestructivelyUpdateTypeSpy).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('private function: nonDestructivelyUpdateType', () => {
    let chart: Chart;

    beforeEach(() => {
      chartJSService.renderChart({
        targetElement: canvasElement,
        type: 'bar',
        data: [1, 2, 3],
        labels: ['one', 'two', 'three'],
        annotations: [{ type: 'line', yMin: 10, yMax: 10 }],
      });
      chart = chartJSService['chart'];
    });

    it('should set a new type', () => {
      if (chartConfigHasType(chart.config)) {
        const oldType = chart.config.type;
        const newType = 'line';
        expect(oldType).not.toBe(newType);

        chartJSService['nonDestructivelyUpdateType']('line');

        expect(chart.config.type).not.toBe(oldType);
        expect(newType).toBe('line');
      }
    });

    it('should apply config from new type', () => {
      const newType = 'line';
      const newBorderColor = TEST_CHART_TYPES_CONFIG[newType].options.elements.line.borderColor;
      expect(chart.options.elements.line.borderColor).not.toEqual(newBorderColor);

      chartJSService['nonDestructivelyUpdateType'](newType);
      chart.update(); // An update is needed for changes to be reflected

      expect(chart.options.elements.line.borderColor).toEqual(newBorderColor);
    });

    it('should apply custom options', () => {
      const oldBackgroundColor = chart.options.bar?.datasets?.backgroundColor;
      const newBackgroundColor = 'rgba(125,124,123,1)';

      chartJSService['nonDestructivelyUpdateType']('line', {
        elements: { bar: { backgroundColor: newBackgroundColor } },
      });

      expect(oldBackgroundColor).toBeUndefined();
      expect(chart.config.options.elements.bar.backgroundColor).toBe(newBackgroundColor);
    });

    it('should preserve the chart', () => {
      const oldChartId = chart.id;

      chartJSService['nonDestructivelyUpdateType']('bar');

      expect(chartJSService['chart'].id).toEqual(oldChartId);
    });

    it('should preserve the original labels', () => {
      const oldDatalabels = chart.data.labels;

      chartJSService['nonDestructivelyUpdateType']('line');

      expect(chartJSService['chart'].data.labels).toEqual(oldDatalabels);
    });

    it('should preserve the original annotations', () => {
      const oldAnnotations = chart.options.plugins.annotation.annotations;

      chartJSService['nonDestructivelyUpdateType']('line');
      chart.update(); // Annotation changes are not visible before update

      const newAnnotations = chartJSService['chart'].options.plugins.annotation.annotations;

      expect(newAnnotations).toEqual(oldAnnotations);
    });
  });

  describe('private function: destructivelyUpdateType', () => {
    let chart: Chart;

    beforeEach(() => {
      chartJSService.renderChart({
        targetElement: canvasElement,
        type: 'bar',
        data: [1, 2, 3],
        labels: ['one', 'two', 'three'],
        annotations: [{ type: 'line', yMin: 10, yMax: 10 }],
      });
      chart = chartJSService['chart'];
    });

    it('should replace the old chart element', () => {
      const oldChartId = chart.id;

      chartJSService['destructivelyUpdateType']('bar');

      expect(chartJSService['chart'].id).not.toEqual(oldChartId);
    });

    it('should preserve the original data', () => {
      const oldDatasets = chart.data.datasets;

      chartJSService['destructivelyUpdateType']('bar');

      expect(chartJSService['chart'].data.datasets).toEqual(oldDatasets);
    });

    it('should preserve the original labels', () => {
      const oldDatalabels = chart.data.labels;

      chartJSService['destructivelyUpdateType']('bar');

      expect(chartJSService['chart'].data.labels).toEqual(oldDatalabels);
    });

    it('should preserve the original annotations', () => {
      const oldAnnotations = chart.options.plugins.annotation.annotations;

      chartJSService['destructivelyUpdateType']('bar');

      expect(chartJSService['chart'].options.plugins.annotation.annotations).toEqual(
        oldAnnotations
      );
    });
  });

  describe('function: updateOptions', () => {
    const chartType = 'bar';
    let annotations: AnnotationOptions[];

    beforeEach(() => {
      annotations = [{ type: 'line', yMin: 20, yMax: 20 }];
      chartJSService.renderChart({
        targetElement: canvasElement,
        type: chartType,
        data: [1, 2, 3],
        labels: ['one', 'two', 'three'],
        customOptions: {
          borderColor: 'pink',
        },
        annotations,
      });
    });

    it('should overwrite existing custom options', () => {
      expect(chartJSService['chart'].options.borderColor).toEqual('pink');

      chartJSService.updateOptions(
        {
          borderColor: 'red',
        },
        chartType
      );
      // Options are resolved as part of update
      chartJSService['chart'].update();

      expect(chartJSService['chart'].options.borderColor).toEqual('red');
    });

    it('should overwrite options set by global defaults', () => {
      // Check if a global default is actually being overwritten
      expect(CHART_GLOBAL_DEFAULTS.elements.bar.backgroundColor).not.toBeUndefined();
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
      expect(TEST_CHART_TYPES_CONFIG[chartType].options.indexAxis).not.toBeUndefined();
      expect(TEST_CHART_TYPES_CONFIG[chartType].options.indexAxis).not.toEqual(customIndexAxis);

      chartJSService.updateOptions(
        {
          indexAxis: customIndexAxis,
        },
        chartType
      );
      // Options are resolved as part of update
      chartJSService['chart'].update();

      const chart = chartJSService['chart'];
      expect(chart.options.indexAxis).toEqual(customIndexAxis);
    });

    it('should preserve the original annotations', () => {
      const oldAnnotations = chartJSService['chart'].options.plugins.annotation.annotations;

      chartJSService.updateOptions(
        {
          indexAxis: 'x',
        },
        chartType
      );
      chartJSService['chart'].update();

      const newAnnotations = chartJSService['chart'].options.plugins.annotation.annotations;
      expect(newAnnotations.length).not.toBe(0);
      expect(newAnnotations).toEqual(oldAnnotations);
    });
  });

  describe('function: updateHighlightedElements', () => {
    let data: ChartDataset[] | number[];
    let chart: Chart;

    beforeEach(() => {
      data = [{ data: [1, 2, 3] }, { data: [4, 5, 6] }, { data: [7, 8, 9] }];
      chartJSService.renderChart({
        targetElement: canvasElement,
        type: 'bar',
        data,
        labels: ['one', 'two', 'three'],
      });
      chart = chartJSService['chart'];
    });

    it('should mark the given elements as highlighted for respective datasets', () => {
      /* I have not found a way to directly test which color each datapoint is rendered with. 
      That would however have been the better approach, as it can be seen directly how it is 
      rendered. But this will suffice for now - the assumption is, that if it is marked 
      as highlighted in the dataset, it is rendered with the correct color */
      const highlightedElements: ChartHighlightedElements = [
        [0, 1],
        [0, 2],
        [2, 1],
        [2, 2],
      ];

      chartJSService.updateHighlightedElements(highlightedElements);
      chart.update();

      highlightedElements.forEach(([datasetIndex, dataIndex]) => {
        const dataset = chart.data.datasets[datasetIndex] as ChartDataset;
        expect(dataset.kirbyOptions.highlightedElements.includes(dataIndex)).toBeTrue();
      });
    });

    it('should preserve the original data', () => {
      const originalData = chart.data.datasets.map((dataset) => dataset.data);

      chartJSService.updateHighlightedElements([
        [0, 1],
        [0, 2],
        [2, 1],
        [2, 2],
      ]);
      chart.update();

      const newData = chart.data.datasets.map((dataset) => dataset.data);
      expect(originalData).toEqual(newData);
    });

    describe('when there already are highlighted elements', () => {
      let highlightedElements: ChartHighlightedElements;

      beforeEach(() => {
        highlightedElements = [
          [0, 1],
          [0, 2],
        ];
        chartJSService.updateHighlightedElements(highlightedElements);
        chart.update();
      });

      it('should clear the highlight from existing elements', () => {
        chartJSService.updateHighlightedElements([
          [1, 1],
          [1, 2],
        ]);
        chart.update();

        highlightedElements.forEach(([datasetIndex, dataIndex]) => {
          const dataset = chart.data.datasets[datasetIndex] as ChartDataset;
          expect(dataset?.kirbyOptions?.highlightedElements?.includes(dataIndex)).toBeFalsy();
        });
      });

      it('should be possible to remove all highlights by passing an empty array', () => {
        chartJSService.updateHighlightedElements([]);
        chart.update();

        const datasets = chart.data.datasets as ChartDataset[];
        datasets.forEach((dataset) => {
          expect(dataset?.kirbyOptions?.highlightedElements).toBeFalsy();
        });
      });

      it('should be possible to remove all highlights by passing nothing', () => {
        chartJSService.updateHighlightedElements();
        chart.update();

        const datasets = chart.data.datasets as ChartDataset[];
        datasets.forEach((dataset) => {
          expect(dataset?.kirbyOptions?.highlightedElements).toBeFalsy();
        });
      });
    });
  });

  describe('function: updateAnnotations', () => {
    const chartType = 'bar';
    let chart: Chart;

    beforeEach(() => {
      chartJSService.renderChart({
        targetElement: canvasElement,
        type: chartType,
        data: [1, 2, 3],
        labels: ['one', 'two', 'three'],
      });
      chart = chartJSService['chart'];
    });

    describe('if the chart already has annotations applied', () => {
      beforeEach(() => {
        chart.options.plugins.annotation.annotations = [
          { type: 'line', yMin: -10, yMax: -10 },
          { type: 'line', yMin: 0, yMax: 0 },
        ];
        chartJSService.redrawChart();
        expect(chart.options.plugins.annotation.annotations.length).toEqual(2);
      });

      it('should replace the annotations with new ones', () => {
        const newAnnotations: AnnotationOptions[] = [
          { type: 'line', yMin: 10, yMax: 10 },
          { type: 'line', yMin: 20, yMax: 20 },
        ];

        chartJSService.updateAnnotations(newAnnotations);
        chartJSService.redrawChart();

        const chartAnnotations = chartJSService['chart'].options.plugins.annotation.annotations;
        newAnnotations.forEach((newAnnotation, index) => {
          const chartAnnotation = chartAnnotations[index];
          expect(newAnnotation['yMin']).toEqual(chartAnnotation['yMin']);
          expect(newAnnotation['yMax']).toEqual(chartAnnotation['yMax']);
        });
        expect(chartAnnotations.length).toBe(2);
      });

      it('should be possible to remove the annotations by passing an empty array', () => {
        chartJSService.updateAnnotations([]);
        chartJSService.redrawChart();
        expect(chart.options.plugins.annotation.annotations.length).toEqual(0);
      });
    });

    describe('if the chart has no annotations applied', () => {
      beforeEach(() => {
        expect(chart.options.plugins.annotation.annotations).toEqual({});
      });

      it('should add annotations to the chart', () => {
        const annotations: AnnotationOptions[] = [
          { type: 'line', yMin: 10, yMax: 10 },
          { type: 'line', yMin: 20, yMax: 20 },
        ];
        expect(chart.options.plugins.annotation.annotations).toEqual(Object.create(null));

        chartJSService.updateAnnotations(annotations);
        chartJSService.redrawChart();

        expect(chart.options.plugins.annotation.annotations.length).toEqual(2);
      });
    });

    it('should preserve annotation defaults if they are not overwritten', () => {
      const annotations: AnnotationOptions[] = [
        { type: 'line', yMin: 10, yMax: 10 },
        { type: 'line', yMin: 20, yMax: 20 },
      ];

      chartJSService.updateAnnotations(annotations);
      chartJSService.redrawChart();

      const chartAnnotations = chart.options.plugins.annotation.annotations as AnnotationOptions[];

      chartAnnotations.forEach((chartAnnotation) => {
        const annotationDefaults = TEST_CHART_ANNOTATIONS_CONFIG[chartAnnotation.type];
        Object.entries(annotationDefaults).forEach(([key]) => {
          expect(chartAnnotation[key]).toEqual(annotationDefaults[key]);
        });
      });
    });

    it('should be possible to overwrite annotation defaults', () => {
      expect(TEST_CHART_ANNOTATIONS_CONFIG['line']['borderDash']).toEqual([6, 3]);
      const annotations: AnnotationOptions[] = [
        { type: 'line', yMin: 10, yMax: 10, borderDash: [10, 10] },
        { type: 'line', yMin: 20, yMax: 20, borderDash: [10, 10] },
      ];

      chartJSService.updateAnnotations(annotations);
      chartJSService.redrawChart();

      const chartAnnotations = chart.options.plugins.annotation.annotations as AnnotationOptions[];
      chartAnnotations.forEach((chartAnnotation) => {
        expect(chartAnnotation.borderDash).toEqual([10, 10]);
      });
    });
  });
});
