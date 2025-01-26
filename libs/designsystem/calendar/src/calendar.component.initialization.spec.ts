import { LOCALE_ID } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let spectator: SpectatorHost<CalendarComponent>;

  const createHost = createHostFactory({
    component: CalendarComponent,
    providers: [
      {
        provide: LOCALE_ID,
        // i.e. en-US. The week should start on Monday regardlessly
        useValue: 'en',
      },
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
    ],
    imports: [CalendarComponent],
  });

  type calendarProps = keyof CalendarComponent;
  const testScenarios: { property: calendarProps; value: any }[] = [
    { property: 'alwaysEnableToday', value: true },
    { property: 'disableWeekends', value: true },
    { property: 'disablePastDates', value: true },
    { property: 'disableFutureDates', value: true },
    {
      property: 'disabledDates',
      value: [new Date(2005, 6, 3), new Date(2007, 9, 29), new Date(2012, 0, 17)],
    },
    { property: 'minDate', value: new Date(2017, 0, 1) },
    { property: 'maxDate', value: new Date(2025, 11, 31) },
    { property: 'todayDate', value: new Date(2021, 3, 10) },
    { property: 'timezone', value: 'UTC' },
  ];

  testScenarios.forEach((scenario) => {
    describe(`when configured with ${scenario.property}`, () => {
      describe('through input properties', () => {
        beforeEach(() => {
          spectator = createHost(
            `<kirby-calendar [${scenario.property}]="${scenario.property}"></kirby-calendar>`,
            {
              hostProps: {
                [scenario.property]: scenario.value,
              },
            }
          );
        });

        it(`should create component with '${scenario.property}' set`, () => {
          expect(spectator.component).toBeTruthy();
          expect(spectator.component[scenario.property]).toEqual(scenario.value);
        });
      });

      describe('through template property binding', () => {
        beforeEach(() => {
          spectator = createHost(
            `<kirby-calendar [${scenario.property}]="${scenario.property}"></kirby-calendar>`,
            {
              hostProps: {
                [scenario.property]: scenario.value,
              },
            }
          );
        });

        it(`should create component with '${scenario.property}' set`, () => {
          expect(spectator.component).toBeTruthy();
          expect(spectator.component[scenario.property]).toEqual(scenario.value);
        });
      });
    });
  });
});
