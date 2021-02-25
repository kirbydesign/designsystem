import { LOCALE_ID } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import moment from 'moment';
import { MockComponent } from 'ng-mocks';

import { CalendarComponent, IconComponent } from '..';
import { WindowRef } from '../../types/window-ref';
import { CalendarYearNavigatorConfig } from './options/calendar-year-navigator-config';

// NOTE: when specifying multiple input properties, set selectedDate
// as the last one. This makes the component update without the need to
// explicitly call spectator.component.ngOnChanges()

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
    spectator = createHost('<kirby-calendar></kirby-calendar>');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initially render the current month if selectedDate is not specified', () => {
    const currentDayMoment = moment().startOf('day');
    const currentMonthMoment = moment().startOf('month');

    verifyMonthAndYear(currentMonthMoment.format('MMMM YYYY'));
    expect(spectator.query('.day.today')).toHaveText(currentDayMoment.format('D'));
  });

  it('should initially render the month of selectedDate if specified', () => {
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));

    verifyMonthAndYear('August 1997');

    const headerTexts = trimmedTexts('.calendar-table-header th');
    expect(headerTexts).toEqual(['M', 'T', 'W', 'T', 'F', 'S', 'S']);

    const dayTexts = trimmedTexts('.day.current-month');
    expect(dayTexts.slice(0, 5)).toEqual(['1', '2', '3', '4', '5']);
    expect(dayTexts.length).toEqual(31);
  });

  it('should be possible to specify which day is today by passing todayDate', () => {
    spectator.setInput('todayDate', localMidnightDate('1997-08-30'));
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));

    expect(spectator.query('.day.today')).toHaveText('30');
  });

  it('should make it possible to navigate past and future months', () => {
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));

    spectator.click(SEL_NAV_BACK);
    verifyMonthAndYear('July 1997');
    spectator.click(SEL_NAV_FORWARD);
    verifyMonthAndYear('August 1997');
    spectator.click(SEL_NAV_FORWARD);
    verifyMonthAndYear('September 1997');
    spectator.click(SEL_NAV_FORWARD);
    spectator.click(SEL_NAV_FORWARD);
    spectator.click(SEL_NAV_FORWARD);
    spectator.click(SEL_NAV_FORWARD);
    verifyMonthAndYear('January 1998');
  });

  it('should not be possible to navigate to any month preceding minDate, if specified', () => {
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));
    spectator.setInput('minDate', localMidnightDate('1997-06-15'));

    spectator.click(SEL_NAV_BACK);
    spectator.click(SEL_NAV_BACK);
    verifyMonthAndYear('June 1997');
    expect(spectator.query(SEL_NAV_BACK)).toBeDisabled();
    spectator.click(SEL_NAV_BACK);
    verifyMonthAndYear('June 1997');
  });

  it('should not be possible to navigate to any month exceeding maxDate, if specified', () => {
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));
    spectator.setInput('maxDate', localMidnightDate('1997-10-01'));

    spectator.click(SEL_NAV_FORWARD);
    spectator.click(SEL_NAV_FORWARD);
    verifyMonthAndYear('October 1997');
    expect(spectator.query(SEL_NAV_FORWARD)).toBeDisabled();
    spectator.click(SEL_NAV_FORWARD);
    verifyMonthAndYear('October 1997');
  });

  it('should emit a dateChange event when a valid date is clicked', () => {
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));

    const captured = captureDateChangeEvents();

    clickDayOfMonth(14);
    expect(captured.event).toEqual(localMidnightDate('1997-08-14'));
  });

  it('should not emit a dateChange event when selectedDate is changed from the outside', () => {
    const captured = captureDateChangeEvents();

    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));

    expect(captured.event).toBeUndefined();
  });

  it('should not emit a dateChange event if disableWeekends is true and a weekend date is clicked', () => {
    spectator.setInput('disableWeekends', true);
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));

    const captured = captureDateChangeEvents();

    clickDayOfMonth(24); // August 24th is a Sunday
    expect(captured.event).toBeUndefined();
  });

  it('should not emit a dateChange event if disablePastDates is true and a date in the past is clicked', () => {
    spectator.setInput('disablePastDates', true);
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));
    spectator.setInput('todayDate', localMidnightDate('1997-08-29'));

    const captured = captureDateChangeEvents();

    clickDayOfMonth(1); // August 1st is in the past
    expect(captured.event).toBeUndefined();
  });

  it('should not emit a dateChange event if disableFutureDates is true and a date in the future is clicked', () => {
    spectator.setInput('disableFutureDates', true);
    spectator.setInput('todayDate', localMidnightDate('1997-08-29'));
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));

    const captured = captureDateChangeEvents();

    clickDayOfMonth(31); // August 31st is in the future
    expect(captured.event).toBeUndefined();
  });

  it('should not emit a dateChange event if clicking a date that was passed in disabledDates', () => {
    spectator.setInput('disabledDates', ['1997-08-25', '1997-08-26'].map(localMidnightDate));
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));

    const captured = captureDateChangeEvents();

    clickDayOfMonth(26); // August 26st was explicitly disabled
    expect(captured.event).toBeUndefined();
  });

  it('should not emit a dateChange event if clicking the already selected date', () => {
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));

    const captured = captureDateChangeEvents();

    clickDayOfMonth(29);
    expect(captured.event).toBeUndefined();
  });

  it('should always emit a dateChange event when clicking today if alwaysEnableToday is set to true', () => {
    const today = localMidnightDate('1997-08-28');
    spectator.setInput('disabledDates', [today]);
    spectator.setInput('todayDate', today);
    spectator.setInput('alwaysEnableToday', true);
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));

    const captured = captureDateChangeEvents();

    clickDayOfMonth(28); // August 28th is was disabled but we override
    expect(captured.event).toEqual(today);
  });

  it('should emit dateChange event as UTC midnights when timezone is set to UTC', () => {
    spectator.setInput('timezone', 'UTC');
    spectator.setInput('selectedDate', utcMidnightDate('1997-08-29'));

    const captured = captureDateChangeEvents();

    clickDayOfMonth(14);
    expect(captured.event).toEqual(utcMidnightDate('1997-08-14'));
  });

  it('should emit dateSelect event when clicking a date that is not already selected', () => {
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));

    const captured = captureDateSelectEvents();

    clickDayOfMonth(14);
    expect(captured.event).toEqual(localMidnightDate('1997-08-14'));
  });

  it('should emit dateSelect event when clicking the already selected date', () => {
    spectator.setInput('selectedDate', localMidnightDate('1997-08-29'));

    const captured = captureDateSelectEvents();

    clickDayOfMonth(29);
    expect(captured.event).toEqual(localMidnightDate('1997-08-29'));
  });

  it('should emit dateSelect event as UTC midnights when timezone is set to UTC', () => {
    spectator.setInput('timezone', 'UTC');
    spectator.setInput('selectedDate', utcMidnightDate('1997-08-29'));

    const captured = captureDateSelectEvents();

    clickDayOfMonth(14);
    expect(captured.event).toEqual(utcMidnightDate('1997-08-14'));
  });

  it('should be tolerant of date input (selectedDate, todayDate, minDate, maxDate, and disabledDates) as both UTC midnight and local time midnight', () => {
    const localDate = localMidnightDate('1997-08-29');
    const utcDate = utcMidnightDate('1997-08-29');

    spectator.setInput('selectedDate', localDate);
    expect(spectator.component.selectedDate).toEqual(localDate);
    spectator.setInput('selectedDate', utcDate);
    expect(spectator.component.selectedDate).toEqual(localDate);

    spectator.setInput('todayDate', localDate);
    expect(spectator.component.todayDate).toEqual(localDate);
    spectator.setInput('todayDate', utcDate);
    expect(spectator.component.todayDate).toEqual(localDate);

    spectator.setInput('minDate', localDate);
    expect(spectator.component.minDate).toEqual(localDate);
    spectator.setInput('minDate', utcDate);
    expect(spectator.component.minDate).toEqual(localDate);

    spectator.setInput('maxDate', localDate);
    expect(spectator.component.maxDate).toEqual(localDate);
    spectator.setInput('maxDate', utcDate);
    expect(spectator.component.maxDate).toEqual(localDate);

    const localDates = ['1997-08-29', '1997-08-30'].map(localMidnightDate);
    const utcDates = ['1997-08-29', '1997-08-30'].map(utcMidnightDate);

    spectator.setInput('disabledDates', localDates);
    expect(spectator.component.disabledDates).toEqual(localDates);
    spectator.setInput('disabledDates', utcDates);
    expect(spectator.component.disabledDates).toEqual(localDates);
  });

  it('should render days from Monday to Sunday', () => {
    expect(
      spectator
        .queryAll('.calendar-table-header th')
        .map((_) => _.textContent)
        .join(' ')
    ).toEqual('M T W T F S S');
  });

  describe('active month', () => {
    let todayDate: Date;

    beforeEach(() => {
      todayDate = new Date(2021, 0, 1);

      spectator.setInput('todayDate', todayDate);
      spectator.setInput('selectedDate', todayDate);
    });

    describe('when `minDate` is set', () => {
      let minDate: Date;
      const yearsBeforeTodayDate = 4;

      beforeEach(() => {
        minDate = new Date(todayDate.getFullYear() - yearsBeforeTodayDate, 0, 1);
        spectator.setInput('minDate', minDate);
      });

      describe('when `minDate` changes to a later date than `todayDate`', () => {
        let newMinDate: Date;

        beforeEach(() => {
          newMinDate = new Date(
            todayDate.getFullYear() + 1,
            todayDate.getMonth(),
            todayDate.getDay()
          );
          spectator.setInput('minDate', newMinDate);
        });

        it('should set active month based on changed `minDate`', () => {
          expect(spectator.component.activeMonthName).toEqual(moment(newMinDate).format('MMMM'));
        });
      });
    });

    describe('when `maxDate` is set', () => {
      let maxDate: Date;
      const yearsAfterTodayDate = 2;

      beforeEach(() => {
        maxDate = new Date(todayDate.getFullYear() + yearsAfterTodayDate, 0, 1);
        spectator.setInput('maxDate', maxDate);
      });

      describe('when `maxDate` changes to an earlier date then `todayDate`', () => {
        let newMaxDate: Date;

        beforeEach(() => {
          newMaxDate = new Date(
            todayDate.getFullYear() - 1,
            todayDate.getMonth(),
            todayDate.getDay()
          );
          spectator.setInput('maxDate', newMaxDate);
        });

        it('should set active month based on changed `maxDate`', () => {
          expect(spectator.component.activeMonthName).toEqual(moment(newMaxDate).format('MMMM'));
        });
      });
    });
  });

  describe('year navigator', () => {
    describe('by default', () => {
      it('should not render', () => {
        expect(spectator.element.querySelector('kirby-dropdown')).toBeNull();
      });
    });

    describe('when yearNavigatorOptions are set', () => {
      let todayDate: Date;
      let todayDateYear: number;
      let yearNavigatorOptions: CalendarYearNavigatorConfig;

      beforeEach(() => {
        todayDate = new Date(2021, 0, 1);
        todayDateYear = todayDate.getFullYear();
        yearNavigatorOptions = { from: -3, to: 2 };

        spectator.setInput('todayDate', todayDate);
        spectator.setInput('selectedDate', todayDate);
        spectator.setInput('yearNavigatorOptions', yearNavigatorOptions);
      });

      it('should render', () => {
        expect(spectator.element.querySelector('kirby-dropdown')).not.toBeNull();
      });

      it('should change year on navigation', () => {
        const firstNavigatedYearIndex = spectator.component.navigatedYear;
        spectator.setInput('selectedDate', new Date(todayDateYear, 11, 31));

        spectator.component.changeMonth(1);

        expect(spectator.component.activeYear).toEqual('2022');
        expect(spectator.component.navigatedYear).toEqual(firstNavigatedYearIndex + 1);
      });

      it('should get navigable years based on `from` and `to` when `minDate` and `maxDate` are omitted', () => {
        spectator.setInput('minDate', undefined);
        spectator.setInput('maxDate', undefined);

        expect(spectator.component.navigableYears).toEqual([
          '2018',
          '2019',
          '2020',
          '2021',
          '2022',
          '2023',
        ]);
      });

      it('should prioritize `minDate` and `maxDate` over `from` and `to` when getting navigable years', () => {
        spectator.setInput('minDate', new Date(todayDate.getFullYear() - 2, 0, 1));
        spectator.setInput('maxDate', new Date(todayDate.getFullYear() + 3, 11, 31));

        expect(spectator.component.navigableYears).toEqual([
          '2019',
          '2020',
          '2021',
          '2022',
          '2023',
          '2024',
        ]);
      });
    });
  });

  // constants and utility functions

  const SEL_NAV_BACK = '.header button:first-of-type';
  const SEL_NAV_FORWARD = '.header button:last-of-type';

  function localMidnightDate(yyyyMMdd) {
    return moment(yyyyMMdd).toDate();
  }

  function utcMidnightDate(yyyyMMdd) {
    return moment.utc(yyyyMMdd).toDate();
  }

  function clickDayOfMonth(dateOneIndexed: number) {
    spectator.click(spectator.queryAll('.day.current-month')[dateOneIndexed - 1]);
  }

  function trimmedTexts(selector: string) {
    return spectator.queryAll<HTMLElement>(selector).map((_) => _.innerText);
  }

  function verifyMonthAndYear(monthAndYearText: string) {
    expect(
      spectator
        .queryAll('.month-and-year span')
        .map((_) => _.textContent)
        .join(' ')
    ).toEqual(monthAndYearText);
  }

  function captureDateChangeEvents() {
    let captured: { event?: Date } = {};
    spectator.output<Date>('dateChange').subscribe((result) => (captured.event = result));
    return captured;
  }

  function captureDateSelectEvents() {
    const captured: { event?: Date } = {};
    spectator.output<Date>('dateSelect').subscribe((result) => (captured.event = result));
    return captured;
  }
});
