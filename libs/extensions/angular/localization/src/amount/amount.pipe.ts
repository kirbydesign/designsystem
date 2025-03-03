import { Pipe, PipeTransform } from '@angular/core';

import { Amount } from './amount.model';
import { AmountService } from './amount.service';
import { AmountServiceConfiguration } from './amount-service-formatter';

/**
 * Configuration object for the amount-pipe. The configuration object can be used to control
 * the formatting of the amount, and can be passed as an argument to the amount-pipe when used on an {@link Amount}.
 * - `showCurrencyCode`: Controls whether the currency code should be displayed or not.
 *   - `''`: Don't output currency code
 *   - `alwaysShowCurrency`: Always show currency code, regardless of presentation currency
 *   - `showForeignCurrency`: Only show currency code if it differs from the presentation currency
 * - `digitsInfo`: A string that represents the format of the number. Learn more about the format here: https://angular.io/api/common/DecimalPipe#parameters
 * - `stripSign`: Controls whether the minus sign should be stripped from a negative amount.
 * - `currencyCodePosition`: Controls the position of the currency code in the formatted amount.
 *   - `postfix`: Output currency code after the formatted amount, e.g. 1.234,56 EUR
 *   - `prefix`: Output currency code before the formatted amount, e.g. DKK 1.234,56
 */
@Pipe({
  name: 'amount',
  standalone: true,
})
export class AmountPipe implements PipeTransform {
  constructor(private amountService: AmountService) {}

  /**
   * Applies the transformation logic, by taking the `amount`-argument, and a configuration object - {@link AmountServiceConfiguration} (or a number of arguments, for backwards compatibility).
   *
   * @param amount the {@link Amount} to configure
   * @param amountServiceConfiguration
   */
  transform(amount: Amount, amountServiceConfiguration?: AmountServiceConfiguration) {
    return this.amountService.formatAmount(amount, amountServiceConfiguration);
  }
}
