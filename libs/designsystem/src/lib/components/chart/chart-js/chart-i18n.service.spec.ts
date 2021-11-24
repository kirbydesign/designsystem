import { TestBed } from '@angular/core/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { deepStrictEqual } from 'assert';

import { ChartI18nService } from './chart-i18n.service';

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

  describe('getLocale', () => {
    it('should return da locale if input is "da-DK"', () => {
      pending('unimplemented');
    });
    it('should return enUS locale if input is "en-US"', () => {
      pending('unimplemented');
    });
  });

  describe('getDisplayFormats', () => {
    it('day format should be d MMM if input is "da-DK', () => {
      pending('unimplemented');
    });
    it('day format should be MMM d if input is "en-US', () => {
      pending('unimplemented');
    });
  });

  describe('handleLocalization', () => {
    it('should have tooltip format should be day for oneWeek, oneMonth, threeMonths, sixMonths, oneYear', () => {
      pending('unimplemented');
    });
  });
});
