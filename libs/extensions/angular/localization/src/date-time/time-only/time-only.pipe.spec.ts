import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';

import { LOCALE_ID } from '@angular/core';
import { KIRBY_EXTENSIONS_LOCALIZATION_TOKEN } from '../../di-tokens';
import { TimeOnlyPipe } from './time-only.pipe';

describe('TimeOnlyPipe', () => {
  let spectator: SpectatorPipe<TimeOnlyPipe>;

  const createPipe = createPipeFactory({
    pipe: TimeOnlyPipe,
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

  [
    {
      format: `'short'`,
      text: 'short format',
      inputAsDate: new Date('1981-12-24T11:34:56Z'),
      expected: '12:34',
      pattern: 'HH:mm',
    },
    {
      format: `'medium'`,
      text: 'medium format',
      inputAsDate: new Date('1981-12-24T11:34:56Z'),
      expected: '12:34:56',
      pattern: 'HH:mm:ss',
    },
    {
      format: null,
      text: 'default format (unspecified)',
      inputAsDate: new Date('1981-12-24T11:34:56Z'),
      expected: '12:34',
      pattern: 'HH:ss',
    },
  ].forEach((each) => {
    const pipeArguments = each.format ? `:${each.format}` : '';

    describe(each.text, () => {
      it(`should format time as "${each.pattern}"`, () => {
        spectator = createPipe(`{{date | timeOnly${pipeArguments}}}`, {
          hostProps: {
            date: each.inputAsDate,
          },
        });
        expect(spectator.element).toHaveExactText(each.expected);
      });
    });
  });

  [null, undefined].forEach((absent) => {
    it(`should produce an empty string ("") when an absent (${absent}) input value is passed to pipe`, () => {
      spectator = createPipe('{{date | timeOnly}}', {
        hostProps: {
          date: absent,
        },
      });
      expect(spectator.element).toHaveExactText('');
    });
  });
});
