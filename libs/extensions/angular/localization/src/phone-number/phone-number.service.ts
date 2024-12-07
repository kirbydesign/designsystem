import { inject, Injectable } from '@angular/core';

import { KIRBY_EXTENSIONS_LOCALIZATION_TOKEN } from '../di-tokens';
import { PhoneNumber } from './phone-number';

@Injectable({
  providedIn: 'root',
})
export class PhoneNumberService {
  private config = inject(KIRBY_EXTENSIONS_LOCALIZATION_TOKEN);

  private static chunkUpPhoneNumber(str: string, chunk: number): string {
    return str.match(new RegExp(`.{1,${chunk}}`, 'g'))?.join(' ') ?? '';
  }

  formatPhoneNumber(
    phoneNumber: PhoneNumber | string,
    chunk = 2,
    showCountryCode?: boolean
  ): string | undefined {
    let countryCode: string;
    let number: string;

    if (typeof phoneNumber === 'string') {
      countryCode = this.config.countryCode || '';
      number = phoneNumber;
    } else {
      countryCode = phoneNumber.countryCode;
      number = phoneNumber.number;
    }

    if (!/^\d+$/.test(number)) {
      return;
    }

    if (showCountryCode === undefined) {
      showCountryCode = !this.config.locale.match(`${this.config.defaultLang}.*`);
    }

    const formattedNumber = PhoneNumberService.chunkUpPhoneNumber(number, chunk);

    if (showCountryCode) {
      return `${countryCode} ${formattedNumber}`;
    } else {
      return formattedNumber;
    }
  }
}
