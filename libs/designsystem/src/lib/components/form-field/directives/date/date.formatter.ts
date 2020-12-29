import { DatePipe, FormatWidth, getLocaleDateFormat } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string, private datePipe: DatePipe) {
    this.dateFormat = getLocaleDateFormat(this.locale, FormatWidth.Medium);
  }

  private dateFormat: string;
  public format(value: string): string {
    if (value === undefined || value === null) {
      return '';
    }
    return this.datePipe.transform(value, null, null, this.locale);
  }
}
