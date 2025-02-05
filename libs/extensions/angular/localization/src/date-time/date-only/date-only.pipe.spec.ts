import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';

import { LOCALE_ID } from '@angular/core';
import { KIRBY_EXTENSIONS_LOCALIZATION_TOKEN } from '../../di-tokens';
import { DateOnlyPipe } from './date-only.pipe';

describe('DateOnlyPipe', () => {
  let spectator: SpectatorPipe<DateOnlyPipe>;

  const createPipe = createPipeFactory({
    pipe: DateOnlyPipe,
    providers: [
      { provide: LOCALE_ID, useValue: 'da' },
      {
        provide: KIRBY_EXTENSIONS_LOCALIZATION_TOKEN,
        useValue: {
          timeZone: 'Europe/Copenhagen',
        },
      },
    ],
  });

  it('should format a date different from "today" as day, month and year (dd.MM.yyyy)', () => {
    const notToday = new Date('1981-12-24');
    spectator = createPipe('{{date | dateOnly}}', {
      hostProps: {
        date: notToday,
      },
    });
    expect(spectator.element).toHaveExactText('24.12.1981');
  });

  [null, undefined].forEach((absent) => {
    it(`should produce an empty string ("") when an absent (${absent}) input value is passed to pipe`, () => {
      spectator = createPipe('{{date | dateOnly}}', {
        hostProps: {
          date: absent,
        },
      });
      expect(spectator.element).toHaveExactText('');
    });
  });
});
