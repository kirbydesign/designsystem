import { inject, Injectable, LOCALE_ID } from '@angular/core';

import { KIRBY_EXTENSIONS_LOCALIZATION_TOKEN } from '../di-tokens';
import { Amount } from './amount.model';
import {
  AmountServiceConfiguration,
  deriveConfiguration,
  formatAmount,
} from './amount-service-formatter';

@Injectable({
  providedIn: 'root',
})
export class AmountService {
  private config = inject(KIRBY_EXTENSIONS_LOCALIZATION_TOKEN);
  private locale = inject(LOCALE_ID);
  /**
   * Applies the transformation logic, by taking the `amount`-argument, and a configuration object - {@link AmountServiceConfiguration}
   *
   * The number is always formatted according to Angular LOCALE_ID
   *
   * @param amount the {@link Amount} to configure
   * @param amountServiceConfiguration
   */

  formatAmount(amount: Amount, amountServiceConfiguration?: AmountServiceConfiguration) {
    if (amount == undefined) {
      const config = deriveConfiguration(amountServiceConfiguration);
      if (config.returnValueOnEmptyAmount) {
        return config.returnValueOnEmptyAmount;
      }
      amount = {
        amount: 0.0,
        currencyCode: '',
      };
    }

    return formatAmount(amount, this.locale, this.config, amountServiceConfiguration);
  }
}
