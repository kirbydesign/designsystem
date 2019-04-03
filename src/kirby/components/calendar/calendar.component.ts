import { Component, ContentChild, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { chunk, range } from 'lodash';
import {
  addDays,
  addMonths,
  format,
  getDay,
  getDaysInMonth,
  isAfter,
  isBefore,
  isPast,
  isThisMonth,
  isToday,
  isWeekend,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';

import { CalendarDayDirective } from './helpers/calendar-day.directive';
import { CalendarHelper } from './helpers/calendar.helper';

@Component({
  selector: 'kirby-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [CalendarHelper],
})
export class CalendarComponent implements OnInit {
  @ContentChild(CalendarDayDirective) dayTemplate: CalendarDayDirective;
  @ViewChild('calendarContainer') calendarContainer: ElementRef;
  @Input() max: Date;
  @Input() min: Date;
  month: any[][];

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
    const monthStart = startOfMonth(this.displayDate);
    const weekDay = CalendarComponent.fixWeekday(getDay(monthStart));
    const startOfWeek = subDays(monthStart, weekDay);
    const count = CalendarComponent.fixCount(weekDay + getDaysInMonth(this.displayDate));
    const days = range(0, count).map((number) => {
      const date = addDays(startOfWeek, number);
      const past = isPast(date);
      const today = isToday(date);
      const weekend = isWeekend(date);
      const currentMonth = isThisMonth(date);
      const disabled =
        (this.min && isBefore(date, this.min)) || (this.max && isAfter(date, this.max));
      const key = format(date, 'DD-MM-YYYY');
      return {
        content: {
          date,
          key,
          past,
          today,
          currentMonth,
          disabled,
          weekend,
        },
      };
    });
    this.month = chunk(days, 7);
  }

  ngOnInit(): void {
    this.refresh();
    this.calendarHelper.init(this.calendarContainer);
  }

  public next() {
    this.displayDate = addMonths(this.displayDate, 1);
  }

  public previous() {
    this.displayDate = subMonths(this.displayDate, 1);
  }
}
