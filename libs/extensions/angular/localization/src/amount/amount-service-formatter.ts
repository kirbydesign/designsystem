import { formatNumber } from '@angular/common';

import { Amount } from './amount.model';

export function formatAmount(
  amount: Amount,
  amountServiceConfiguration: AmountServiceConfiguration,
  locale: string,
  nativeCurrency: string
) {
  const config = deriveConfiguration(amountServiceConfiguration);

  let formattedAmount = formatNumber(amount && amount.amount, locale, config.digitsInfo);

  if (config.stripSign) {
    formattedAmount = formattedAmount.replace('-', '').trim();
  }

  const currencyCodeToAppend = deriveCurrencyCode(config, amount, nativeCurrency);

  if (!currencyCodeToAppend) {
    return formattedAmount;
  }
  if (config.currencyCodePosition === 'postfix') {
    return formattedAmount + ' ' + currencyCodeToAppend;
  } else {
    return currencyCodeToAppend + ' ' + formattedAmount;
  }
}

export function deriveCurrencyCode(
  config: AmountServiceConfiguration,
  amount: Amount,
  nativeCurrency: string
) {
  let currencyCodeToAppend;

  if (config.showCurrencyCode) {
    if (config.showCurrencyCode === 'alwaysShowCurrency') {
      currencyCodeToAppend = amount && amount.currencyCode;
    } else if (config.showCurrencyCode === 'showForeignCurrency') {
      currencyCodeToAppend =
        amount && amount.currencyCode !== nativeCurrency ? amount.currencyCode : '';
    }
  }

  return currencyCodeToAppend || '';
}

export function deriveConfiguration(configuration: AmountServiceConfiguration) {
  const config: AmountServiceConfiguration = {
    showCurrencyCode: '',
    digitsInfo: '1.2-2',
    stripSign: false,
  };

  return Object.assign({}, config, configuration);
}

export type ShowCurrencyCode = '' | 'alwaysShowCurrency' | 'showForeignCurrency';
export type CurrencyCodePosition = '' | 'prefix' | 'postfix';

export interface AmountServiceConfiguration {
  /**
   * - '' - don't output CurrencyCode
   * - 'alwaysShowCurrency' - always shows CurrencyCode, regardless of presentation currency
   * - 'showForeignCurrency' - only show CurrencyCode if it differs from the presentation currency
   */
  showCurrencyCode: ShowCurrencyCode;
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
