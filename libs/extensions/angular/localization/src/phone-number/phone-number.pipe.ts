import { Pipe, PipeTransform } from '@angular/core';

import { PhoneNumber } from './phone-number';
import { PhoneNumberService } from './phone-number.service';

@Pipe({
  name: 'phoneNumber',
  standalone: true,
})
export class PhoneNumberPipe implements PipeTransform {
  constructor(private phoneNumberService: PhoneNumberService) {}

  /**
   * Transforms a phone number, chunked up with spaces between the chunks and the country code in front, if desired.
   *
   * @param phoneNumber A PhoneNumber or a string representation of a phone number
   * @param chunk The chunk size used to split up the phone number with spaces
   * @param showCountryCode Show the country code in front of the phone number. If a string representation is supplied, the KIRBY_EXTENSIONS_LOCALIZATION_TOKEN.countryCode is used.
   */
  transform(
    phoneNumber: PhoneNumber | string,
    chunk = 2,
    showCountryCode?: boolean
  ): string | undefined {
    return this.phoneNumberService.formatPhoneNumber(phoneNumber, chunk, showCountryCode);
  }
}
