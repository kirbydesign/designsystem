import { inject, LOCALE_ID, PipeTransform } from '@angular/core';
import { KIRBY_EXTENSIONS_LOCALIZATION_TOKEN } from '../di-tokens';
import { DateFormats } from './date-formats';

/**
 * Abstract implementation of pipe that should format dates, and compensate for time-zone offset.
 *
 * This class provides tools for formatting dates (and timestamps) in a time zone
 */
export abstract class AbstractTimezoneCompensatingPipe implements PipeTransform {
  private config = inject(KIRBY_EXTENSIONS_LOCALIZATION_TOKEN);
  private locale = inject(LOCALE_ID);

  abstract transform(value: unknown, ...args: unknown[]): unknown;

  protected format(time: number | Date | string, formatPattern: string): string {
    if (!time) {
      return '';
    }

    const date = typeof time === 'number' || typeof time === 'string' ? new Date(time) : time;

    const timeZone = this.config.timeZone;
    const options = this.getIntlOptions(formatPattern);

    const formatter = new Intl.DateTimeFormat(this.locale, { ...options, timeZone });
    let formattedDate = formatter.format(date);

    // Capitalize month abbreviation and remove trailing period for `MEDIUM_LETTER_DATE_FORMAT`
    if (formatPattern === DateFormats.MEDIUM_LETTER_DATE_FORMAT) {
      formattedDate = formattedDate.replace(
        /(\d{2}\.\s)(\w+)\.(\s\d{4})/,
        (_, day, month, year) => {
          return `${day}${month.charAt(0).toUpperCase()}${month.slice(1)}${year}`;
        }
      );
    }

    if (
      formatPattern === DateFormats.SHORT_TIME_FORMAT ||
      formatPattern === DateFormats.MEDIUM_TIME_FORMAT
    ) {
      formattedDate = formattedDate.replace(/\./g, ':');
    }

    return formattedDate;
  }

  private getIntlOptions(formatPattern: string): Intl.DateTimeFormatOptions {
    switch (formatPattern) {
      case DateFormats.SHORT_DATE_FORMAT:
        return { year: 'numeric', month: '2-digit', day: '2-digit' };

      case DateFormats.MEDIUM_DATE_FORMAT:
        return { year: 'numeric', month: 'long', day: 'numeric' };

      case DateFormats.MEDIUM_LETTER_DATE_FORMAT:
        return {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        };

      case DateFormats.SHORT_TIME_FORMAT:
        return { hour: '2-digit', minute: '2-digit', hour12: false };

      case DateFormats.MEDIUM_TIME_FORMAT:
        return { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

      case DateFormats.SHORT_DATE_MEDIUM_TIME_FORMAT:
        return {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };

      default:
        throw new Error(`Unsupported format pattern: ${formatPattern}`);
    }
  }
}
