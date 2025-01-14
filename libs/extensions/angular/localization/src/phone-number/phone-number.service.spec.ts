import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { LOCALE_ID } from '@angular/core';
import { KIRBY_EXTENSIONS_LOCALIZATION_TOKEN } from '../di-tokens';
import { PhoneNumber } from './phone-number';
import { PhoneNumberService } from './phone-number.service';

describe('PhoneNumberService', () => {
  let spectator: SpectatorService<PhoneNumberService>;
  const createService = createServiceFactory({
    service: PhoneNumberService,
    providers: [
      { provide: LOCALE_ID, useValue: 'da' },
      {
        provide: KIRBY_EXTENSIONS_LOCALIZATION_TOKEN,
        useValue: {
          countryCode: '+45',
          defaultLang: 'da',
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
  });

  describe('with PhoneNumber object', () => {
    const phoneNumber: PhoneNumber = {
      countryCode: '+45',
      number: '12341234',
    };

    it('should prefix with country code and chunk number every second character', () => {
      expect(spectator.service.formatPhoneNumber(phoneNumber, 2, true)).toBe('+45 12 34 12 34');
    });

    it('should ignore country code and chunk number every second character', () => {
      expect(spectator.service.formatPhoneNumber(phoneNumber, 2, false)).toBe('12 34 12 34');
    });

    it('should prefix with country code and chunk number every third character', () => {
      expect(spectator.service.formatPhoneNumber(phoneNumber, 3, true)).toBe('+45 123 412 34');
    });

    it('should not show anything if input isnt numeric', () => {
      phoneNumber.number = 'Tlf nr';
      expect(spectator.service.formatPhoneNumber(phoneNumber)).toBe(undefined);
    });
  });

  describe('with phone number string', () => {
    const phoneNumber = '79137913';

    it('should chunk number every second character', () => {
      expect(spectator.service.formatPhoneNumber(phoneNumber)).toBe('79 13 79 13');
    });

    it('should chunk number every third character', () => {
      expect(spectator.service.formatPhoneNumber(phoneNumber, 3)).toBe('791 379 13');
    });

    it('should not show anything if input isnt numeric', () => {
      expect(spectator.service.formatPhoneNumber('invalid')).toBe(undefined);
    });
  });

  describe('should display country code depending on locale', () => {
    it('defaults to displaying no country code if using Danish locale', () => {
      expect(spectator.service.formatPhoneNumber('12345678', 2)).toBe('12 34 56 78');
    });
  });
});

describe('PhoneNumberService foreign', () => {
  let spectator: SpectatorService<PhoneNumberService>;
  const createService = createServiceFactory({
    service: PhoneNumberService,
    providers: [
      { provide: LOCALE_ID, useValue: 'us' },
      {
        provide: KIRBY_EXTENSIONS_LOCALIZATION_TOKEN,
        useValue: {
          countryCode: '+45',
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('defaults to displaying country code if using non-Danish locale', () => {
    expect(spectator.service.formatPhoneNumber('12345678', 2)).toBe('+45 12 34 56 78');
  });
});
