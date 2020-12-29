import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { FormatWidth, getLocaleDateFormat } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class DateLocaleAnalyser {
  public separator: string;
  public yearFirst: boolean;
  public dayBeforeMonth: boolean;
  public firstSectionLength: number;

  public dayIndex: number;
  public monthIndex: number;
  public yearIndex: number;

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.yearFirst = false;
    this.firstSectionLength = 2;

    const localeFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);
    this.dayIndex = localeFormat.indexOf('dd');
    if (this.dayIndex === -1) this.dayIndex = localeFormat.indexOf('d');
    this.monthIndex = localeFormat.indexOf('MM');
    if (this.monthIndex === -1) this.monthIndex = localeFormat.indexOf('M');
    this.yearIndex = localeFormat.indexOf('y');

    if (this.yearIndex > 0) {
      this.separator = localeFormat[this.yearIndex - 1];
    } else if (this.dayIndex > 0) {
      this.separator = localeFormat[this.dayIndex - 1];
    } else if (this.monthIndex > 0) {
      this.separator = localeFormat[this.monthIndex - 1];
    }
    // unfortunately, order matters
    if (this.yearIndex < this.dayIndex && this.yearIndex < this.monthIndex) {
      this.yearFirst = true;
      this.firstSectionLength = 4;
    }
    this.dayBeforeMonth = this.dayIndex < this.monthIndex;
  }
}
