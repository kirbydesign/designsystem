import { InjectionToken } from '@angular/core';

export const KIRBY_EXTENSIONS_LOCALIZATION_TOKEN = new InjectionToken<KirbyExtensionsToken>(
  'KIRBY_EXTENSIONS_LOCALIZATION_TOKEN'
);

export function provideKirbyExtensionsToken(factory: () => KirbyExtensionsToken) {
  return {
    provide: KIRBY_EXTENSIONS_LOCALIZATION_TOKEN,
    useFactory: factory,
  };
}

interface KirbyExtensionsToken {
  /**
   * @example 'DKK | kr. | EUR'
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
   * Locale for the application
   * @example 'da'
   */
  locale: string;
}
