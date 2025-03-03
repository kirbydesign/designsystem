import { Pipe, PipeTransform } from '@angular/core';

import { AccountNumber } from './account-number.model';
import { formatAccountNumber } from './account-number-service-formatter';

/**
 * Pipe that formats a {@link AccountNumber}-object to a common format.
 */
@Pipe({
  name: 'accountNumber',
  standalone: true,
})
export class AccountNumberPipe implements PipeTransform {
  /**
   *  Formats the {@link AccountNumber} to a common format.
   *
   * @param value the {@link AccountNumber} to format
   */
  transform(value: AccountNumber): string | undefined {
    return formatAccountNumber(value);
  }
}
