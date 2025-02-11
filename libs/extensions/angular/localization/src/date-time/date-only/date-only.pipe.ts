import { Pipe, PipeTransform } from '@angular/core';

import { AbstractTimezoneCompensatingPipe } from '../abstract-timezone-compensating.pipe';
import { DateFormats } from '../date-formats';

/**
 * Formats a given timestamp as a date.
 */
@Pipe({
  name: 'dateOnly',
  standalone: true,
})
export class DateOnlyPipe extends AbstractTimezoneCompensatingPipe implements PipeTransform {
  transform(input: number | Date | string): string {
    return this.format(input, DateFormats.SHORT_DATE_FORMAT);
  }
}
