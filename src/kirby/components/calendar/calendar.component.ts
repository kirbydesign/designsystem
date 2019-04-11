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
} from '@angular/core';
import * as moment from 'moment';
import { chunk, range } from 'lodash';

import { CalendarHelper } from './helpers/calendar.helper';
import { CalendarDay } from './helpers/calendar-day.model';

export interface CalendarOptions {
  selectDate: (Date) => {};
  disableWeekends: boolean;
  disablePastDates: boolean;
  disableDates: Date[];
  currentDate: Date;
  displayDate: Date;
  weekDays: string[];
  month: any[][];
  monthNames: string[];
}

@Component({
  selector: 'kirby-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [CalendarHelper],
})
export class CalendarComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('calendarContainer') calendarContainer: ElementRef;
  @Output() dateChange = new EventEmitter<Date>();
  @Input() disableWeekends: true | false = false;
  @Input() disablePastDates: true | false = true;
  @Input() disableDates: Date[];
  @Input() currentDate: Date;

  private selectedDay: CalendarDay;
  private _displayDate: Date;
  public month: any[][];
  public weekDays = ['M', 'T', 'O', 'T', 'F', 'L', 'S'];
  public monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(private calendarHelper: CalendarHelper) {
    moment().format('YYYY-MM-DD');
  }

  set displayDate(date: Date) {
    this._displayDate = date;
    this.refresh();
  }

  get displayDate(): Date {
    return this._displayDate || new Date();
  }

  static fixWeekday(weekDay: number) {
    return weekDay === 0 ? 6 : weekDay - 1;
  }

  static fixCount(count: number) {
    const x = count % 7;
    return x !== 0 ? count - x + 7 : count;
  }

  get currentMonth(): string {
    return this.monthNames[this.displayDate.getMonth()];
  }

  ngOnInit() {
    this.refresh();
  }

  ngAfterViewInit() {
    this.calendarHelper.init(this.calendarContainer, {
      selectDate: this.selectDate.bind(this),
      disableWeekends: this.disableWeekends,
      disablePastDates: this.disablePastDates,
      disableDates: this.disableDates,
      currentDate: this.currentDate,
      displayDate: this.displayDate,
      weekDays: this.weekDays,
      month: this.month,
      monthNames: this.monthNames,
    });
  }

  ngOnChanges(changes: any) {
    const currentDate = changes.currentDate.currentValue;
    if (currentDate) {
      this.displayDate = currentDate;
      this.selectCurrentDateDay(currentDate);
    }
  }

  refresh() {
    const momentDate = moment(this.displayDate);
    const monthStart = momentDate.startOf('month').toDate();
    const weekDay = CalendarComponent.fixWeekday(monthStart.getDay());
    const startOfWeek = momentDate.subtract(weekDay, 'days').toDate();
    const count = CalendarComponent.fixCount(weekDay + momentDate.daysInMonth());

    const days = range(0, count).map((number) => {
      const date = moment(startOfWeek).add(number, 'days');
      let disabled = false;

      if (this.disableDates && this.disableDates.length > 0) {
        this.disableDates.forEach(function(disableDate) {
          if (moment(disableDate).isSame(date, 'day')) {
            disabled = true;
          }
        });
      }

      const today = date.isSame(moment(), 'day');
      const past = this.disablePastDates ? date.isBefore() && !today : false;
      const weekend = date.toDate().getDay() === 0 || date.toDate().getDay() === 6;
      const currentMonth = date.isSame(monthStart, 'month');
      const selectable = currentMonth && !(weekend && this.disableWeekends) && !past && !disabled;
      const selected =
        this.selectedDay !== undefined ? moment(this.selectedDay.date).isSame(date) : false;

      return {
        date,
        past,
        today,
        weekend,
        currentMonth,
        selectable,
        selected,
        disabled,
      };
    });
    this.month = chunk(days, 7);
  }

  public selectDate(selectedDate: Date) {
    console.log('selectedDate:' + selectedDate + (selectedDate instanceof Date));
    if (selectedDate instanceof Date) {
      this.dateChange.emit(selectedDate);
    }
  }

  public selectCalendarDate(day) {
    if (day.selectable) {
      this.selectedDay = day;
      this.resetSelectedDays();
      day.selected = true;
      this.dateChange.emit(day.date.toDate());
    }
  }

  public changeMonth(index: number) {
    this.displayDate = moment(this.displayDate)
      .add(index, 'months')
      .toDate();
  }

  public changeYear(index: number) {
    this.displayDate = moment(this.displayDate)
      .add(index, 'year')
      .toDate();
  }

  public get disablePastDatesButton(): boolean {
    return this.disablePastDates && moment(this.displayDate).isSame(new Date(), 'month');
  }

  private resetSelectedDays() {
    this.month.forEach(function(week) {
      week.forEach(function(day) {
        day.selected = false;
      });
    });
  }

  private selectCurrentDateDay(date) {
    var self = this;
    this.month.forEach(function(week) {
      week.forEach(function(day) {
        if (moment(day.date).isSame(moment(date), 'day')) {
          day.selected = true;
          self.selectCalendarDate(day);
        }
      });
    });
  }
}
