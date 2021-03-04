import { LOCALE_ID } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import moment from 'moment';
import { MockComponent } from 'ng-mocks';

import { CalendarComponent, IconComponent } from '..';
import { WindowRef } from '../../types/window-ref';

import { CalendarYearNavigatorConfig } from './options/calendar-year-navigator-config';

describe('CalendarComponent', () => {
  let spectator: SpectatorHost<CalendarComponent>;

  const createHost = createHostFactory({
    component: CalendarComponent,
    declarations: [CalendarComponent, MockComponent(IconComponent)],
    providers: [
      {
        provide: LOCALE_ID,
        // i.e. en-US. The week should start on Monday regardlessly
        useValue: 'en',
      },
      {
        provide: WindowRef,
        useValue: window,
      },
    ],
  });

  beforeEach(() => {
    spectator = createHost('<kirby-calendar></kirby-calendar>', {
      props: {
        minDate: new Date(2017, 0, 1),
        maxDate: new Date(2025, 11, 31),
      },
    });
  });

  it('should create components with `minDate` and `maxDate` set', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.component.minDate).toEqual(new Date(2017, 0, 1));
    expect(spectator.component.maxDate).toEqual(new Date(2025, 11, 31));
  });
});
