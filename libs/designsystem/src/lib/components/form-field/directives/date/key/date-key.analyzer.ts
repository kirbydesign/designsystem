import { DatePipe, FormatWidth, getLocaleDateFormat, getLocaleId } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { NumericFormatter } from '../../numeric/numeric.formatter';

@Injectable({
  providedIn: 'root',
})
export class DateKeyAnalyzer {
  public separator: string;
  public yearFirst: boolean;
  public yearFirstLength: number;
  public inputValue = '';
  public outputValue: string;

  private digitsPattern = /^[0-9]+$/g;
  private validationPattern: RegExp;
  private validationPattern1: RegExp;
  private validationPattern2: RegExp;
  private validationPattern3: RegExp;

  private frag1 = '';
  private frag2 = '';
  private frag3 = '';

  constructor(@Inject(LOCALE_ID) private locale: string, private datePipe: DatePipe) {
    this.yearFirst = false;
    this.yearFirstLength = 2;
    const dates = '([0-3][1-9]|[1-9])';
    const months = '([0-1][0-2]|[1-9])';
    const years = '[1-2][0-9][0-9][0-9]';

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

    if (y < d && y < m) {
      this.yearFirst = true;
      this.yearFirstLength = 4;
      this.frag1 = years;
      if (m < d) {
        this.frag2 = months;
        this.frag3 = dates;
      } else {
        this.frag2 = dates;
        this.frag3 = months;
      }
    } else if (d < m && d < y) {
      this.frag1 = dates;
      if (y < m) {
        this.frag2 = years;
        this.frag3 = months;
      } else {
        this.frag2 = months;
        this.frag3 = years;
      }
    } else if (m < d && m < y) {
      this.frag1 = months;
      if (y < d) {
        this.frag2 = years;
        this.frag3 = dates;
      } else {
        this.frag2 = dates;
        this.frag3 = years;
      }
    }

    console.log(
      'locale date format compared to parsed',
      localeFormat,
      this.frag1 + this.separator + this.frag2 + this.separator + this.frag3
    );
    this.validationPattern = this.createValidationPattern(this.frag1, this.frag2, this.frag3);
  }

  public willResultBeValid(key: string): boolean {
    if (this.inputValue === undefined || this.inputValue === null) {
      return true;
    }
    const value = this.inputValue.toString().trim();
    console.log('value for validDigits', value);
    if (value === null || value.length === 0) {
      return true;
    }
    if (
      value.length > (this.frag1 + this.separator + this.frag2 + this.separator + this.frag3).length
    ) {
      return true;
    }

    // check for
    // dd
    // mm
    // yyyy
    if (value.length <= this.yearFirstLength) {
      const result: boolean = this.digitsPattern.test(value) && this.validationPattern1.test(value);
      console.log('rule test 1 for value', value, result);
      if (result) {
        this.addMissingGroupingSeparator(value);
      }
      return result;
    }

    // check for
    // dd.
    // mm.
    // yyyy.
    if (value.length === this.yearFirstLength + 1) {
      const result = value[value.length - 1] === this.separator;
      console.log('rule test 2 for value', value, result);
      return result;
    }

    // dd.mm
    // mm.dd
    // yyyy.mm
    if (value.length === this.yearFirstLength + 2 || value.length === this.yearFirstLength + 3) {
      const substr = value.substr(this.yearFirstLength + 1);
      const result = this.digitsPattern.test(substr) && this.validationPattern2.test(substr);
      console.log('rule test 3 for value substr result', value, substr, result);
      this.addMissingGroupingSeparator(value);
      return result;
    }

    if (value.length === this.yearFirstLength + 4) {
      const result = value[value.length - 1] === this.separator;
      console.log('rule test 4 for value', value, result);
      this.addMissingGroupingSeparator(value);
      return result;
    }

    // mm.dd.
    // dd.mm.
    // yyyy.mm.
    if (value.length > this.yearFirstLength + 4 && value.length <= 10) {
      const substr = value.substr(this.yearFirstLength + 4);
      const result = this.digitsPattern.test(substr) && this.validationPattern3.test(substr);
      console.log('rule test 5 for value substr result', value, substr, result);
      return result;
    }

    console.error('no matching rule found for value', value);
    return false;
  }
  //  private completedPattern = /[0-3][0-9].[0-1][0-2].[0-9][0-9][0-9][0-9]/g;
  //  private completedPattern2 = /[0-1][0-2].[0-3][0-9].[0-9][0-9][0-9][0-9]/g;
  //  private completedPattern3 = /([0-3][1-9]|[1-9]).([0-1][0-2]|[1-9]).[1-2][0-9][0-9][0-9]/g;

  private createValidationPattern(frag1: string, frag2: string, frag3: string): RegExp {
    this.validationPattern1 = new RegExp(frag1);
    this.validationPattern2 = new RegExp(frag2);
    this.validationPattern3 = new RegExp(frag2);
    return new RegExp(frag1 + this.separator + frag2 + this.separator + frag3, 'g');
  }

  private addMissingGroupingSeparator(value: string): void {
    if (value.length >= this.yearFirstLength) {
      const indx = value.length;
      if (value[indx - 1].match(this.digitsPattern) && value[indx - 2].match(this.digitsPattern)) {
        this.outputValue = value + this.separator;
      }
    }
  }
}
