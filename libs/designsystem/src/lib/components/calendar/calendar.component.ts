import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  LOCALE_ID,
  Inject,
} from '@angular/core';
import moment from 'moment';

import { CalendarHelper } from './helpers/calendar.helper';
import { CalendarOptions } from './helpers/calendar-options.model';
import { CalendarCell } from './helpers/calendar-cell.model';

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
  @Input() disableWeekends = false;
  @Input() disablePastDates = false;
  @Input() disableFutureDates = false;
  @Input() disabledDates: Date[];
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() alwaysEnableToday = false;
  public month: CalendarCell[][];
  public weekDays: string[];
  private activeMonth: moment.Moment;
  private selectedDay: CalendarCell;
  private _selectedDate: Date;

  get selectedDate(): Date {
    return this._selectedDate;
  }

  @Input() set selectedDate(value: Date) {
    this.setActiveMonth(value);
    if (this.hasDateChanged(value, this._selectedDate)) {
      this.onSelectedDateChange(value);
      this._selectedDate = value;
      this.dateChange.emit(this._selectedDate);
    }
  }

  get activeMonthName(): string {
    return this.capitalizeFirstLetter(this.activeMonth.format('MMMM'));
  }

  get activeYear(): string {
    return this.activeMonth.format('YYYY');
  }

  constructor(private calendarHelper: CalendarHelper, @Inject(LOCALE_ID) private locale: string) {
    if (this.locale === 'en-US') {
      this.locale = 'en-GB';
    }
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
      changes.maxDate
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

  private capitalizeFirstLetter(string: string) {
    if (typeof string !== 'string') {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private getWeekDays(): string[] {
    return [0, 1, 2, 3, 4, 5, 6].map((index) =>
      moment()
        .weekday(index)
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
    const today = moment().startOf('day');
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
      this.selectedDate = selectedDate;
    }
  }

  private onChangeMonth(direction: number) {
    this.changeMonth(direction);
    this.calendarHelper.update(this.getHelperOptions());
  }

  public changeMonth(index: number) {
    this.changeActiveView(index, 'months');
  }

  public changeYear(index: number) {
    this.changeActiveView(index, 'year');
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
