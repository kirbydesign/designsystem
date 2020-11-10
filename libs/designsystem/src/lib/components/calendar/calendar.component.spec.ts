import * as ionic from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import moment from 'moment';
import { MockComponent } from 'ng-mocks';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

import { YearSelectorComponent } from './year-selector/year-selector.component';
import {
  CalendarComponent,
  CardComponent,
  IconComponent,
  InfiniteScrollDirective,
  ItemComponent,
  ListComponent,
  ListItemColorDirective,
  ListItemTemplateDirective,
  SpinnerComponent,
} from '..';
import { WindowRef } from '../../types/window-ref';

// NOTE: when specifying multiple input properties, set selectedDate
// as the last one. This makes the component update without the need to
// explicitly call spectator.component.ngOnChanges()

describe('CalendarComponent', () => {
  let spectator: SpectatorHost<CalendarComponent>;

  const createHost = createHostFactory({
    component: CalendarComponent,
    declarations: [
      CalendarComponent,
      YearSelectorComponent,
      ListComponent,
      ItemComponent,
      InfiniteScrollDirective,
      ListItemColorDirective,
      SpinnerComponent,
      IconComponent,
      CardComponent,
      ListItemTemplateDirective,
      MockComponent(ionic.IonList),
      MockComponent(ionic.IonListHeader),
      MockComponent(ionic.IonLabel),
      MockComponent(ionic.IonItem),
      MockComponent(ionic.IonIcon),
      MockComponent(ionic.IonItemDivider),
      MockComponent(ionic.IonItemGroup),
      MockComponent(ionic.IonItemSliding),
    ],
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
      { provide: ComponentFixtureAutoDetect, useValue: true },
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

  it('should not display caret for Year Selector when in default mode', async () => {
    await expect(spectator.query('.header-year-selector')).toBeNull();
  });

  it('should display Content Year Selector when set to visible', async () => {
    spectator.setInput('yearSelectorVisible', true);
    spectator.setInput('minDate', localMidnightDate('2020-01-01'));
    spectator.setInput('maxDate', localMidnightDate('2030-01-01'));
    spectator.setInput('selectedDate', localMidnightDate('2021-08-29'));

    spectator.detectChanges();
    spectator.detectComponentChanges();
    await spectator.fixture.whenStable();
    const content = spectator.query('.calendar-content');
    await expect(content).not.toBe(null);
    expect(spectator.component.yearSelectorVisible).toBeTrue();
  });

  it('should set yearSelectorVisible when setting useYearSelector and then Click on Caret', async () => {
    spectator.setInput('useYearSelector', true);
    spectator.setInput('minDate', localMidnightDate('2020-01-01'));
    spectator.setInput('maxDate', localMidnightDate('2030-01-01'));
    spectator.setInput('selectedDate', localMidnightDate('2021-08-29'));
    expect(spectator.component.useYearSelector).toBeTrue();

    // Click
    spectator.click(spectator.query('.select-button'));

    spectator.detectChanges();
    spectator.detectComponentChanges();
    await spectator.fixture.whenStable();

    expect(spectator.component.yearSelectorVisible).toBeTrue();

    const content = spectator.query('.calendar-content');
    await expect(content).not.toBe(null);
  });

  it('should  display header for Year Selector when set to year selections mode, but not year content', async () => {
    spectator.setInput('useYearSelector', true);
    spectator.setInput('minDate', localMidnightDate('2020-01-01'));
    spectator.setInput('maxDate', localMidnightDate('2030-01-01'));
    spectator.setInput('selectedDate', localMidnightDate('2021-08-29'));
    spectator.detectChanges();
    spectator.detectComponentChanges();
    await spectator.fixture.whenStable();
    expect(spectator.component.useYearSelector).toBeTrue();
    let content = spectator.query('.header-year-selector');
    await expect(content).not.toBe(null);
    content = await spectator.query('.calendar-content');
    await expect(content).toBe(null);
  });

  it('should render 11 Years inside List', async () => {
    spectator.setInput('useYearSelector', true);
    spectator.setInput('minDate', localMidnightDate('2020-01-01'));
    spectator.setInput('maxDate', localMidnightDate('2030-01-01'));
    spectator.setInput('selectedDate', localMidnightDate('2021-08-29'));
    expect(spectator.component.useYearSelector).toBeTrue();

    // Click
    spectator.click(spectator.query('.select-button'));

    spectator.detectChanges();
    spectator.detectComponentChanges();
    await spectator.fixture.whenStable();

    await expect(spectator.component.yearSelectorVisible).toBeTrue();

    const content = spectator.query('.calendar-content');
    await expect(content).not.toBe(null);

    const content2 = spectator
      .queryAll('.calendar-content kirby-item')
      .map((_) => _.textContent)
      .join(' ');
    console.log(content2);

    await expect(content2).toEqual(
      ' 2020   2021   2022   2023   2024   2025   2026   2027   2028   2029   2030 '
    );
  });

  it('should render 2 Years inside List', async () => {
    spectator.setInput('useYearSelector', true);
    spectator.setInput('minDate', localMidnightDate('2020-01-01'));
    spectator.setInput('maxDate', localMidnightDate('2021-01-01'));
    spectator.setInput('selectedDate', localMidnightDate('2020-08-29'));
    expect(spectator.component.useYearSelector).toBeTrue();

    // Click
    spectator.click(spectator.query('.select-button'));

    spectator.detectChanges();
    spectator.detectComponentChanges();
    await spectator.fixture.whenStable();

    await expect(spectator.component.yearSelectorVisible).toBeTrue();

    const content = spectator.query('.calendar-content');
    await expect(content).not.toBe(null);

    const content2 = spectator
      .queryAll('.calendar-content kirby-item')
      .map((_) => _.textContent)
      .join(' ');
    console.log(content2);

    await expect(content2).toEqual(' 2020   2021 ');
  });

  it('should render days from Monday to Sunday', () => {
    expect(
      spectator
        .queryAll('.calendar-table-header th')
        .map((_) => _.textContent)
        .join(' ')
    ).toEqual('M T W T F S S');
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

  function clickYearSelector() {
    spectator.click(spectator.queryAll('')[0]);
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
});
