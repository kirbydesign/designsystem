import { ElementRef } from '@angular/core';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Chart, FontSpec } from 'chart.js';

import { chartConfigHasType, ColorHelper } from '@kirbydesign/designsystem/helpers';
import { ChartConfigService } from '../';

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
        if (chartConfigHasType(chart.config)) {
          expect(chart.config.type).toBe('bar');
        }
      });

      describe('and no custom options are passed', () => {
        beforeEach(() => {
          chartJSService.renderChart({
            targetElement: canvasElement,
            type: 'column',
            data: [1, 2, 3],
            labels: ['one', 'two', 'three'],
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

        // FIXME: Refactor typography test
        xit('should be rendered with correct typography for data labels', () => {
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
            labels: ['one', 'two', 'three'],
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

        if (chartConfigHasType(chart.config)) {
          expect(chart.config.type).toBe('line');
        }
      });

      describe('and no custom options are passed', () => {
        let chart: Chart;

        beforeEach(() => {
          chartJSService.renderChart({
            targetElement: canvasElement,
            type: 'line',
            data: [1, 2, 3],
            labels: ['one', 'two', 'three'],
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

        // FIXME: Refactor typography test
        xit('should be rendered with correct typography for data labels', () => {
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

        if (chartConfigHasType(chart.config)) {
          expect(chart.config.type).toBe('bar');
        }
      });

      describe('and no custom options are passed', () => {
        beforeEach(() => {
          chartJSService.renderChart({
            targetElement: canvasElement,
            type: 'bar',
            data: [1, 2, 3],
            labels: ['one', 'two', 'three'],
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

        // FIXME: Refactor typography test
        xit('should be rendered with correct typography for data labels', () => {
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
            labels: ['one', 'two', 'three'],
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
  });

  describe('private function: createOptionsObject', () => {
    it('should apply interaction functions extensions', () => {
      const applyInteractionFunctionsExtensionsSpy = spyOn<any>(
        chartJSService['chartConfigService'],
        'applyInteractionFunctionsExtensions'
      );

      chartJSService['createOptionsObject']({});

      expect(applyInteractionFunctionsExtensionsSpy).toHaveBeenCalledTimes(1);
    });
  });
});
