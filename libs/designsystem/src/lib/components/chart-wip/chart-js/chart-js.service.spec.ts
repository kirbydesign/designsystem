import { ElementRef } from '@angular/core';
import { Chart, FontSpec } from 'chart.js';
import { AnnotationOptions } from 'chartjs-plugin-annotation';

import { ColorHelper } from '../../../helpers';
import { CHART_ANNOTATION_CONFIGS, CHART_TYPE_CONFIGS } from '../chart-wip.configs';
import { CHART_GLOBAL_DEFAULTS } from '../chart-wip.configs';
import { ChartDataset } from '../chart-wip.types';
import { ChartHighlightedElements } from '../chart-wip.types';

import { ChartJSService } from './chart-js.service';

describe('ChartJSService', () => {
  let chartJSService: ChartJSService;
  let canvasElement: ElementRef<HTMLCanvasElement>;

  beforeEach(() => {
    chartJSService = new ChartJSService();
    const nativeElement = document.createElement('canvas');
    canvasElement = new ElementRef<HTMLCanvasElement>(nativeElement);
  });

  describe('function: renderChart', () => {
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
          dataLabels: ['one', 'two', 'three'],
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
          dataLabels: ['one', 'two', 'three'],
        });

        expect(chartJSService['chart']).toBeInstanceOf(Chart);
      });

      it('should use the supplied data in the chart', () => {
        const data = [1, 2, 3];

        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'bar',
          data,
          dataLabels: ['one', 'two', 'three'],
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
            dataLabels: ['one', 'two', 'three'],
            highlightedElements,
          });

          const datasets = chartJSService['chart'].data.datasets as ChartDataset[];

          expect(datasets.length).toEqual(1);
          expect(datasets[0].kirbyOptions.highlightedElements).toEqual([0, 2]);
        });
      });
    });

    describe('when data is given as a chartJSDataset[]', () => {
      it('should render a new chart', () => {
        expect(chartJSService['chart']).toBeUndefined();

        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'bar',
          data: [{ data: [1, 2, 3] }],
          dataLabels: ['one', 'two', 'three'],
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
          dataLabels: ['one', 'two', 'three'],
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
            dataLabels: ['one', 'two', 'three'],
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
            dataLabels: ['one', 'two', 'three'],
            highlightedElements,
          });

          const datasets = chartJSService['chart'].data.datasets as ChartDataset[];

          expect(datasets.length).toEqual(1);
          expect(datasets[0].kirbyOptions.highlightedElements).toEqual([0, 2]);
        });
      });
    });

    describe('when type is ChartType.column', () => {
      let chart: Chart;

      describe('and no custom options are passed', () => {
        beforeEach(() => {
          chartJSService.renderChart({
            targetElement: canvasElement,
            type: 'column',
            data: [1, 2, 3],
            dataLabels: ['one', 'two', 'three'],
          });
          chart = chartJSService['chart'];
        });

        it('should draw without an axis line', () => {
          expect(chart.options.scales['x'].grid.drawBorder).toBeFalse();
        });

        it('should have correct background color for elements', () => {
          expect(chart.options.elements.bar.backgroundColor).toEqual(
            ColorHelper.getThemeColorHexString('secondary')
          );
        });

        it('should be rendered with correct typography for data labels', () => {
          const { size } = chart.options.scales['x'].ticks.font as FontSpec;
          const { color } = chart.options;
          expect(size).toBe(12);
          expect(color).toBe(ColorHelper.getThemeColorHexString('black'));
        });

        it('should have no hover background color for elements', () => {
          expect(chart.options.elements.bar.hoverBackgroundColor).toBeUndefined();
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

      describe('and onClick is set via custom options', () => {
        beforeEach(() => {
          chartJSService.renderChart({
            targetElement: canvasElement,
            type: 'column',
            data: [1, 2, 3],
            dataLabels: ['one', 'two', 'three'],
            customOptions: {
              onClick: () => console.log('testing'),
            },
          });
          chart = chartJSService['chart'];
        });

        it('should have correct hover background color', () => {
          expect(chart.options.elements.bar.hoverBackgroundColor).toBe('#00e89a');
        });
      });
    });

    describe('when no data labels are provided', () => {
      it('should have a blank label for each data point', () => {
        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'column',
          data: [1, 2, 3],
        });

        const chartDataLabels = chartJSService['chart'].data.labels;
        expect(chartDataLabels.length).toEqual(3);
        chartDataLabels.forEach((dataLabel) => {
          expect(dataLabel).toEqual('');
        });
      });
    });

    describe('when type is ChartType.bar', () => {
      let chart: Chart;

      describe('and no custom options are passed', () => {
        beforeEach(() => {
          chartJSService.renderChart({
            targetElement: canvasElement,
            type: 'bar',
            data: [1, 2, 3],
            dataLabels: ['one', 'two', 'three'],
          });
          chart = chartJSService['chart'];
        });

        it('should draw without an axis line', () => {
          expect(chart.options.scales['y'].grid.drawBorder).toBeFalse();
        });

        it('should have correct background color for elements', () => {
          expect(chart.options.elements.bar.backgroundColor).toEqual(
            ColorHelper.getThemeColorHexString('secondary')
          );
        });

        it('should be rendered with correct typography for data labels', () => {
          const { size } = chart.options.scales['y'].ticks.font as FontSpec;
          const { color } = chart.options;
          expect(size).toBe(14);
          expect(color).toBe(ColorHelper.getThemeColorHexString('black'));
        });

        it('should have no hover background color for elements', () => {
          expect(chart.options.elements.bar.hoverBackgroundColor).toBeUndefined();
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

      describe('and onClick is set via custom options', () => {
        beforeEach(() => {
          chartJSService.renderChart({
            targetElement: canvasElement,
            type: 'bar',
            data: [1, 2, 3],
            dataLabels: ['one', 'two', 'three'],
            customOptions: {
              onClick: () => console.log('testing'),
            },
          });
          chart = chartJSService['chart'];
        });

        it('should have correct hover background color', () => {
          expect(chart.options.elements.bar.hoverBackgroundColor).toBe('#00e89a');
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
          dataLabels: ['one', 'two', 'three'],
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
        expect(CHART_TYPE_CONFIGS[type].options.indexAxis).not.toBeUndefined();
        expect(CHART_TYPE_CONFIGS[type].options.indexAxis).not.toEqual(customIndexAxis);

        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'bar',
          data: [1, 2, 3],
          dataLabels: ['one', 'two', 'three'],
          customOptions: {
            indexAxis: customIndexAxis,
          },
        });

        const chart = chartJSService['chart'];
        expect(chart.options.indexAxis).toEqual(customIndexAxis);
      });
    });

    describe('function: redrawChart', () => {
      beforeEach(() => {
        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'bar',
          data: [1, 2, 3],
          dataLabels: ['one', 'two', 'three'],
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

    describe('function: updateData', () => {
      let chart: Chart;

      beforeEach(() => {
        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'bar',
          data: [1, 2, 3],
          dataLabels: ['one', 'two', 'three'],
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

    describe('function: updateDataLabels', () => {
      let chart: Chart;

      beforeEach(() => {
        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'bar',
          data: [1, 2, 3],
          dataLabels: ['one', 'two', 'three'],
        });
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
        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'bar',
          data: [1, 2, 3],
          dataLabels: ['one', 'two', 'three'],
        });
      });

      describe('if the new type is ChartType.bar', () => {
        it('should destructively update the type', () => {
          const destructivelyUpdateTypeSpy = spyOn<any>(chartJSService, 'destructivelyUpdateType');

          chartJSService.updateType('bar', {});

          expect(destructivelyUpdateTypeSpy).toHaveBeenCalledTimes(1);
        });
      });

      describe('if the new type is ChartType.column', () => {
        it('should destructively update the type', () => {
          const destructivelyUpdateTypeSpy = spyOn<any>(chartJSService, 'destructivelyUpdateType');

          chartJSService.updateType('column', {});

          expect(destructivelyUpdateTypeSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('private function: createOptionsObject', () => {
      it('should apply interaction functions extensions', () => {
        const applyInteractionFunctionsExtensionsSpy = spyOn<any>(
          chartJSService,
          'applyInteractionFunctionsExtensions'
        );

        chartJSService['createOptionsObject']({ type: 'bar' });

        expect(applyInteractionFunctionsExtensionsSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('private function: destructivelyUpdateType', () => {
      let chart: Chart;

      beforeEach(() => {
        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'bar',
          data: [1, 2, 3],
          dataLabels: ['one', 'two', 'three'],
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

      it('should preserve the original dataLabels', () => {
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
          dataLabels: ['one', 'two', 'three'],
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
        expect(CHART_TYPE_CONFIGS[chartType].options.indexAxis).not.toBeUndefined();
        expect(CHART_TYPE_CONFIGS[chartType].options.indexAxis).not.toEqual(customIndexAxis);

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
          dataLabels: ['one', 'two', 'three'],
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
          dataLabels: ['one', 'two', 'three'],
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
        // Arrange
        const annotations: AnnotationOptions[] = [
          { type: 'line', yMin: 10, yMax: 10 },
          { type: 'line', yMin: 20, yMax: 20 },
        ];

        // Act
        chartJSService.updateAnnotations(annotations);
        chartJSService.redrawChart();

        // Assess
        const chartAnnotations = chart.options.plugins.annotation
          .annotations as AnnotationOptions[];

        chartAnnotations.forEach((chartAnnotation) => {
          const annotationDefaults = CHART_ANNOTATION_CONFIGS[chartAnnotation.type];
          Object.entries(annotationDefaults).forEach(([key, _]) => {
            expect(chartAnnotation[key]).toEqual(annotationDefaults[key]);
          });
        });
      });

      it('should be possible to overwrite annotation defaults', () => {
        expect(CHART_ANNOTATION_CONFIGS['line']['borderDash']).toEqual([6, 3]);
        const annotations: AnnotationOptions[] = [
          { type: 'line', yMin: 10, yMax: 10, borderDash: [10, 10] },
          { type: 'line', yMin: 20, yMax: 20, borderDash: [10, 10] },
        ];

        chartJSService.updateAnnotations(annotations);
        chartJSService.redrawChart();

        const chartAnnotations = chart.options.plugins.annotation
          .annotations as AnnotationOptions[];
        chartAnnotations.forEach((chartAnnotation) => {
          expect(chartAnnotation.borderDash).toEqual([10, 10]);
        });
      });
    });
  });
});
