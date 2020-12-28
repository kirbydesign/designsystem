import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NumericFormatter {
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private decimalPipe: DecimalPipe,
    private currencyPipe: CurrencyPipe
  ) {}

  public format(numb: number): string {
    const format = '2.0';
    const result = this.decimalPipe.transform(numb, format, this.locale);
    if (result !== undefined && result !== null && result.length > 0 && result[0] === '0') {
      return result.substr(1);
    }
    return result;
  }
  public formatCurrency(numb: number): string {
    const format = '2.0';
    return this.currencyPipe.transform(numb, format, this.locale);
  }
}
