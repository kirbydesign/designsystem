import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import moment from 'moment';

import { CalendarCell } from './helpers/calendar-cell.model';
import { CalendarOptions } from './helpers/calendar-options.model';
import { CalendarHelper } from './helpers/calendar.helper';

interface CalendarDay {
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isPast: boolean;
  isFuture: boolean;
  isDisabled: boolean;
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
  public month: CalendarCell[][];
  public weekDays: string[];
  private selectedDay: CalendarCell;
  // NOTE: Internally, all objects wrapping timestamps (i.e. Date and moment.Moment)
  // are normalized to point to local timezone midnight, regardless of the timezone
  // setting.
  private activeMonth: moment.Moment;
  private _selectedDate: Date;
  private _disabledDates: Date[];
  private _todayDate: Date;
  private _minDate: Date;
  private _maxDate: Date;

  get selectedDate(): Date {
    return this._selectedDate;
  }

  @Input() set selectedDate(valueLocalOrUTC: Date) {
    const value = this.normalizeDate(valueLocalOrUTC);
    this.setActiveMonth(value);
    if (this.hasDateChanged(value, this._selectedDate)) {
      this.onSelectedDateChange(value);
      this._selectedDate = value;
    }
  }

  get disabledDates(): Date[] {
    return this._disabledDates;
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

  @Input() set minDate(value: Date) {
    this._minDate = this.normalizeDate(value);
  }

  get maxDate(): Date {
    return this._maxDate;
  }

  @Input() set maxDate(value: Date) {
    this._maxDate = this.normalizeDate(value);
  }

  get activeMonthName(): string {
    return this.capitalizeFirstLetter(this.activeMonth.format('MMMM'));
  }

  get activeYear(): string {
    return this.activeMonth.format('YYYY');
  }

  constructor(private calendarHelper: CalendarHelper, @Inject(LOCALE_ID) private locale: string) {
    moment.locale(this.locale);
    moment().format('YYYY-MM-DD');
  }

  ngOnInit() {
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

  private setActiveMonth(date?: Date) {
    if (!this.activeMonth || !this.activeMonth.isSame(date, 'month')) {
      this.activeMonth = moment(date).startOf('month');
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
    if (dateLocalOrUTC) {
      // prettier-ignore
      if (moment(dateLocalOrUTC).startOf('day').isSame(moment(dateLocalOrUTC))) {
        // date is local timezone midnight
        return dateLocalOrUTC;
      
      // prettier-ignore
      } else if (moment.utc(dateLocalOrUTC).startOf('day').isSame(moment.utc(dateLocalOrUTC))) {
        // the date is a utc midnight; create the equivalent local timezone midnight date
        const utcMidnightMoment = moment.utc(dateLocalOrUTC);
        return moment(utcMidnightMoment.format('YYYY-MM-DD')).toDate();
      
      } else {
        // does not point to midnight so best assumption is to chop off the time part
        return moment(dateLocalOrUTC).startOf('day').toDate();
      }
    }
  }

  private normalizeDates(datesLocalOrUTC: Date[]) {
    if (datesLocalOrUTC) {
      return datesLocalOrUTC.map(this.normalizeDate);
    }
  }

  private capitalizeFirstLetter(string: string) {
    if (typeof string !== 'string') {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private getWeekDays(): string[] {
    return [1, 2, 3, 4, 5, 6, 7].map((index) =>
      moment()
        .isoWeekday(index)
        .format('dd')
        .substr(0, 1)
        .toUpperCase()
    );
  }

  private hasDateChanged(newDate: Date, previousDate: Date): boolean {
    if (!newDate && !previousDate) {
      return false;
    }
    if (newDate instanceof Date && !previousDate) {
      return true;
    }
    return !this.isSameDay(newDate, previousDate);
  }

  private isSameDay(date1: Date | moment.Moment, date2: Date | moment.Moment): boolean {
    // Moment will return a new moment with the current time from `undefined`,
    // so `moment(date1).isSame(undefined, 'day')` will return `true` if date1 equals current time:
    if (!date1 || !date2) {
      return false;
    }
    return moment(date1).isSame(date2, 'day');
  }

  private isDisabledDate(date: Date | moment.Moment) {
    let isDisabled = false;

    if (this.disabledDates && this.disabledDates.length > 0) {
      this.disabledDates.forEach((disabledDate) => {
        if (moment(disabledDate).isSame(date, 'day')) {
          isDisabled = true;
        }
      });
    }
    return isDisabled;
  }

  refreshActiveMonth() {
    // IMPORTANT: Moment startOf|endOf functions mutates the date!
    // Clone the date before mutating:
    const monthStart = this.activeMonth.clone().startOf('month');
    const monthEnd = this.activeMonth.clone().endOf('month');
    const startOfFirstWeek = monthStart.clone().startOf('isoWeek');
    const endOfLastWeek = monthEnd.clone().endOf('isoWeek');
    const totalDayCount = endOfLastWeek.diff(startOfFirstWeek, 'days') + 1;
    const today = moment(this.todayDate ? this.todayDate : undefined).startOf('day');
    const daysArray = Array.from(Array(totalDayCount).keys());

    const days: CalendarCell[] = daysArray.map((number) => {
      const momentDate = startOfFirstWeek.clone().add(number, 'days');
      const day = this.getCalendarDay(momentDate, today, monthStart);

      const isSelectable = this.isSelectable(day, momentDate);
      const isSelected = this.isSameDay(this.selectedDate, momentDate);
      const cell = {
        date: momentDate.date(),
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

  private getCalendarDay(
    date: moment.Moment,
    today: moment.Moment,
    monthStart: moment.Moment
  ): CalendarDay {
    return {
      isToday: date.isSame(today, 'day'),
      isPast: date.isBefore(today),
      isFuture: date.isAfter(today),
      isWeekend: date.isoWeekday() === 6 || date.isoWeekday() === 7,
      isCurrentMonth: date.isSame(monthStart, 'month'),
      isDisabled: this.isDisabledDate(date),
    };
  }

  private isSelectable(day: CalendarDay, date: moment.Moment) {
    return (
      (this.alwaysEnableToday && day.isToday) ||
      (!day.isDisabled &&
        day.isCurrentMonth &&
        !(this.disableWeekends && day.isWeekend) &&
        !(this.disablePastDates && day.isPast) &&
        !(this.disableFutureDates && day.isFuture) &&
        !(this.minDate && date.isBefore(this.minDate, 'day')) &&
        !(this.maxDate && date.isAfter(this.maxDate, 'day')))
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
    if (newDay.isSelectable && newDay.date) {
      const selectedDate = this.activeMonth
        .clone()
        .date(newDay.date)
        .toDate();

      // emit equivalent date in utc midnight if timezone is not local
      const emitDate =
        this.timezone === 'local'
          ? selectedDate
          : moment.utc(moment(selectedDate).format('YYYY-MM-DD')).toDate();

      if (this.hasDateChanged(selectedDate, this._selectedDate)) {
        this.onSelectedDateChange(selectedDate);
        this._selectedDate = selectedDate;
        this.dateChange.emit(emitDate);
      }
      this.dateSelect.emit(emitDate);
    }
  }

  private onChangeMonth(direction: number) {
    this.changeMonth(direction);
    this.calendarHelper.update(this.getHelperOptions());
  }

  changeMonth(index: number) {
    this.changeActiveView(index, 'months');
  }

  private changeActiveView(index: number, unit: moment.unitOfTime.Base) {
    if (index != 0) {
      this.activeMonth.add(index, unit);
      this.refreshActiveMonth();
    }
  }

  public get canNavigateBack(): boolean {
    return (
      !(this.disablePastDates && moment().isSame(this.activeMonth, 'month')) &&
      !(this.minDate && this.activeMonth.isSameOrBefore(this.minDate, 'month'))
    );
  }

  public get canNavigateForward(): boolean {
    return (
      !(this.disableFutureDates && moment().isSame(this.activeMonth, 'month')) &&
      !(this.maxDate && this.activeMonth.isSameOrAfter(this.maxDate, 'month'))
    );
  }

  private getCell(date: Date) {
    let foundDay = null;
    if (date) {
      for (let week of this.month) {
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
}
