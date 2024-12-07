import { formatNumber } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatNumberService {
  constructor(@Inject(LOCALE_ID) private localeId: string) {}

  public formatNumber(value: number, digitsInfo: string) {
    if (value == null) {
      return '';
    }

    return formatNumber(value, this.localeId, digitsInfo);
  }
}
