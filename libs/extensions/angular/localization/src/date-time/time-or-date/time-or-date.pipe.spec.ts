import { createPipeFactory } from '@ngneat/spectator/jest';
import { format, toZonedTime } from 'date-fns-tz';

import { LOCALE_ID } from '@angular/core';
import { KIRBY_EXTENSIONS_LOCALIZATION_TOKEN } from '../../di-tokens';
import { TimeOrDatePipe } from './time-or-date.pipe';

const timeZone = 'Europe/Copenhagen';

describe('TimeOrDatePipe', () => {
  const createPipe = createPipeFactory({
    pipe: TimeOrDatePipe,
    providers: [
      { provide: LOCALE_ID, useValue: 'da' },
      {
        provide: KIRBY_EXTENSIONS_LOCALIZATION_TOKEN,
        useValue: {
          timeZone,
        },
      },
    ],
  });

  it(`should create`, () => {
    const date = new Date();
    date.setHours(9, 32, 55);
    const spectator = createPipe('{{date | timeOrDate: true}}', {
      hostProps: {
        date,
      },
    });

    expect(spectator.element).toBeTruthy();
  });

  it(`should format a time today as hour and minutes (HH:mm)`, () => {
    const date = new Date();
    date.setHours(9, 32);
    const spectator = createPipe('{{date | timeOrDate}}', {
      hostProps: {
        date,
      },
    });

    const timeZoneTime = toZonedTime(date.toISOString(), timeZone);

    const expected = format(timeZoneTime, 'HH:mm', {
      timeZone,
    });

    expect(spectator.element).toHaveExactText(expected);
  });

  it(`should format a time today as hour, minutes and seconds (HH:mm:ss)`, () => {
    const date = new Date();
    date.setHours(9, 32, 55);
    const spectator = createPipe('{{date | timeOrDate: true}}', {
      hostProps: {
        date,
      },
    });

    const timeZoneTime = toZonedTime(date.toISOString(), timeZone);

    const expected = format(timeZoneTime, 'HH:mm:ss', {
      timeZone,
    });
    expect(spectator.element).toHaveExactText(expected);
  });

  it('should format a date different from "today" as day, month (in digits) and year (dd.MM.yyyy)', () => {
    const date = new Date('1981-12-24');
    const spectator = createPipe('{{date | timeOrDate}}', {
      hostProps: {
        date,
      },
    });
    expect(spectator.element).toHaveExactText('24.12.1981');
  });

  it('should format a date different from "today" as day, month (in letters) and year (dd. MMM yyyy)', () => {
    const date = new Date('1981-01-24');
    const spectator = createPipe('{{date | timeOrDate: false : "month-as-letters"}}', {
      hostProps: {
        date,
      },
    });
    expect(spectator.element).toHaveExactText('24. Jan 1981');
  });

  [null, undefined].forEach((absent) => {
    it(`should produce an empty string ("") when an absent (${absent}) input value is passed to pipe`, () => {
      const spectator = createPipe('{{date | timeOrDate}}', {
        hostProps: {
          date: absent,
        },
      });
      expect(spectator.element).toHaveExactText('');
    });
  });
});
