import { ElementRef } from '@angular/core';
import { chartConfigHasType } from '@kirbydesign/designsystem/helpers';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Chart } from 'chart.js';

import { ChartConfigService } from '../shared';

import { StockChartJSService } from './stock-chart-js.service';

describe('StockChartJSService with ChartConfigService', () => {
  let spectator: SpectatorService<StockChartJSService>;
  let chartJSService: StockChartJSService;
  let canvasElement: ElementRef<HTMLCanvasElement>;

  const createService = createServiceFactory({
    service: StockChartJSService,
    providers: [ChartConfigService],
  });

  beforeEach(() => {
    spectator = createService();
    const nativeElement = document.createElement('canvas');

    chartJSService = spectator.service;
    canvasElement = new ElementRef<HTMLCanvasElement>(nativeElement);
  });

  describe('function: renderChart', () => {
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
        dataLabelOptions: {
          locale: 'da-DK',
          valueSuffix: '%',
          showMin: true,
        },
      });
      chart = chartJSService['chart'];
    });

    it('should use correct ChartJS type', () => {
      if (chartConfigHasType(chart.config)) {
        expect(chart.config.type).toBe('line');
      }
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
});
