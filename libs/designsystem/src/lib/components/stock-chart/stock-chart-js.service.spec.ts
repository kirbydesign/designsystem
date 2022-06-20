import { ElementRef } from '@angular/core';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ChartDataset as ChartJSDataset, ChartType as ChartJSType } from 'chart.js';
import { MockProvider } from 'ng-mocks';

import { deepCopy } from '../../helpers/deep-copy';
import {
  TEST_CHART_ANNOTATIONS_CONFIG,
  TEST_CHART_TYPES_CONFIG,
} from '../chart/chart-js/test-utils';
import { ChartDataset, ChartType } from '../chart/chart.types';
import { ChartConfigService } from '../chart/configs/chart-config.service';

import { StockChartJSService } from './stock-chart-js.service';

fdescribe('StockChartJSService', () => {
  let spectator: SpectatorService<StockChartJSService>;
  let chartJSService: StockChartJSService;
  let canvasElement: ElementRef<HTMLCanvasElement>;

  const mockChartConfigService = MockProvider(ChartConfigService, {
    getTypeConfig: (chartType: ChartType) => deepCopy(TEST_CHART_TYPES_CONFIG[chartType]),
    getInteractionFunctionsExtensions: () => ({ onHover: () => null }),
    getAnnotationDefaults: (type: string) => TEST_CHART_ANNOTATIONS_CONFIG[type],
    chartTypeToChartJSType: (type: ChartType) => TEST_CHART_TYPES_CONFIG[type].type as ChartJSType,
  });

  const createService = createServiceFactory({
    service: StockChartJSService,
    providers: [mockChartConfigService],
  });

  beforeEach(() => {
    spectator = createService();
    const nativeElement = document.createElement('canvas');

    chartJSService = spectator.service;
    canvasElement = new ElementRef<HTMLCanvasElement>(nativeElement);
  });

  describe('function: renderChart', () => {
    describe('when no labels are provided', () => {
      describe('function: createConfigurationObject', () => {
        it('should not be filled with blank labels if type is stock', () => {
          const stockChartConfig = {
            targetElement: canvasElement,
            type: 'stock' as ChartType,
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
          chartJSService.renderChart(stockChartConfig);

          expect(chartJSService['chart'].data.labels.length).toEqual(3);
          chartJSService['chart'].data.labels.forEach((label) => {
            expect(label).not.toBe('');
          });
        });
      });
    });
  });

  describe('private function: addDataLabelsData', () => {
    const data: ChartDataset[] = [
      {
        data: [
          { x: 10, y: 3 },
          { x: 2, y: 7 },
          { x: 19, y: -10 },
        ],
      },
    ];

    const dataLabelOptionsProperties = ['showMax', 'showMin', 'showCurrent'];

    dataLabelOptionsProperties.forEach((property) => {
      xdescribe(`when ChartDataLabelsOptions.${property} is true`, () => {
        it(`should have an datalabel propery in dataset`, () => {
          chartJSService.setDataLabelOptions({ [property]: true });
          const result = chartJSService['addDataLabelsData'](deepCopy(data));
          expect(
            (result[0] as ChartJSDataset).data.find((item: any) => item.datalabel)
          ).toBeTruthy();
        });
      });
    });

    describe('when neither ChartDataLabelsOptions.showMin, showMax, showCurrent is true', () => {
      it('should NOT have an datalabel propery in dataset', () => {
        chartJSService.setDataLabelOptions({});

        const result = chartJSService['addDataLabelsData'](deepCopy(data));
        expect((result[0] as ChartJSDataset).data.find((item: any) => item.datalabel)).toBeFalsy();
      });
    });
  });
});
