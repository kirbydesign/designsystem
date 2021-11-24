import { TestBed } from '@angular/core/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ChartDataset, ChartTypeRegistry, ScatterDataPoint } from 'chart.js';
import { ChartDataDateSpan } from 'libs/designsystem/src';

import { ChartConfigService } from './chart-config.service';

describe('ChartConfigService', () => {
  let service: ChartConfigService;
  let spectator: SpectatorService<ChartConfigService>;

  const createService = createServiceFactory({
    service: ChartConfigService,
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findChartPeriod', () => {
    const buildDataSet = (first: Date, last: Date): ChartDataset => {
      const data: ChartDataset<keyof ChartTypeRegistry, ScatterDataPoint[]> = {
        data: [
          {
            x: first.getTime(),
            y: 1,
          },
          {
            x: last.getTime(),
            y: 2,
          },
        ],
      };
      return data;
    };

    it(`should return ${ChartDataDateSpan.oneDay} when data span is closer to a day than one week`, () => {
      expect(
        service.findChartPeriod(buildDataSet(new Date(2001, 1, 1, 3), new Date(2001, 1, 1, 20)))
      ).toBe(ChartDataDateSpan.oneDay);
    });
    it(`should return ${ChartDataDateSpan.oneYear} when data span is closer to a year than six months or five years`, () => {
      expect(
        service.findChartPeriod(buildDataSet(new Date(2001, 1, 1, 3), new Date(2002, 1, 1, 3)))
      ).toBe(ChartDataDateSpan.oneYear);
    });
    it(`should return ${ChartDataDateSpan.fiveYears} when data span is closer to five years than a year`, () => {
      const years = {
        1: service.findChartPeriod(buildDataSet(new Date(2000, 1, 1, 3), new Date(2001, 1, 1, 3))),
        2: service.findChartPeriod(buildDataSet(new Date(2000, 1, 1, 3), new Date(2002, 1, 1, 3))),
        3: service.findChartPeriod(buildDataSet(new Date(2000, 1, 1, 3), new Date(2003, 1, 1, 3))),
        4: service.findChartPeriod(buildDataSet(new Date(2000, 1, 1, 3), new Date(2004, 1, 1, 3))),
        5: service.findChartPeriod(buildDataSet(new Date(2000, 1, 1, 3), new Date(2005, 1, 1, 3))),
      };
      expect(years).toEqual({
        1: ChartDataDateSpan.oneYear,
        2: ChartDataDateSpan.oneYear,
        3: ChartDataDateSpan.fiveYears,
        4: ChartDataDateSpan.fiveYears,
        5: ChartDataDateSpan.fiveYears,
      });

      expect(years[5]).toEqual(ChartDataDateSpan.fiveYears);
    });
  });
});
