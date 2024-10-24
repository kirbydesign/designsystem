import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  add,
  eachDayOfInterval,
  endOfWeek,
  format,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWeekend,
  Locale as LocaleDateFns,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { da, enGB, enUS } from 'date-fns/locale';

import { capitalizeFirstLetter } from '@kirbydesign/core';

import { CommonModule } from '@angular/common';
import { IconModule } from '@kirbydesign/designsystem/icon';

import { DropdownModule } from '@kirbydesign/designsystem/dropdown';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CalendarCell } from './helpers/calendar-cell.model';

import { CalendarYearNavigatorConfig } from './options/calendar-year-navigator-config';

export type Locale = LocaleDateFns;
interface CalendarDay {
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isPast: boolean;
  isFuture: boolean;
  isDisabled: boolean;
}

enum TimeUnit {
  years = 'years',
  months = 'months',
  weeks = 'weeks',
  days = 'days',
  hours = 'hours',
  minutes = 'minutes',
  seconds = 'seconds',
  milliseconds = 'milliseconds',
}

@Component({
  standalone: true,
  imports: [DropdownModule, ButtonComponent, IconModule, CommonModule],
  selector: 'kirby-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnChanges {
  @Output() dateChange = new EventEmitter<Date>();
  @Output() dateSelect = new EventEmitter<Date>();
  @Output() yearSelect = new EventEmitter<number>();
  @Output() previousMonthClicked = new EventEmitter<Date>();
  @Output() nextMonthClicked = new EventEmitter<Date>();
  @Input() timezone: 'local' | 'UTC' = 'local';
  @Input() disableWeekends = false;
  @Input() disablePastDates = false;
  @Input() disableFutureDates = false;
  @Input() alwaysEnableToday = false;

  @Input() set locales(locales: { [key: string]: Locale }) {
    console.warn(
      `Supplying additional locales to the Kirby Calendar Component via an input property is deprecated and should not be used. 
        A future update will allow injecting additional locales via a provider instead.`
    );
  }
  @Input() customLocales: { [key: string]: Locale } = {};
  /* 
    Experimental: Input property not documented on purpose. 
    For context see: https://github.com/kirbydesign/designsystem/issues/2087
  */
  @Input() usePopover = false;
  /**
   * Configuration for the year navigator.
   *
   * Internally, calendar component:
   * - bases yearNavigatorOptions.from and yearNavigatorOptions.to on todayDate if a number is provided
   * - prioritizes minDate and maxDate over yearNavigatorOptions.from and yearNavigatorOptions.to
   */
  @Input() yearNavigatorOptions: CalendarYearNavigatorConfig;

  _month: CalendarCell[][];
  _weekDays: string[];
  private selectedDay: CalendarCell;
  private focussedDay: CalendarCell;
  // NOTE: Internally, all Dates
  // are normalized to point to local timezone midnight, regardless of the timezone
  // setting.
  private activeMonth: Date;
  private _selectedDate: Date;
  private _focussedDate: Date;
  private _disabledDates: Date[] = [];
  private _enabledDates: Date[] = [];
  private _todayDate: Date;
  private _minDate: Date;
  private _maxDate: Date;
  private locale: Locale;
  private timeZoneName: string;
  private includedLocales = { da, enGB, enUS };

  get selectedDate(): Date {
    return this._selectedDate;
  }

  @Input() set selectedDate(valueLocalOrUTC: Date | null) {
    const value = this.normalizeDate(valueLocalOrUTC);

    if (valueLocalOrUTC) {
      this.setActiveMonth(value);
    }

    if (this.hasDateChanged(value, this._selectedDate)) {
      this.onSelectedDateChange(value);
      this._selectedDate = value;
    }
  }

  get disabledDates(): Date[] {
    return this._disabledDates;
  }

  @Input() set disabledDates(value: Date[]) {
    this._disabledDates = (value || []).map((date) => this.normalizeDate(date));
  }

  get enabledDates(): Date[] {
    return this._enabledDates;
  }

  @Input() set enabledDates(value: Date[]) {
    this._enabledDates = (value || []).map((date) => this.normalizeDate(date));
  }

  get todayDate(): Date {
    return this._todayDate;
  }

  @Input() set todayDate(value: Date) {
    this._todayDate = this.normalizeDate(value);
  }

  get minDate(): Date {
    return this._minDate;
  }

  @Input() set minDate(value: Date) {
    if (value && this.activeMonth && isBefore(this.activeMonth, value)) {
      this.setActiveMonth(value);
    }
    this._minDate = this.normalizeDate(value);
  }

  get maxDate(): Date {
    return this._maxDate;
  }

  @Input() set maxDate(value: Date) {
    if (value && this.activeMonth && isAfter(this.activeMonth, value)) {
      this.setActiveMonth(value);
    }
    this._maxDate = this.normalizeDate(value);
  }

  get activeMonthName(): string {
    return capitalizeFirstLetter(this.formatWithLocale(this.activeMonth, 'MMMM'));
  }

  get activeYear(): string {
    return this.formatWithLocale(this.activeMonth, 'yyyy');
  }

  /**
   * Gets navigable years for year navigator based on yearNavigatorOptions.
   */
  get navigableYears(): string[] {
    const dateOfFirstNavigableYear =
      this.minDate || this.getDateFromNavigableYear(this.yearNavigatorOptions.from);

    const dateOfLastNavigableYear =
      this.maxDate || this.getDateFromNavigableYear(this.yearNavigatorOptions.to);

    return this.getYearsBetweenDates(dateOfFirstNavigableYear, dateOfLastNavigableYear);
  }

  get navigatedYear(): number {
    return this.navigableYears.indexOf(this.activeYear);
  }

  @HostBinding('class.has-year-navigator')
  get _hasYearNavigator() {
    return !!this.yearNavigatorOptions;
  }

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private elementRef: ElementRef
  ) {
    this.locale = this.mapLocale(locale);
    this.timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  private formatWithLocale(date: Date, formatString: string): string {
    return format(date, formatString, {
      locale: this.locale,
    });
  }

  private mapLocale(locale: string): Locale {
    if (locale === 'en') {
      locale = 'enGB'; // if english locale is provided without region, we default to GB
    }
    locale = locale.replace('-', '');
    const availableLocales = { ...this.includedLocales, ...this.locales, ...this.customLocales };
    return availableLocales[locale] || this.includedLocales.enGB; // Default to enGB if injected locale doesnt exist
  }

  ngOnInit() {
    this._weekDays = this.getWeekDays();
    this.setActiveMonth(this.selectedDate);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeMonth) return;
    if (
      changes.disableWeekends ||
      changes.disablePastDates ||
      changes.disableFutureDates ||
      changes.disabledDates ||
      changes.enabledDates ||
      changes.minDate ||
      changes.maxDate ||
      changes.todayDate ||
      changes.timezone
    ) {
      this.refreshActiveMonth();
    }
  }

  private setActiveMonth(date: Date = new Date()) {
    if (!this.activeMonth || !isSameMonth(this.activeMonth, date)) {
      this.activeMonth = startOfMonth(date);
      this.refreshActiveMonth();
    }
  }

  // For leniency, the component will accept any Date that points to either UTC midnight
  // or to local timezone midnight although we will internally normalize the representation
  // of all received dates to point to local timezone midnight.
  // We currently log no warnings if the date doesn't match the timezone setting or
  // if it doesn't point to midnight.
  private normalizeDate(dateLocalOrUTC: Date) {
    if (!dateLocalOrUTC) return;

    if (startOfDay(dateLocalOrUTC).getTime() === dateLocalOrUTC.getTime()) {
      // date is local timezone midnight
      return dateLocalOrUTC;
    }
    if (
      startOfDay(utcToZonedTime(dateLocalOrUTC, this.timeZoneName)).getTime() ===
      utcToZonedTime(dateLocalOrUTC, this.timeZoneName).getTime()
    ) {
      // the date is a UTC midnight; create the equivalent local timezone midnight date
      const normalizedUTCdate = utcToZonedTime(dateLocalOrUTC, this.timeZoneName);
      return normalizedUTCdate;
    }
    // does not point to midnight so we make it
    return startOfDay(dateLocalOrUTC);
  }

  private getWeekDays(): string[] {
    const now = new Date();
    const week = eachDayOfInterval({
      start: startOfWeek(now, { locale: this.locale }),
      end: endOfWeek(now, { locale: this.locale }),
    });

    return week.map((date) => this.getFirstLetterOfWeekDayCapitalized(date));
  }

  private getFirstLetterOfWeekDayCapitalized(date: Date) {
    return this.formatWithLocale(date, 'EEEEE');
  }

  private hasDateChanged(newDate: Date, previousDate: Date): boolean {
    if (!newDate && !previousDate) {
      return false;
    }
    if (newDate instanceof Date && !previousDate) {
      return true;
    }
    return !isSameDay(newDate, previousDate);
  }

  private isDisabledDate(date: Date): boolean {
    return this.disabledDates.some((disabledDate) => isSameDay(disabledDate, date));
  }

  private isEnabledDate(date: Date): boolean {
    return (
      this._enabledDates.length === 0 ||
      this.enabledDates.some((enabledDate) => isSameDay(enabledDate, date))
    );
  }

  refreshActiveMonth() {
    if (!this.activeMonth) return;

    const monthStart = startOfMonth(this.activeMonth);
    const startOfFirstWeek = startOfWeek(monthStart, { locale: this.locale });
    const today = this.todayDate ? startOfDay(this.todayDate) : startOfDay(new Date());

    const totalNumberOfDays = 42; // Always show 42 days (6 weeks) in calendar
    const daysArray = Array.from(Array(totalNumberOfDays).keys());

    if (!this._focussedDate) {
      this._focussedDate = today;
    }

    const days: CalendarCell[] = daysArray.map((number) => {
      const cellDate = add(startOfFirstWeek, { [TimeUnit.days]: number });
      const day = this.getCalendarDay(cellDate, today, monthStart);

      const isSelectable = this.isSelectable(day, cellDate);
      const isSelected = isSameDay(this.selectedDate, cellDate);
      const isFocussed = isSameDay(this._focussedDate, cellDate);
      const cell: CalendarCell = {
        date: cellDate.getDate(),
        monthIndex: cellDate.getMonth(),
        year: cellDate.getFullYear(),
        isCurrentMonth: day.isCurrentMonth,
        isSelectable,
        isFocussed,
        isSelected,
        cssClasses: this.getCssClasses(day, isSelectable, isSelected, isFocussed),
      };
      if (isSelected) {
        this.selectedDay = cell;
      }
      if (isFocussed) {
        this.focussedDay = cell;
      }
      return cell;
    });
    this._month = this.chunk(days, 7);
  }

  private getCalendarDay(date: Date, today: Date, monthStart: Date): CalendarDay {
    return {
      isToday: isSameDay(today, date),
      isPast: isBefore(date, today),
      isFuture: isAfter(date, today),
      isWeekend: isWeekend(date),
      isCurrentMonth: isSameMonth(date, monthStart),
      isDisabled: this.isDisabledDate(date) || !this.isEnabledDate(date),
    };
  }

  private isSelectable(day: CalendarDay, date: Date) {
    return (
      (this.alwaysEnableToday && day.isToday) ||
      (!day.isDisabled &&
        !(this.disableWeekends && day.isWeekend) &&
        !(this.disablePastDates && day.isPast) &&
        !(this.disableFutureDates && day.isFuture) &&
        !(this.minDate && isBefore(date, this.minDate)) &&
        !(this.maxDate && isAfter(date, this.maxDate)))
    );
  }

  private getCssClasses(
    day: CalendarDay,
    isSelectable: boolean,
    isSelected: boolean,
    isFocussed: boolean
  ) {
    const cssClasses = {
      'current-month': day.isCurrentMonth,
      weekend: day.isWeekend,
      today: day.isToday,
      selectable: isSelectable,
      selected: isSelected,
      past: day.isPast,
      disabled: day.isDisabled,
      focussed: isFocussed,
    };
    let cssClassString = 'day';
    for (const key in cssClasses) {
      if (cssClasses[key]) {
        cssClassString += ' ' + key;
      }
    }
    return cssClassString;
  }

  private chunk(array: any[], size: number) {
    const results = [];
    while (array.length) {
      results.push(array.splice(0, size));
    }
    return results;
  }

  private onSelectedDateChange(newDate: Date): void {
    if (this.selectedDay) {
      this.selectedDay.isSelected = false;
    }

    const newDay = this.getCell(newDate);
    if (newDay) {
      newDay.isSelected = true;
      this.selectedDay = newDay;
    }
  }

  _onDateSelected(newDay: CalendarCell) {
    if (!newDay.isSelectable) return;

    let newDate = new Date(newDay.year, newDay.monthIndex, newDay.date);

    if (this.timezone === 'UTC') {
      newDate = zonedTimeToUtc(this.subtractTimezoneOffset(newDate), this.timeZoneName);
    }

    const dateToEmit = newDate;

    if (this.hasDateChanged(newDate, this._selectedDate)) {
      this.setActiveMonth(newDate);
      this.onSelectedDateChange(newDate);
      this._selectedDate = newDate;
      this._focussedDate = newDate;
      this.dateChange.emit(dateToEmit);
    }
    this.dateSelect.emit(dateToEmit);
  }

  private onFocussedDateChange(newDate: Date): void {
    if (this.focussedDay) {
      this.focussedDay.isFocussed = false;
    }

    const newDay = this.getCell(newDate);
    if (newDay) {
      newDay.isFocussed = true;
      this.focussedDay = newDay;
    }
  }

  _onDateFocussed(newDay: CalendarCell) {
    if (!newDay.isSelectable) return;

    let newDate = new Date(newDay.year, newDay.monthIndex, newDay.date);

    if (this.timezone === 'UTC') {
      newDate = zonedTimeToUtc(this.subtractTimezoneOffset(newDate), this.timeZoneName);
    }

    if (this.hasDateChanged(newDate, this._focussedDate)) {
      this.setActiveMonth(newDate);
      this.onFocussedDateChange(newDate);
      this._focussedDate = newDate;

      setTimeout(() => {
        this.elementRef.nativeElement.querySelector('.focussed').focus();
      }, 0);
    }
  }

  _changeMonth(index: number) {
    this.changeActiveView(index, TimeUnit.months);
    index > 0
      ? this.nextMonthClicked.emit(this.activeMonth)
      : this.previousMonthClicked.emit(this.activeMonth);
  }

  _changeYear(year: string) {
    const yearNumeric = Number(year);
    this.changeActiveView(yearNumeric - getYear(this.activeMonth), TimeUnit.years);
    this.yearSelect.emit(yearNumeric);
  }

  private changeActiveView(index: number, unit: TimeUnit) {
    if (index === 0) return;
    this.activeMonth = add(this.activeMonth, { [unit]: index });

    this.refreshActiveMonth();
  }

  get _canNavigateBack(): boolean {
    const reachedPastDatesLimit =
      this.disablePastDates && isSameMonth(this.activeMonth, this.todayDate);

    const reachedOrExceededMinDate =
      this.minDate &&
      (isSameMonth(this.activeMonth, this.minDate) || isBefore(this.activeMonth, this.minDate));

    return !reachedPastDatesLimit && !reachedOrExceededMinDate;
  }

  get _canNavigateForward(): boolean {
    const reachedFutureDatesLimit =
      this.disableFutureDates && isSameMonth(this.activeMonth, this.todayDate);

    const reachedOrExceededMaxDate =
      this.maxDate &&
      (isSameMonth(this.activeMonth, this.maxDate) || isAfter(this.activeMonth, this.maxDate));

    return !reachedFutureDatesLimit && !reachedOrExceededMaxDate;
  }

  private getCell(date: Date) {
    let foundDay: CalendarCell = null;
    if (date) {
      for (const week of this._month) {
        foundDay = week.find((day) => {
          return day.isCurrentMonth && day.date === date.getDate();
        });
        if (foundDay) {
          break;
        }
      }
    }
    return foundDay;
  }

  private subtractTimezoneOffset(date: Date): Date {
    const timezoneOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
    return new Date(date.getTime() - timezoneOffsetInMs);
  }

  private getDateFromNavigableYear(navigableYear: number | Date): Date {
    if (navigableYear instanceof Date) return navigableYear;
    const today = this.todayDate || new Date();
    return new Date(today.getFullYear() + navigableYear, 0, 1);
  }

  private getYearsBetweenDates(startDate: Date, endDate: Date): string[] {
    // Ensure years are ordered correctly if parameters are switched:
    const [startYear, endYear] = [startDate.getFullYear(), endDate.getFullYear()].sort();
    const numberOfYears = endYear - startYear;
    return Array.from({ length: numberOfYears + 1 }, (_, i) => (startYear + i).toString());
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const { key, shiftKey } = event;
    let newDate: Date;

    switch (key) {
      case 'ArrowUp':
        newDate = add(this._focussedDate, { days: -7 });
        break;
      case 'ArrowDown':
        newDate = add(this._focussedDate, { days: 7 });
        break;
      case 'ArrowRight':
        newDate = add(this._focussedDate, { days: 1 });
        break;
      case 'ArrowLeft':
        newDate = add(this._focussedDate, { days: -1 });
        break;
      case 'Home':
        newDate = startOfWeek(this._focussedDate, { locale: this.locale });
        break;
      case 'End':
        newDate = endOfWeek(this._focussedDate, { locale: this.locale });
        break;
      case 'PageUp':
        newDate = shiftKey
          ? add(this._focussedDate, { years: -1 })
          : add(this._focussedDate, { months: -1 });
        break;
      case 'PageDown':
        newDate = shiftKey
          ? add(this._focussedDate, { years: 1 })
          : add(this._focussedDate, { months: 1 });
        break;
      default:
        return;
    }

    event.preventDefault();
    this._onDateFocussed({
      date: newDate.getDate(),
      monthIndex: newDate.getMonth(),
      year: newDate.getFullYear(),
      isCurrentMonth: isSameMonth(newDate, this.activeMonth),
      isSelectable: true,
      isSelected: true,
      isFocussed: true,
      cssClasses: '',
    });
  }
}
