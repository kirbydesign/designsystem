import { Injectable } from '@angular/core';

import { DatePatterns } from './date.patterns';
import { DateLocaleAnalyser } from './date-locale-analyser';

@Injectable({
  providedIn: 'root',
})
export class DateInputAnalyzer {
  public invalid: boolean;

  constructor(private localeConfig: DateLocaleAnalyser) {
    DatePatterns.buildPatterns(this.localeConfig);
    this.maxLength = 10;
    this.digitsPattern = new RegExp('[0-9' + this.localeConfig.separator + ']+$', 'g');
    this.excludedPattern = new RegExp('[^0-9' + this.localeConfig.separator + ']+', 'g');
  }

  public cursorPosition: number;

  private excludedPattern: RegExp;
  private digitsPattern: RegExp;

  private lastValue = '';
  private currentValue = '';
  private allowedCharsOnly: boolean;
  private maxLength: number;

  public analyse(cursorPosition: number, value: string, lastValue: string): string {
    this.cursorPosition = cursorPosition;
    this.lastValue = lastValue;
    value = value || '';
    value = this.resetAndCapture(value);
    if (value !== '') {
      if (value.endsWith(this.localeConfig.separator)) return value;
    }
    if (this.lastValue !== value && value !== '') {
      value = this.validateValue(value);
      value = this.handleDate(value);
    }
    return value;
  }

  private resetAndCapture(value: string): string {
    this.currentValue = value;
    this.allowedCharsOnly = true;
    return value;
  }

  private validateValue(value: string): string {
    this.allowedCharsOnly = this.hasAllowedCharsOnly(value);
    if (!this.allowedCharsOnly) {
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
    value = this.replaceSeparator(value, this.localeConfig.separator, '');

    // check for chars up to:
    // dd
    // mm
    // yyyy
    if (value.length <= this.localeConfig.firstSectionLength) {
      DatePatterns.validationPattern1.lastIndex = 0;
      const result: boolean = DatePatterns.validationPattern1.test(value);
      if (result) {
        value = this.validateSection1(value);
        return value;
      }
    }

    // ddx -> dd.x
    // mmx -> mm.x
    // yyyyx -> yyyy.x
    if (value.length === this.localeConfig.firstSectionLength + 1) {
      DatePatterns.validationPattern4.lastIndex = 0;
      const result = DatePatterns.validationPattern4.test(value);
      if (result) {
        value = this.validateSection2(value);
        value = this.addMissingSeparator(value);
        return value;
      }
    }
    // ddmm -> dd.mm
    // mmdd -> mm.dd
    // yyyymm > yyyy.mm
    if (value.length === this.localeConfig.firstSectionLength + 2) {
      DatePatterns.validationPattern5.lastIndex = 0;
      const result = DatePatterns.validationPattern5.test(value);
      if (result) {
        value = this.validateSection2(value);
        value = this.addMissingSeparator(value);
        return value;
      }
    }
    // mmddx -> mm.dd.x
    // ddmmx -> dd.mm.x
    // yyyymmx -> yyyy.mm.x
    if (value.length === this.localeConfig.firstSectionLength + 3) {
      DatePatterns.validationPattern6.lastIndex = 0;
      const result = DatePatterns.validationPattern6.test(value);
      if (result) {
        value = this.validateSection3(value);
        value = this.addMissingSeparator(value);
        return value;
      }
    }

    // mmddxx [xx] ->  mm.dd.xx [xx]
    // ddmmxx [xx] ->  dd.mm.xx [xx]
    // yyyymmxx ->  yyyy.mm.xx
    if (value.length >= this.localeConfig.firstSectionLength + 4) {
      const testValue = value.padEnd(this.maxLength - 2, '0');
      DatePatterns.validationPattern.lastIndex = 0;
      const result = DatePatterns.validationPattern.test(testValue);
      if (result) {
        value = this.validateSection3(value);
        value = this.addMissingSeparator(value);
        return value;
      }
    }
    if (value.endsWith(this.localeConfig.separator)) {
      return value.substring(0, value.length - 1);
    }
    return undefined;
  }

  private addMissingSeparator(value: string): string {
    // ddx -> dd.x
    // yyyyx -> yyyy.x
    if (value.length > this.localeConfig.firstSectionLength) {
      value =
        value.substring(0, this.localeConfig.firstSectionLength) +
        this.localeConfig.separator +
        value.substring(this.localeConfig.firstSectionLength);
      this.cursorPosition++;
    }
    // dd.mmx -> dd.mm.x
    // yyyy.mmx -> yyyy.mm.x
    if (value.length >= this.localeConfig.firstSectionLength + 4) {
      //  && value[value.length - 1] !== this.separator
      value =
        value.substring(0, this.localeConfig.firstSectionLength + 3) +
        this.localeConfig.separator +
        value.substring(this.localeConfig.firstSectionLength + 3);
      this.cursorPosition++;
    }
    return value;
  }

  private validateSection1(value: string): string {
    if (this.localeConfig.yearFirst) {
      value = this.fixYearSection(value);
    } else {
      if (this.localeConfig.dayBeforeMonth) {
        value = this.fixDaySection(value);
      } else {
        value = this.fixMonthSection(value);
      }
    }
    return value;
  }

  private validateSection2(value: string): string {
    const subStr1 = value.substring(0, this.localeConfig.firstSectionLength);
    const subStr2 = value.substring(this.localeConfig.firstSectionLength);
    if (this.localeConfig.dayBeforeMonth) {
      // ddmm
      value = this.fixMonthSection(subStr1) + this.fixDaySection(subStr2);
    } else {
      // mmdd
      value = this.fixDaySection(subStr1) + this.fixMonthSection(subStr2);
    }
    console.log('validating section 2', value);
    return value;
  }

  private validateSection3(value: string): string {
    const subStr1 = value.substring(0, this.localeConfig.firstSectionLength);
    const subStr2 = value.substring(
      this.localeConfig.firstSectionLength,
      this.localeConfig.firstSectionLength + 2
    );
    const subStr3 = value.substring(this.localeConfig.firstSectionLength + 2);
    if (this.localeConfig.yearFirst) {
      // yyyydd|mm
      if (this.localeConfig.dayBeforeMonth) {
        // ddmm
        value =
          this.fixYearSection(subStr1) +
          this.fixDaySection(subStr2) +
          this.fixMonthSection(subStr3);
      } else {
        value =
          this.fixYearSection(subStr1) +
          this.fixMonthSection(subStr2) +
          this.fixDaySection(subStr3);
      }
    } else {
      if (this.localeConfig.dayBeforeMonth) {
        // ddmm
        value =
          this.fixDaySection(subStr1) +
          this.fixMonthSection(subStr2) +
          this.fixYearSection(subStr3);
      } else {
        value =
          this.fixMonthSection(subStr1) +
          this.fixDaySection(subStr2) +
          this.fixYearSection(subStr3);
      }
    }
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
      if (val > 31 || val === 0) {
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
      if (val > 12 || val === 0) {
        value = '01';
      }
    }
    return value;
  }

  private fixYearSection(value: string): string {
    return value;
  }
}
