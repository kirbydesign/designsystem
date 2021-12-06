import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ChartPeriod } from '../chart.types';

import { ChartI18nService } from './chart-i18n.service';
import { TEST_CHART_TYPES_CONFIG } from './test-utils';

describe('ChartI18nService', () => {
  let service: ChartI18nService;
  let spectator: SpectatorService<ChartI18nService>;

  const createService = createServiceFactory({
    service: ChartI18nService,
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handleLocalization', () => {
    it('should return da locale if input is "da-DK"', () => {
      expect(
        service.handleLocalization(
          TEST_CHART_TYPES_CONFIG['stock'].options,
          ChartPeriod.oneYear,
          'da-DK'
        ).locale
      ).toEqual('da-DK');
    });

    it('should return enUS locale if input is "en-US"', () => {
      expect(
        service.handleLocalization(
          TEST_CHART_TYPES_CONFIG['stock'].options,
          ChartPeriod.oneYear,
          'en-US'
        ).locale
      ).toEqual('en-US');
    });

    it('day format should be d MMM if input is "da-DK', () => {
      expect(
        (service.handleLocalization(
          TEST_CHART_TYPES_CONFIG['stock'].options,
          ChartPeriod.oneYear,
          'da-DK'
        ).scales.x as any).time.displayFormats.day
      ).toEqual('d MMM');
    });

    it('day format should be MMM d if input is "en-US', () => {
      expect(
        (service.handleLocalization(
          TEST_CHART_TYPES_CONFIG['stock'].options,
          ChartPeriod.oneYear,
          'en-US'
        ).scales.x as any).time.displayFormats.day
      ).toEqual('MMM d');
    });
  });
});
