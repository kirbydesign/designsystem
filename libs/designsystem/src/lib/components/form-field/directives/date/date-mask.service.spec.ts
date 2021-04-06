import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import localeDaExtra from '@angular/common/locales/extra/da';
import { LOCALE_ID } from '@angular/core';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { DateMaskService } from './date-mask.service';

describe('DateMaskService', () => {
  let spectator: SpectatorService<DateMaskService>;
  let locale: 'da' | 'en-GB';

  registerLocaleData(localeDa, 'da', localeDaExtra);

  const createDateMaskService = createServiceFactory({
    service: DateMaskService,
    providers: [
      {
        provide: LOCALE_ID,
        useFactory: () => locale,
      },
    ],
  });

  describe('locale: en-GB', () => {
    beforeEach(() => {
      locale = 'en-GB';
      spectator = createDateMaskService();
    });

    it('should have correct separator', () => {
      expect(spectator.service.separator).toEqual('/');
    });

    it('should have correct placeholderChars', () => {
      expect(spectator.service.blocks.d.placeholderChar).toEqual('d');
      expect(spectator.service.blocks.m.placeholderChar).toEqual('m');
      expect(spectator.service.blocks.y.placeholderChar).toEqual('y');
    });

    it('should have correct pattern', () => {
      expect(spectator.service.pattern).toEqual('m/`d/`y');
    });
  });

  describe('locale: da', () => {
    beforeEach(() => {
      locale = 'da';
      spectator = createDateMaskService();
    });

    it('should have correct separator', () => {
      expect(spectator.service.separator).toEqual('.');
    });

    it('should have correct placeholderChars', () => {
      expect(spectator.service.blocks.d.placeholderChar).toEqual('d');
      expect(spectator.service.blocks.m.placeholderChar).toEqual('m');
      expect(spectator.service.blocks.y.placeholderChar).toEqual('å');
    });

    it('should have correct pattern', () => {
      expect(spectator.service.pattern).toEqual('d.`m.`y');
    });
  });
});
