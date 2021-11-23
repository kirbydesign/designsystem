import { TestBed } from '@angular/core/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

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
});
