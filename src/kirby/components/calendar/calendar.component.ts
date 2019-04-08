import {
  Component,
  AfterViewInit,
  ContentChild,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import * as moment from 'moment';
import { chunk, range } from 'lodash';

import { CalendarDayDirective } from './helpers/calendar-day.directive';
import { CalendarHelper } from './helpers/calendar.helper';

export interface CalendarOptions {
  selectDate: (Date) => {};
  weekDays: string[];
  currentMonthAndYear: string;
  month: any[][];
}

@Component({
  selector: 'kirby-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [CalendarHelper],
})
export class CalendarComponent implements AfterViewInit {
  @ContentChild(CalendarDayDirective) dayTemplate: CalendarDayDirective;
  @ViewChild('calendarContainer') calendarContainer: ElementRef;
  month: any[][];
  @Output() dateChange = new EventEmitter<Date>();

  private _displayDate: Date;
  public weekDays = ['M', 'T', 'O', 'T', 'F', 'L', 'S'];

  constructor(private calendarHelper: CalendarHelper) {}

  @Input() set displayDate(date: Date) {
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

  get currentMonthAndYear(): string {
    var months = new Array();
    months[0] = 'January';
    months[1] = 'February';
    months[2] = 'March';
    months[3] = 'April';
    months[4] = 'May';
    months[5] = 'June';
    months[6] = 'July';
    months[7] = 'August';
    months[8] = 'September';
    months[9] = 'October';
    months[10] = 'November';
    months[11] = 'December';

    const month = months[this.displayDate.getMonth()];
    const year = this.displayDate.getFullYear();

    return `${month} ${year}`;
  }

  refresh() {
    const momentDate = moment(this.displayDate);
    const monthStart = momentDate.startOf('month').toDate();
    const weekDay = CalendarComponent.fixWeekday(monthStart.getDay());
    const startOfWeek = momentDate.subtract(weekDay, 'days').toDate();
    const count = CalendarComponent.fixCount(weekDay + momentDate.daysInMonth());

    const days = range(0, count).map((number) => {
      const date = moment(startOfWeek).add(number, 'days');
      const past = date.isBefore();
      const today = date.isSame(moment(), 'day');
      const weekend = date.toDate().getDay() === 0 || date.toDate().getDay() === 6;
      const currentMonth = date.isSame(monthStart, 'month');
      const key = date.format('DD-MM-YYYY');

      return {
        content: {
          date,
          key,
          past,
          today,
          currentMonth,
          weekend,
        },
      };
    });
    this.month = chunk(days, 7);
  }

  ngAfterViewInit() {
    this.refresh();
    this.calendarHelper.init(this.calendarContainer, {
      selectDate: this.selectDate.bind(this),
      weekDays: this.weekDays,
      currentMonthAndYear: this.currentMonthAndYear,
      month: this.month,
    });
  }

  public selectDate(selectedDate: Date) {
    console.log('selectedDate:' + (selectedDate instanceof Date));
    if (selectedDate instanceof Date) {
      this.dateChange.emit(selectedDate);
    }
  }

  public next() {
    this.displayDate = this.addMonths(this.displayDate, 1);
  }

  public previous() {
    this.displayDate = this.subMonths(this.displayDate, 1);
  }

  addMonths(dirtyDate, dirtyAmount) {
    var date = dirtyDate;
    var amount = Number(dirtyAmount);
    var desiredMonth = date.getMonth() + amount;
    var dateWithDesiredMonth = new Date(0);
    dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
    dateWithDesiredMonth.setHours(0, 0, 0, 0);
    var daysInMonth = moment(dateWithDesiredMonth).daysInMonth();
    // Set the last day of the new month
    // if the original date was the last day of the longer month
    date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
    return date;
  }

  subMonths(dirtyDate, dirtyAmount) {
    var amount = Number(dirtyAmount);
    return this.addMonths(dirtyDate, -amount);
  }
}
