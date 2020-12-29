import { DateLocaleAnalyser } from './date-locale-analyser';

export class DatePatterns {
  public static dates = '([0-3][1-9]|[1-9])';
  public static months = '([0-1][0-2]|[1-9])';
  public static years = '[1-2][0-9][0-9][0-9]|[1-2]|[1-2][0-9]|[1-2][0-9][0-9]';

  public static order: any[] = [];
  // validation of complete date pattern
  public static validationPattern: RegExp = null;
  // validation of the initial part, dd of yyyy or mm
  public static validationPattern1: RegExp = null;
  // validation of the second part mm or dd
  public static validationPattern2: RegExp = null;

  // validation of the last part yyyy or dd
  public static validationPattern3: RegExp = null;
  // validation of the initial part, dd of yyyy or mm + separator
  public static validationPattern4: RegExp = null;

  // validation of the initial part, dd of yyyy or mm + separator + second part
  public static validationPattern5: RegExp = null;

  // validation of the initial part, dd of yyyy or mm + separator + second part + separator
  public static validationPattern6: RegExp = null;

  public static validationPattern7: RegExp = null;

  public static frag1 = '';
  public static frag2 = '';
  public static frag3 = '';

  public static buildPatterns(localeConfig: DateLocaleAnalyser): void {
    const d: number = localeConfig.dayIndex;
    const m: number = localeConfig.monthIndex;
    const y: number = localeConfig.yearIndex;
    const separator: string = localeConfig.separator;

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
