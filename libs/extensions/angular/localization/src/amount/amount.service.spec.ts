import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { KIRBY_EXTENSIONS_LOCALIZATION_TOKEN } from '../di-tokens';
import { AmountService } from './amount.service';
import { Amount } from './amount.model';

registerLocaleData(localeDa);

describe('AmountService', () => {
  let spectator: SpectatorService<AmountService>;

  const createService = createServiceFactory({
    service: AmountService,
    providers: [
      {
        provide: KIRBY_EXTENSIONS_LOCALIZATION_TOKEN,
        useValue: {
          nativeCurrency: 'DKK',
          locale: 'da',
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
});
