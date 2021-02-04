import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'cookbook-calendar-card-example',
  templateUrl: './calendar-card-example.component.html',
  styleUrls: ['./calendar-card-example.component.scss'],
})
export class CalendarCardExampleComponent implements OnChanges {
  selectedDate: Date;
  @Input() disableWeekends = false;
  @Input() disablePastDates = false;
  @Input() disableFutureDates = false;
  @Input() setDisabledDates = false;
  @Input() setMinDate = false;
  @Input() setMaxDate = false;
  @Input() setTodayDate = false;
  @Input() useTimezoneUTC = false;
  @Input() showYearNavigator = false;

  minDate: Date;
  maxDate: Date;
  todayDate: Date;
  disabledDates: Date[];
  yearNavigatorOptions = { from: -6, to: 3 };

  constructor() {
    this.updateInputDates();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.useTimezoneUTC) {
      this.updateInputDates();

      if (this.selectedDate) {
        // realign selectedDate with the timezone that is now used, or the rendered date will
        // be misleading and confusing
        if (this.useTimezoneUTC) {
          // realign local -> UTC
          this.selectedDate = moment.utc(moment(this.selectedDate).format('YYYY-MM-DD')).toDate();
        } else {
          // realign UTC -> local
          this.selectedDate = moment(moment.utc(this.selectedDate).format('YYYY-MM-DD')).toDate();
        }
      }
    }
  }

  onDateChange(selectedDate: Date) {
    this.selectedDate = selectedDate;
  }

  selectNextMonth() {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    this.selectedDate = nextMonth;
  }

  selectToday() {
    this.selectedDate = new Date();
  }

  private updateInputDates() {
    const todayMoment = (this.useTimezoneUTC ? moment.utc() : moment()).startOf('day');

    this.minDate = todayMoment
      .clone()
      .subtract(60, 'days')
      .toDate();
    this.maxDate = todayMoment
      .clone()
      .add(60, 'days')
      .toDate();
    this.todayDate = todayMoment
      .clone()
      .add(3, 'days')
      .toDate(); // artificial but works for demo

    this.disabledDates = [3, 5, 7, 10, 15, 25, 28, 35].map((daysFomToday) =>
      todayMoment
        .clone()
        .add(daysFomToday, 'days')
        .toDate()
    );
  }
}
