import { Pipe, PipeTransform } from '@angular/core';

import { Amount } from './amount.model';
import { AmountService } from './amount.service';
import { AmountServiceConfiguration } from './amount-service-formatter';

/**
 * Pipe that formats a {@link Amount}-object (based on configuration), and can apply the following logic:
 * - display a currency code (either prefixed or postfixed), or not at all
 * - format the amount to a specified number of decimal places (in the current locale)
 * - strip `-` (minus) from a negative amount
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
  transform(amount: Amount, amountServiceConfiguration: AmountServiceConfiguration) {
    return this.amountService.formatAmount(amount, amountServiceConfiguration);
  }
}
