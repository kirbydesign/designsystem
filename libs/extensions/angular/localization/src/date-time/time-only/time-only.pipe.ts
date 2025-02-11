import { Pipe, PipeTransform } from '@angular/core';

import { AbstractTimezoneCompensatingPipe } from '../abstract-timezone-compensating.pipe';
import { DateFormats } from '../date-formats';

export type TimeOnlyFormat = 'short' | 'medium';

/**
 * Formats a given timestamp as a time.
 *
 * Timestamps can be formatted as 2 variants:
 * - 'short' being 'HH:mm' (hours and minutes)
 * - 'medium' being 'HH:mm:ss' (as above, but with seconds appended)
 *
 */
@Pipe({
  name: 'timeOnly',
  standalone: true,
})
export class TimeOnlyPipe extends AbstractTimezoneCompensatingPipe implements PipeTransform {
  transform(input: number | Date | string, format: TimeOnlyFormat = 'short'): string {
    return this.format(input, this.getFormat(format));
  }

  private getFormat(format: TimeOnlyFormat): string {
    switch (format) {
      case 'short':
        return DateFormats.SHORT_TIME_FORMAT;
      case 'medium':
        return DateFormats.MEDIUM_TIME_FORMAT;
      default:
        throw new Error(`Unable to derive format from "${format}"`);
    }
  }
}
