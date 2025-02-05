import { AccountNumber } from './account-number.model';

export function formatAccountNumber(value: AccountNumber): string {
  return `${value.regNo.padStart(4, '0')} ${value.accountNo.replace(/^0+/, '')}`;
}
