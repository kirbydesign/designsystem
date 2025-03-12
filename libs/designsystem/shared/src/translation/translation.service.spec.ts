import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { LOCALE_ID } from '@angular/core';
import { TranslationService } from './translation.service';
import { en } from './translations/en';
import { da } from './translations/da';
import { de } from './translations/de';
import { Translation } from './translation.interface';

describe('TranslationService', () => {
  let spectator: SpectatorService<TranslationService>;
  const createService = createServiceFactory({
    service: TranslationService,
    providers: [{ provide: LOCALE_ID, useValue: 'en' }],
  });

  it('should be created', () => {
    spectator = createService();
    expect(spectator.service).toBeTruthy();
  });

  it('should set active translation based on locale', () => {
    spectator = createService();
    expect(spectator.service.get('$code')).toBe(en.$code);
  });

  it('should fall back to default translation if locale is not found', () => {
    spectator = createService({
      providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
    });
    expect(spectator.service.get('$code')).toBe(en.$code);
  });

  it('should return all translations correctly for da key', () => {
    spectator = createService({ providers: [{ provide: LOCALE_ID, useValue: 'da' }] });

    Object.keys(da).forEach((key: keyof Translation) => {
      expect(spectator.service.get(key)).toBe(da[key]);
    });
  });

  it('should return all translations correctly for en key', () => {
    spectator = createService({ providers: [{ provide: LOCALE_ID, useValue: 'en' }] });

    Object.keys(en).forEach((key: keyof Translation) => {
      expect(spectator.service.get(key)).toBe(en[key]);
    });
  });

  it('should return all translations correctly for de key', () => {
    spectator = createService({ providers: [{ provide: LOCALE_ID, useValue: 'de' }] });

    Object.keys(de).forEach((key: keyof Translation) => {
      expect(spectator.service.get(key)).toBe(de[key]);
    });
  });
});
