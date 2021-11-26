import { TestBed } from '@angular/core/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ChartDataset, ChartTypeRegistry, ScatterDataPoint } from 'chart.js';
import { ChartPeriod } from 'libs/designsystem/src';

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

    it(`should return ${ChartPeriod.oneDay} when data span is closer to a day than one week`, () => {
      expect(
        service.findChartPeriod(buildDataSet(new Date(2001, 1, 1, 3), new Date(2001, 1, 1, 20)))
      ).toBe(ChartPeriod.oneDay);
    });
    it(`should return ${ChartPeriod.oneYear} when data span is closer to a year than six months or five years`, () => {
      expect(
        service.findChartPeriod(buildDataSet(new Date(2001, 1, 1, 3), new Date(2002, 1, 1, 3)))
      ).toBe(ChartPeriod.oneYear);
    });
    it(`should return ${ChartPeriod.fiveYears} when data span is closer to five years than a year`, () => {
      const years = {
        1: service.findChartPeriod(buildDataSet(new Date(2000, 1, 1, 3), new Date(2001, 1, 1, 3))),
        2: service.findChartPeriod(buildDataSet(new Date(2000, 1, 1, 3), new Date(2002, 1, 1, 3))),
        3: service.findChartPeriod(buildDataSet(new Date(2000, 1, 1, 3), new Date(2003, 1, 1, 3))),
        4: service.findChartPeriod(buildDataSet(new Date(2000, 1, 1, 3), new Date(2004, 1, 1, 3))),
        5: service.findChartPeriod(buildDataSet(new Date(2000, 1, 1, 3), new Date(2005, 1, 1, 3))),
      };
      expect(years).toEqual({
        1: ChartPeriod.oneYear,
        2: ChartPeriod.oneYear,
        3: ChartPeriod.fiveYears,
        4: ChartPeriod.fiveYears,
        5: ChartPeriod.fiveYears,
      });

      expect(years[5]).toEqual(ChartPeriod.fiveYears);
    });
  });
});
