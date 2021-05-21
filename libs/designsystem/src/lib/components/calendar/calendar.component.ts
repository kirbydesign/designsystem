import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
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
  addDays,
  addHours,
  addMonths,
  addYears,
  differenceInDays,
  eachDayOfInterval,
  endOfISOWeek,
  endOfMonth,
  endOfWeek,
  format,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWeekend,
  startOfDay,
  startOfISOWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { da, de, enGB, enUS, nb, sv } from 'date-fns/locale';

import { capitalizeFirstLetter } from '../../helpers/string-helper';

import { CalendarCell } from './helpers/calendar-cell.model';
import { CalendarOptions } from './helpers/calendar-options.model';
import { CalendarHelper } from './helpers/calendar.helper';
import { CalendarYearNavigatorConfig } from './options/calendar-year-navigator-config';

const locales = { da, de, enGB, enUS, sv, nb };

interface CalendarDay {
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isPast: boolean;
  isFuture: boolean;
  isDisabled: boolean;
}

enum TimeUnit {
  year,
  month,
  week,
  day,
  hour,
  minute,
  second,
  millisecond,
}

@Component({
  selector: 'kirby-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [CalendarHelper],
})
export class CalendarComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('calendarContainer', { static: false }) calendarContainer: ElementRef;
  @Output() dateChange = new EventEmitter<Date>();
  @Output() dateSelect = new EventEmitter<Date>();
  @Input() timezone: 'local' | 'UTC' = 'local';
  @Input() disableWeekends = false;
  @Input() disablePastDates = false;
  @Input() disableFutureDates = false;
  @Input() alwaysEnableToday = false;
  /**
   * Configuration for the year navigator.
   *
   * Internally, calendar component:
   * - bases yearNavigatorOptions.from and yearNavigatorOptions.to on todayDate if a number is provided
   * - prioritizes minDate and maxDate over yearNavigatorOptions.from and yearNavigatorOptions.to
   */
  @Input() yearNavigatorOptions: CalendarYearNavigatorConfig;
  public month: CalendarCell[][];
  public weekDays: string[];
  private selectedDay: CalendarCell;
  // NOTE: Internally, all objects wrapping timestamps (i.e. Date and moment.Moment)
  // are normalized to point to local timezone midnight, regardless of the timezone
  // setting.
  private activeMonth: Date;
  private _selectedDate: Date;
  private _disabledDates: Date[];
  private _todayDate: Date;
  private _minDate: Date;
  private _maxDate: Date;

  get selectedDate(): Date {
    return this._selectedDate;
  }

  @Input() set selectedDate(valueLocalOrUTC: Date) {
    console.log('selected', valueLocalOrUTC);

    const value = this.normalizeDate(valueLocalOrUTC);
    console.log('value', value);
    this.setActiveMonth(value);
    if (this.hasDateChanged(value, this._selectedDate)) {
      this.onSelectedDateChange(value);
      this._selectedDate = value;
    }
  }

  get disabledDates(): Date[] {
    return this._disabledDates || [];
  }

  @Input() set disabledDates(value: Date[]) {
    this._disabledDates = this.normalizeDates(value);
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

  @Input() set minDate(minDate: Date) {
    if (minDate && this.activeMonth && isBefore(this.activeMonth, minDate)) {
      this.setActiveMonth(minDate);
    }
    this._minDate = this.normalizeDate(minDate);
  }

  get maxDate(): Date {
    return this._maxDate;
  }

  @Input() set maxDate(maxDate: Date) {
    if (maxDate && this.activeMonth && isAfter(this.activeMonth, maxDate)) {
      this.setActiveMonth(maxDate);
    }
    this._maxDate = this.normalizeDate(maxDate);
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

  constructor(private calendarHelper: CalendarHelper, @Inject(LOCALE_ID) private locale: string) {}

  private formatWithLocale(date: Date, formatStr = 'PP'): string {
    return format(date, formatStr, {
      // TODO: Make sure locale format fits date-fns keys
      locale: locales[this.locale],
    });
  }

  ngOnInit() {
    console.log('init', this.selectedDate);

    this.weekDays = this.getWeekDays();
    this.setActiveMonth(this.selectedDate);
  }

  ngAfterViewInit() {
    this.calendarHelper.init(
      this.calendarContainer,
      this.getHelperOptions(),
      this.onDateSelected.bind(this),
      this.onChangeMonth.bind(this)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeMonth) return;
    if (
      changes.disableWeekends ||
      changes.disablePastDates ||
      changes.disableFutureDates ||
      changes.disabledDates ||
      changes.minDate ||
      changes.maxDate ||
      changes.todayDate ||
      changes.timezone
    ) {
      this.refreshActiveMonth();
      this.calendarHelper.update(this.getHelperOptions());
    }
  }

  private setActiveMonth(date: Date = new Date()) {
    console.log('setActive', date);

    if (!this.activeMonth || !isSameMonth(this.activeMonth, date)) {
      this.activeMonth = startOfMonth(date);
      this.refreshActiveMonth();
      this.calendarHelper.update(this.getHelperOptions());
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

    const utcDate = this.getUtcDate(dateLocalOrUTC);

    if (startOfDay(utcDate).getTime() === utcDate.getTime()) {
      // the date is a utc midnight; return the equivalent local timezone midnight date
      return utcDate;
    }
    // does not point to midnight so best assumption is to chop off the time part
    return startOfDay(dateLocalOrUTC);
  }

  private getUtcDate(date: Date): Date {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
  }

  private normalizeDates(datesLocalOrUTC: Date[]) {
    if (datesLocalOrUTC) {
      return datesLocalOrUTC.map(this.normalizeDate);
    }
  }

  private getWeekDays(): string[] {
    const now = new Date();

    const weekInterval = eachDayOfInterval({ start: startOfWeek(now), end: endOfWeek(now) });

    return weekInterval.reduce((dayArr, date) => {
      dayArr.push(this.formatWithLocale(date, 'EEEEE')); // EEEEE returns first letter of weekday capitalized
      return dayArr;
    }, []);
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
    return this.disabledDates.some((disabledDate) => {
      return isSameDay(disabledDate, date);
    });
  }

  refreshActiveMonth() {
    if (!this.activeMonth) return;
    console.log('activeMonth', this.activeMonth);

    const monthStart = startOfMonth(this.activeMonth);
    console.log('monthStart', monthStart);
    const monthEnd = endOfMonth(this.activeMonth);
    console.log('monthEnd', monthEnd);
    const startOfFirstWeek = startOfISOWeek(monthStart);
    console.log('startOfFirstWeek', startOfFirstWeek);
    const endOfLastWeek = endOfISOWeek(monthEnd);
    console.log('endOfLastWeek', endOfLastWeek);
    const totalDayCount = differenceInDays(endOfLastWeek, startOfFirstWeek) + 1;
    console.log('totaldays', totalDayCount);

    const today = this.todayDate ? startOfDay(this.todayDate) : undefined;
    const daysArray = Array.from(Array(totalDayCount).keys());

    const days: CalendarCell[] = daysArray.map((number) => {
      const cellDate = addDays(startOfFirstWeek, number);
      const day = this.getCalendarDay(cellDate, today, monthStart);

      const isSelectable = this.isSelectable(day, cellDate);
      const isSelected = isSameDay(this.selectedDate, cellDate);
      const cell = {
        date: cellDate,
        isCurrentMonth: day.isCurrentMonth,
        isSelectable,
        isSelected,
        cssClasses: this.getCssClasses(day, isSelectable, isSelected),
      };
      if (isSelected) {
        this.selectedDay = cell;
      }
      return cell;
    });
    this.month = this.chunk(days, 7);
  }

  private getCalendarDay(date: Date, today: Date, monthStart: Date): CalendarDay {
    return {
      isToday: isSameDay(today, date),
      isPast: isBefore(date, today),
      isFuture: isAfter(date, today),
      isWeekend: isWeekend(date),
      isCurrentMonth: isSameMonth(date, monthStart),
      isDisabled: this.isDisabledDate(date),
    };
  }

  private isSelectable(day: CalendarDay, date: Date) {
    return (
      (this.alwaysEnableToday && day.isToday) ||
      (!day.isDisabled &&
        day.isCurrentMonth &&
        !(this.disableWeekends && day.isWeekend) &&
        !(this.disablePastDates && day.isPast) &&
        !(this.disableFutureDates && day.isFuture) &&
        !(this.minDate && isBefore(date, this.minDate)) &&
        !(this.maxDate && isAfter(date, this.maxDate)))
    );
  }

  private getCssClasses(day: CalendarDay, isSelectable: boolean, isSelected: boolean) {
    const cssClasses = {
      'current-month': day.isCurrentMonth,
      weekend: day.isWeekend,
      today: day.isToday,
      selectable: isSelectable,
      selected: isSelected,
      past: day.isPast,
      disabled: day.isDisabled,
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
    this.calendarHelper.setSelectedDay(newDate.getDate());
  }

  onDateSelected(newDay: CalendarCell) {
    console.log('onDateSelect', newDay);

    if (newDay.isSelectable && newDay.date) {
      const dateToEmit = this.timezone === 'local' ? newDay.date : this.getUtcDate(newDay.date);

      if (this.hasDateChanged(newDay.date, this._selectedDate)) {
        this.onSelectedDateChange(newDay.date);
        this._selectedDate = newDay.date;
        this.dateChange.emit(dateToEmit);
      }
      this.dateSelect.emit(dateToEmit);
    }
  }

  private onChangeMonth(direction: number) {
    this.changeMonth(direction);
    this.calendarHelper.update(this.getHelperOptions());
  }

  changeMonth(index: number) {
    this.changeActiveView(index, TimeUnit.month);
  }

  public changeYear(year: number) {
    this.changeActiveView(year - getYear(this.activeMonth), TimeUnit.year);
  }

  private changeActiveView(index: number, unit: TimeUnit) {
    if (index === 0) return;
    switch (unit) {
      case TimeUnit.year:
        this.activeMonth = addYears(this.activeMonth, index);
        break;

      case TimeUnit.month:
        this.activeMonth = addMonths(this.activeMonth, index);
        break;

      case TimeUnit.day:
        this.activeMonth = addDays(this.activeMonth, index);
        break;

      case TimeUnit.hour:
        this.activeMonth = addHours(this.activeMonth, index);
        break;

      default:
        break;
    }
    this.refreshActiveMonth();
  }

  public get canNavigateBack(): boolean {
    const disabledPastAndActiveCurrent =
      this.disablePastDates && isSameMonth(this.activeMonth, this.todayDate);

    const reachedOrExceededMinimum =
      this.minDate &&
      (isSameMonth(this.activeMonth, this.minDate) || isBefore(this.activeMonth, this.minDate));

    return !disabledPastAndActiveCurrent && !reachedOrExceededMinimum;
  }

  public get canNavigateForward(): boolean {
    const disabledFutureAndActiveCurrent =
      this.disableFutureDates && isSameMonth(this.activeMonth, this.todayDate);

    const reachedOrExceedMax =
      this.maxDate &&
      (isSameMonth(this.activeMonth, this.maxDate) || isAfter(this.activeMonth, this.maxDate));

    return !disabledFutureAndActiveCurrent && !reachedOrExceedMax;
  }

  private getCell(date: Date) {
    let foundDay = null;
    if (date) {
      for (let week of this.month) {
        foundDay = week.find((day) => {
          return day.isCurrentMonth && day.date === date;
        });
        if (foundDay) {
          break;
        }
      }
    }
    return foundDay;
  }

  private getHelperOptions(): CalendarOptions {
    return {
      canNavigateBack: this.canNavigateBack,
      canNavigateForward: this.canNavigateForward,
      year: this.activeYear,
      monthName: this.activeMonthName,
      weekDays: this.weekDays,
      month: this.month,
    };
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
}
