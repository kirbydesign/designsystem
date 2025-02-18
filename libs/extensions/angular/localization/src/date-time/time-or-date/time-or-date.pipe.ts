import { Pipe, PipeTransform } from '@angular/core';

import { AbstractTimezoneCompensatingPipe } from '../abstract-timezone-compensating.pipe';
import { DateFormats } from '../date-formats';

/**
 * Formats a given timestamp so that:
 * - If timestamp is of "today", it's formatted as time with hours and minutes (eg. 23:56)
 * - If timestamp is different from "today", it's formatted as date with "day of month", month and year  (eg. 28.02.2020)
 *
 * All formatting and parsing is expect to be handled in "Europe/Copenhagen" time zone and with
 * the locale provided by `LOCALE_ID`.
 */

@Pipe({
  name: 'timeOrDate',
  standalone: true,
})
export class TimeOrDatePipe extends AbstractTimezoneCompensatingPipe implements PipeTransform {
  transform(
    time: number | Date | string,
    showSeconds = false,
    formatMonth: 'month-as-digits' | 'month-as-letters' = 'month-as-digits'
  ): string {
    if (!time) {
      return '';
    }

    const date = typeof time === 'number' || typeof time === 'string' ? new Date(time) : time;

    const today = new Date();
    const sameDay =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    let format = DateFormats.SHORT_DATE_FORMAT;

    if (formatMonth === 'month-as-letters') {
      format = DateFormats.MEDIUM_LETTER_DATE_FORMAT;
    }

    if (sameDay) {
      format = showSeconds ? DateFormats.MEDIUM_TIME_FORMAT : DateFormats.SHORT_TIME_FORMAT;
    }

    return this.format(date, format);
  }
}
