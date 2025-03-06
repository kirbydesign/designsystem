import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { LOCALE_ID } from '@angular/core';
import { KIRBY_EXTENSIONS_LOCALIZATION_TOKEN } from '../di-tokens';
import { AmountService } from './amount.service';
import { Amount } from './amount.model';

registerLocaleData(localeDa);

describe('AmountService', () => {
  let spectator: SpectatorService<AmountService>;

  const createService = createServiceFactory({
    service: AmountService,
    providers: [
      { provide: LOCALE_ID, useValue: 'da' },
      {
        provide: KIRBY_EXTENSIONS_LOCALIZATION_TOKEN,
        useValue: {
          nativeCurrency: 'DKK',
          currencyMappings: { DKK: 'kr.' },
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should return formatted amount', () => {
    const amount: Amount = {
      amount: 13.37,
      currencyCode: 'DKK',
    };
    expect(spectator.service.formatAmount(amount, { showCurrencyCode: '' })).toBe('13,37');
  });

  it('should return formatted amount with currency', () => {
    const amount: Amount = {
      amount: 13.37,
      currencyCode: 'DKK',
    };
    expect(
      spectator.service.formatAmount(amount, {
        showCurrencyCode: 'alwaysShowCurrency',
      })
    ).toBe('DKK 13,37');
  });

  it('should return empty string if amount is undefined', () => {
    expect(
      spectator.service.formatAmount(undefined as unknown as Amount, {
        showCurrencyCode: '',
      })
    ).toBe('0,00');
  });

  it('should return default string if amount is undefined', () => {
    const returnValueOnEmptyAmount = 'no value';
    expect(
      spectator.service.formatAmount(undefined as unknown as Amount, {
        showCurrencyCode: '',
        returnValueOnEmptyAmount,
      })
    ).toBe(returnValueOnEmptyAmount);
  });

  it('should show currencyMapping', () => {
    const amount: Amount = {
      amount: 13.37,
      currencyCode: 'DKK',
    };
    expect(
      spectator.service.formatAmount(amount, {
        showCurrencyCode: 'useCurrencyMapping',
      })
    ).toBe('kr. 13,37');
  });

  it('should show fallback currency', () => {
    const amount: Amount = {
      amount: 13.37,
      currencyCode: 'EUR',
    };
    expect(
      spectator.service.formatAmount(amount, {
        showCurrencyCode: 'useCurrencyMapping',
      })
    ).toBe('EUR 13,37');
  });
});
