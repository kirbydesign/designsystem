import { InjectionToken } from '@angular/core';

export const KIRBY_EXTENSIONS_LOCALIZATION_TOKEN =
  new InjectionToken<KirbyExtensionsLocalizationToken>('KIRBY_EXTENSIONS_LOCALIZATION_TOKEN');

export function provideKirbyExtensionsLocalizationToken(
  factory: () => KirbyExtensionsLocalizationToken
) {
  return {
    provide: KIRBY_EXTENSIONS_LOCALIZATION_TOKEN,
    useFactory: factory,
  };
}

type DkkMapping = Record<'DKK', 'kr.'>;

type CurrencyMappings = DkkMapping & Record<string, string>;

export interface KirbyExtensionsLocalizationToken {
  /**
   * @example 'DKK | EUR'
   */
  nativeCurrency: string;
  /**
   * Default language for the application. Used to determine if the phone number country code should be shown, if not specified as input, based on the locale.
   * @example 'da'
   */
  defaultLang: string;
  /**
   * Default phone country code
   * @example '+45'
   */
  countryCode: string;
  /**
   * Default timezone for the application
   * @example 'Europe/Copenhagen'
   */
  timeZone: string;
  /**
   * @example { DKK: 'kr.', EUR: '€' }
   */
  currencyMappings?: CurrencyMappings;
}
