import {
  DatePipe,
  FormatWidth,
  getLocaleDateFormat,

} from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';

type Config = {};

class DatePatterns {
  public static dates = '([0-3][1-9]|[1-9])';
  public static months = '([0-1][0-2]|[1-9])';
  public static years = '[1-2][0-9][0-9][0-9]|[1-2]|[1-2][0-9]|[1-2][0-9][0-9]';

  public static order: any[] = [];
  // validation of complete date pattern
  public static validationPattern: RegExp;
  // validation of the initial part, dd of yyyy or mm
  public static validationPattern1: RegExp;
  // validation of the second part mm or dd
  public static validationPattern2: RegExp;

  // validation of the last part yyyy or dd
  public static validationPattern3: RegExp;
  // validation of the initial part, dd of yyyy or mm + separator
  public static validationPattern4: RegExp;

  // validation of the initial part, dd of yyyy or mm + separator + second part
  public static validationPattern5: RegExp;

  // validation of the initial part, dd of yyyy or mm + separator + second part + separator
  public static validationPattern6: RegExp;

  public static validationPattern7: RegExp;

  public static frag1 = '';
  public static frag2 = '';
  public static frag3 = '';

  public static buildPatterns(d: number, m: number, y: number, separator: string): void {
    if (y < d && y < m) {
      this.frag1 = DatePatterns.years;
      if (m < d) {
        DatePatterns.frag2 = DatePatterns.months;
        DatePatterns.frag3 = DatePatterns.dates;
      } else {
        DatePatterns.frag2 = DatePatterns.dates;
        DatePatterns.frag3 = DatePatterns.months;
      }
    } else if (d < m && d < y) {
      DatePatterns.frag1 = DatePatterns.dates;
      if (y < m) {
        DatePatterns.frag2 = DatePatterns.years;
        DatePatterns.frag3 = DatePatterns.months;
      } else {
        DatePatterns.frag2 = DatePatterns.months;
        DatePatterns.frag3 = DatePatterns.years;
      }
    } else if (m < d && m < y) {
      this.frag1 = DatePatterns.months;
      if (y < d) {
        DatePatterns.frag2 = DatePatterns.years;
        DatePatterns.frag3 = DatePatterns.dates;
      } else {
        DatePatterns.frag2 = DatePatterns.dates;
        DatePatterns.frag3 = DatePatterns.years;
      }
    }
    DatePatterns.createValidationPattern(this.frag1, this.frag2, this.frag3, separator);
  }

  private static createValidationPattern(
    frag1: string,
    frag2: string,
    frag3: string,
    separator: string
  ): void {
    DatePatterns.validationPattern1 = new RegExp(frag1, 'g');
    DatePatterns.validationPattern2 = new RegExp(frag2, 'g');
    DatePatterns.validationPattern3 = new RegExp(frag3, 'g');

    DatePatterns.validationPattern4 = new RegExp(frag1 + '[0-9]', 'g');
    DatePatterns.validationPattern5 = new RegExp(frag1 + frag2, 'g');
    DatePatterns.validationPattern6 = new RegExp(frag1 + frag2 + '[0-9]', 'g');
    DatePatterns.validationPattern7 = new RegExp(frag1 + frag2 + frag3, 'g');

    DatePatterns.validationPattern = new RegExp(frag1 + separator + frag2 + separator + frag3, 'g');
  }
}

@Injectable({
  providedIn: 'root',
})
export class DateInputAnalyzer {
  public invalid: boolean;

  constructor(@Inject(LOCALE_ID) private locale: string, private datePipe: DatePipe) {
    this.yearFirst = false;
    this.firstSectionLength = 2;

    const localeFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);
    const d = localeFormat.indexOf('dd');
    const m = localeFormat.indexOf('MM');
    const y = localeFormat.indexOf('y');
    if (y > 0) {
      this.separator = localeFormat[y - 1];
    } else if (d > 0) {
      this.separator = localeFormat[d - 1];
    } else if (m > 0) {
      this.separator = localeFormat[m - 1];
    }
    // unfortunately, order matters
    if (y < d && y < m) {
      this.yearFirst = true;
      this.firstSectionLength = 4;
    }
    this.dayBeforeMonth = d < m;

    DatePatterns.buildPatterns(d, m, y, this.separator);
    this.maxLength = 10;
    this.digitsPattern = new RegExp('[0-9' + this.separator + ']+$', 'g');
    this.excludedPattern = new RegExp('[^0-9' + this.separator + ']+', 'g');

    console.log('localeFormat', localeFormat);
    console.log('is year first', this.yearFirst);
    console.log('is day before month', this.dayBeforeMonth);
    console.log('firstSectionLength', this.firstSectionLength);
    console.log('separator', this.separator);
  }

  public separator: string;
  public yearFirst: boolean;
  public dayBeforeMonth: boolean;
  public firstSectionLength: number;
  public cursorPosition: number;

  private excludedPattern: RegExp; // /[^0-9.:-]+/g;
  private digitsPattern: RegExp; // = /^[0-9]+$/g;

  private lastValue = '';
  private currentValue = '';
  private allowedCharsOnly: boolean;
  private maxLength: number;

  public analyse(cursorPosition: number, value: string, lastValue: string): string {
    this.cursorPosition = cursorPosition;
    this.lastValue = lastValue;
    value = value || '';
    value = this.resetAndCapture(value);

    if (this.lastValue !== value && value !== '') {
      value = this.validateValue(value);
      value = this.handleDate(value);
    }
    return value;
  }

  private resetAndCapture(value: string): string {
    this.currentValue = value;
    console.log('/////////////ANALYZE Date////////////////////');
    console.log('value', value);
    console.log('this.lastValue', this.lastValue);
    return value;
  }

  private validateValue(value: string): string {
    this.allowedCharsOnly = this.hasAllowedCharsOnly(value);
    if (!this.allowedCharsOnly) {
      console.log('this.allowedCharsOnly false', this.allowedCharsOnly);
      return this.lastValue;
    }
    if (value.length > this.maxLength) {
      return this.lastValue;
    }
    return value;
  }

  private handleDate(value: string): string {
    value = this.validateAndTransformResult(value);
    if (value === undefined) {
      return this.lastValue;
    }
    return value;
  }

  private replaceSeparator(value: string, separator: string, replaceValue: string): string {
    const r = new RegExp('[' + separator + ']+', 'g');
    while (value.indexOf(separator) > -1) {
      value = value.replace(r, replaceValue);
    }
    return value;
  }

  private hasAllowedCharsOnly(value: string): boolean {
    const m = value.match(this.excludedPattern);
    if (m !== null && m.length > 0) {
      this.adjustCursorPositionAfterFormatting(this.lastValue.length, value.length);
      return false;
    }
    return true;
  }
  private adjustCursorPositionAfterFormatting(
    formattedValLength: number,
    lengthBeforeFormatting: number
  ): void {
    if (lengthBeforeFormatting === formattedValLength + 1) {
      this.cursorPosition = this.cursorPosition - 1;
    }
    if (lengthBeforeFormatting === formattedValLength - 1) {
      this.cursorPosition = this.cursorPosition + 1;
    }
  }

  private testPattern(value: string): string {
    if (DatePatterns.validationPattern1.test(value)) {
      return value;
    }
    if (DatePatterns.validationPattern4.test(value)) {
      return this.addMissingSeparator(value);
    }
    if (DatePatterns.validationPattern5.test(value)) {
      return value;
    }
    if (DatePatterns.validationPattern6.test(value)) {
      return this.addMissingSeparator(value);
    }
    const testValue = value.padEnd(this.maxLength, '0');
    if (DatePatterns.validationPattern.test(testValue)) {
      return value;
    }
    return undefined;
  }

  private validateAndTransformResult(value: string): string {
    if (value.length === 0) {
      return value;
    }
    if (value.length > this.maxLength) {
      return value.substring(0, value.length - 1);
    }
    value = this.replaceSeparator(value, this.separator, '');
    console.log('reduced value', value);

    // check for chars up to:
    // dd
    // mm
    // yyyy
    if (value.length <= this.firstSectionLength) {
      DatePatterns.validationPattern1.lastIndex = 0;
      const result: boolean = DatePatterns.validationPattern1.test(value);
      console.log(
        'rule test 1 for value',
        value,
        result,
        DatePatterns.validationPattern1.test(value)
      );
      if (result) {
        value = this.validateSection1(value);
        return value;
      }
    }

    // ddx -> dd.x
    // mmx -> mm.x
    // yyyyx -> yyyy.x
    if (
      value.length ===
      this.firstSectionLength + 1 /*&& value[value.length - 1] !== this.separator*/
    ) {
      DatePatterns.validationPattern4.lastIndex = 0;
      const result = DatePatterns.validationPattern4.test(value);
      console.log('rule test 2 for value', value, result);
      if (result) {
        value = this.validateSection2(value);
        value = this.addMissingSeparator(value);
        return value;
      }
    }
    // ddmm -> dd.mm
    // mmdd -> mm.dd
    // yyyymm > yyyy.mm
    if (value.length === this.firstSectionLength + 2) {
      DatePatterns.validationPattern5.lastIndex = 0;
      const result = DatePatterns.validationPattern5.test(value);
      console.log('rule test 4 for value result', value, result);
      if (result) {
        value = this.validateSection2(value);
        value = this.addMissingSeparator(value);
        return value;
      }
    }
    // mmddx -> mm.dd.x
    // ddmmx -> dd.mm.x
    // yyyymmx -> yyyy.mm.x
    if (
      value.length ===
      this.firstSectionLength + 3 /*&& value[value.length - 1] !== this.separator*/
    ) {
      DatePatterns.validationPattern6.lastIndex = 0;
      const result = DatePatterns.validationPattern6.test(value);
      console.log('rule test 5 for value', value, result, DatePatterns.validationPattern6);
      if (result) {
        value = this.validateSection3(value);
        value = this.addMissingSeparator(value);
        return value;
      }
    }

    // mmddxx [xx] ->  mm.dd.xx [xx]
    // ddmmxx [xx] ->  dd.mm.xx [xx]
    // yyyymmxx ->  yyyy.mm.xx
    if (value.length >= this.firstSectionLength + 4) {
      const testValue = value.padEnd(this.maxLength - 2, '0');
      DatePatterns.validationPattern.lastIndex = 0;
      const result = DatePatterns.validationPattern.test(testValue);
      console.log('rule test 6 for value testValue result', value, testValue, result);
      if (result) {
        value = this.validateSection3(value);
        value = this.addMissingSeparator(value);
        return value;
      }
    }

    if (value.endsWith(this.separator)) {
      console.log('removing separator', value, this.separator);
      return value.substring(0, value.length - 1);
    }

    console.error('no matching rule found for value', value);
    return undefined;
  }

  private addMissingSeparator(value: string): string {
    // ddx -> dd.x
    // yyyyx -> yyyy.x
    if (value.length > this.firstSectionLength) {
      // && value[value.length - 1] !== this.separator
      value =
        value.substring(0, this.firstSectionLength) +
        this.separator +
        value.substring(this.firstSectionLength);
      // console.log('new value', value);
      this.cursorPosition++;
    }
    // dd.mmx -> dd.mm.x
    // yyyy.mmx -> yyyy.mm.x
    if (value.length >= this.firstSectionLength + 4) {
      //  && value[value.length - 1] !== this.separator
      value =
        value.substring(0, this.firstSectionLength + 3) +
        this.separator +
        value.substring(this.firstSectionLength + 3);
      // console.log('new value', value);
      this.cursorPosition++;
    }
    return value;
  }

  private validateSection1(value: string): string {
    console.log('validating section 1', value);
    if (this.yearFirst) {
      value = this.fixYearSection(value);
    } else {
      if (this.dayBeforeMonth) {
        value = this.fixDaySection(value);
      } else {
        value = this.fixMonthSection(value);
      }
    }
    console.log('validating section 1', value);
    return value;
  }

  private validateSection2(value: string): string {
    console.log('validating section 2', value);
    const subStr1 = value.substring(0, this.firstSectionLength);
    const subStr2 = value.substring(this.firstSectionLength);

    if (this.dayBeforeMonth) {
      // ddmm
      value = subStr1 + this.fixDaySection(subStr2);
    } else {
      // mmdd
      value = subStr1 + this.fixMonthSection(subStr2);
    }
    console.log('validating section 2', value);
    return value;
  }

  private validateSection3(value: string): string {
    console.log('validating section 3', value);
    const subStr1 = value.substring(0, this.firstSectionLength);
    const subStr2 = value.substring(this.firstSectionLength, this.firstSectionLength + 2);
    const subStr3 = value.substring(this.firstSectionLength + 2);
    if (this.yearFirst) {
      // yyyydd|mm
      if (this.dayBeforeMonth) {
        // ddmm
        value = subStr1 + subStr2 + this.fixMonthSection(subStr3);
      } else {
        value = subStr1 + subStr2 + this.fixDaySection(subStr3);
      }
    } else {
      value = subStr1 + subStr2 + this.fixYearSection(subStr3);
    }
    console.log('validating section 3', value);
    return value;
  }

  private fixDaySection(value: string): string {
    const v = value;
    if (value.length === 1) {
      const val = parseInt(value, 10);
      if (val > 3 && val <= 9) {
        value = '0' + value;
        this.cursorPosition++;
      }
    } else if (value.length === 2) {
      const val = parseInt(value, 10);
      if (val > 31) {
        value = '01';
      }
    }
    return value;
  }

  private fixMonthSection(value: string): string {
    const v = value;
    if (value.length === 1) {
      const val = parseInt(value, 10);
      if (val > 3 && val <= 9) {
        value = '0' + val.toString();
        this.cursorPosition += 2;
      }
    } else if (value.length === 2) {
      const val = parseInt(value, 10);
      if (val > 12) {
        value = '01';
      }
    }
    return value;
  }

  private fixYearSection(value: string): string {
    return value;
  }
}
