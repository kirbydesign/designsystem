import { formatNumber } from '@angular/common';
import { KirbyExtensionsLocalizationToken } from '../di-tokens';
import { Amount } from './amount.model';

export function formatAmount(
  amount: Amount,
  locale: string,
  config: KirbyExtensionsLocalizationToken,
  amountServiceConfiguration?: AmountServiceConfiguration
) {
  const amountConfig = deriveConfiguration(amountServiceConfiguration);

  let formattedAmount = formatNumber(amount && amount.amount, locale, amountConfig.digitsInfo);

  if (amountConfig.stripSign) {
    formattedAmount = formattedAmount.replace('-', '').trim();
  }

  const currencyCodeToAppend = deriveCurrencyCode(amountConfig, amount, config);

  if (!currencyCodeToAppend) {
    return formattedAmount;
  }
  if (amountConfig.currencyCodePosition === 'postfix') {
    return formattedAmount + ' ' + currencyCodeToAppend;
  } else {
    return currencyCodeToAppend + ' ' + formattedAmount;
  }
}

export function deriveCurrencyCode(
  amountConfig: AmountServiceConfiguration,
  amount: Amount,
  config: KirbyExtensionsLocalizationToken
) {
  let currencyCodeToAppend;

  if (amountConfig.showCurrencyCode) {
    if (amountConfig.showCurrencyCode === 'alwaysShowCurrency') {
      currencyCodeToAppend = amount.currencyCode;
    } else if (amountConfig.showCurrencyCode === 'showForeignCurrency') {
      currencyCodeToAppend =
        amount.currencyCode !== config.nativeCurrency ? amount.currencyCode : '';
    } else if (amountConfig.showCurrencyCode === 'useCurrencyMapping') {
      currencyCodeToAppend = config.currencyMappings?.[amount.currencyCode] || amount.currencyCode;
    }
  }

  return currencyCodeToAppend || '';
}

export function deriveConfiguration(configuration: AmountServiceConfiguration = {}) {
  const config: AmountServiceConfiguration = {
    showCurrencyCode: '',
    digitsInfo: '1.2-2',
    stripSign: false,
  };

  return Object.assign({}, config, configuration);
}

export type ShowCurrencyCode =
  | ''
  | 'alwaysShowCurrency'
  | 'showForeignCurrency'
  | 'useCurrencyMapping';
export type CurrencyCodePosition = '' | 'prefix' | 'postfix';

export interface AmountServiceConfiguration {
  /**
   * - '' - don't output CurrencyCode
   * - 'alwaysShowCurrency' - always shows CurrencyCode, regardless of presentation currency
   * - 'showForeignCurrency' - only show CurrencyCode if it differs from the presentation currency
   * - 'useCurrencyMapping' - Shows the currency symbol defined in KirbyExtensionsLocalizationToken.currencyMappings instead of the currency code. Fallback to currencyCode
   */
  showCurrencyCode?: ShowCurrencyCode;
  /**
   * The position of the currency code in the formatted amount
   * - 'postfix' - output CurrencyCode after the formatted amount, eg. 1.234,56 EUR
   * - 'prefix' - output CurrencyCode before the formatted amount, eg. DKK 1.234,56
   */
  currencyCodePosition?: CurrencyCodePosition;
  /**
   * A string that represents the format of the number. Learn more about the format here: https://angular.io/api/common/DecimalPipe#parameters
   */
  digitsInfo?: string;
  /**
   * Remove the minus sign from the formatted amount and trim any leading or trailing whitespace.
   */
  stripSign?: boolean;
  /**
   * The string to return if the amount is empty
   */
  returnValueOnEmptyAmount?: string;
}
