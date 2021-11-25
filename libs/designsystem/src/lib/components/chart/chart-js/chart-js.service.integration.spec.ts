import { ElementRef } from '@angular/core';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Chart, FontSpec } from 'chart.js';

import { ColorHelper } from '../../../helpers';
import { ChartType } from '../chart.types';
import { ChartConfigService } from '../configs/chart-config.service';

import { ChartJSService } from './chart-js.service';

describe('ChartJSService with ChartConfigService', () => {
  let spectator: SpectatorService<ChartJSService>;
  let chartJSService: ChartJSService;
  let canvasElement: ElementRef<HTMLCanvasElement>;

  const createService = createServiceFactory({
    service: ChartJSService,
    providers: [ChartConfigService],
  });

  beforeEach(() => {
    spectator = createService();
    const nativeElement = document.createElement('canvas');

    chartJSService = spectator.service;
    canvasElement = new ElementRef<HTMLCanvasElement>(nativeElement);
  });

  describe('function: renderChart', () => {
    describe('when type is "column"', () => {
      let chart: Chart;
      it('should use correct ChartJS type', () => {
        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'column',
          data: [1, 2, 3],
        });
        const chart = chartJSService['chart'];

        /* Our 'column' chart is a chart.js 'bar' type chart 
        with it's indexAxis set to y; therefore testing if 
        bar is being used. */
        expect(chart.config.type).toBe('bar');
      });

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

        it('should have correct barPercentage', () => {
          expect(chart.options.datasets.bar.barPercentage).toBe(0.6);
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

    describe('when type is "line"', () => {
      it('should use correct ChartJS type', () => {
        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'line',
          data: [1, 2, 3],
        });
        const chart = chartJSService['chart'];

        expect(chart.config.type).toBe('line');
      });

      describe('and no custom options are passed', () => {
        let chart: Chart;

        beforeEach(() => {
          chartJSService.renderChart({
            targetElement: canvasElement,
            type: 'line',
            data: [1, 2, 3],
            dataLabels: ['one', 'two', 'three'],
          });
          chart = chartJSService['chart'];
        });

        it('should hide point elements', () => {
          expect(chart.options.elements.point.radius).toBe(0);
        });

        it('should have correct tension', () => {
          expect(chart.options.elements.line.tension).toBe(0.3);
        });

        it('should draw the line with correct color', () => {
          expect(chart.options.elements.line.borderColor).toBe(
            ColorHelper.getThemeColorHexString('secondary')
          );
        });

        it('should not display the y-axis', () => {
          expect(chart.options.scales['y'].display).toBeFalse();
        });

        it('should have no grid', () => {
          expect(chart.options.scales.linear.display).toBeFalse();
          expect(chart.options.scales.linear.ticks.display).toBeFalse();
          expect(chart.options.scales.category.grid.display).toBeFalse();
        });

        it('should have no legend', () => {
          expect(chart.options.plugins.legend.display).toBeFalse();
        });

        it('should have no hover color for line', () => {
          expect(chart.options.elements.line.hoverBackgroundColor).toBeUndefined();
        });

        it('should be rendered with correct typography for data labels', () => {
          const { size } = chart.options.scales['x'].ticks.font as FontSpec;
          const { color } = chart.options;
          expect(size).toBe(12);
          expect(color).toBe(ColorHelper.getThemeColorHexString('black'));
        });

        it('should be rendered with correctly styled x-axis line', () => {
          expect(chart.options.scales.x.grid.borderColor).toBe(
            ColorHelper.getThemeColorHexString('medium')
          );
          expect(chart.options.scales.x.grid.borderWidth).toBe(1);
        });

        it('should render line elements with correct width', () => {
          expect(chart.options.elements.line.borderWidth).toBe(2);
        });
      });
    });

    describe('when type is "bar"', () => {
      let chart: Chart;

      it('should use correct ChartJS type', () => {
        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'bar',
          data: [1, 2, 3],
        });
        const chart = chartJSService['chart'];

        expect(chart.config.type).toBe('bar');
      });

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

        it('should have correct barPercentage', () => {
          expect(chart.options.datasets.bar.barPercentage).toBe(0.6);
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
    
    describe('when type is "stock"', () => {
      let chart: Chart;

      beforeEach(() => {
        chartJSService.renderChart({
          targetElement: canvasElement,
          type: 'stock',
          data: [
            {
              data: [
                { x: 10, y: 5 },
                { x: 11, y: 6 },
              ],
            },
          ],
          chartDataLabelOptions: {
            locale: 'da-DK',
            valueSuffix: '%',
            showMin: true,
          },
        });
        chart = chartJSService['chart'];
      });

      it('should use correct ChartJS type', () => {
        expect(chart.config.type).toBe('line');
      });
      
      it('should have correct tension', () => {
        expect(chart.options.elements.line.tension).toBe(0);
      });
      
      it('should have datalabels configuration', () => {
        expect(chart.options.plugins.datalabels).toBeTruthy();
      });
      
      describe('when ChartDataLabelOptions is passed', () => {
        it('chart should have locale if ChartDataLabelOptions.locale', () => {
          expect(chart.options.locale).toBe('da-DK');
        });
        
        it('chart data should have suffix if ChartDataLabelOptions.valueSuffix', () => {
          const dataItemWithLabel: any = chart.data.datasets[0].data.find(
            (dataItem) => (dataItem as any).datalabel
          );
          expect(dataItemWithLabel.datalabel.value).toContain('%');
        });
      });
    });
    describe('createConfigurationObject', () => {
      it('should not be filled with blank labels if type is stock', () => {
        const lineChartConfig = {
          targetElement: canvasElement,
          type: 'line' as ChartType,
          data: [
            {
              data: [
                { x: 10, y: 5 },
                { x: 11, y: 6 },
                { x: 13, y: 6 },
              ],
            },
          ],
        };
        chartJSService.renderChart({ ...lineChartConfig });
        chart = chartJSService['chart'];
        expect(chartJSService['chart'].data.labels.length).toEqual(3);
        chartJSService['chart'].destroy();

        chartJSService.renderChart({ ...lineChartConfig, type: 'stock' as ChartType });
        expect(chartJSService['chart'].data.labels.length).toEqual(0);
      });
    });
  });
});
