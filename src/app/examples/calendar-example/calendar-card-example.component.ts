import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-calendar-card-example',
  templateUrl: './calendar-card-example.component.html',
  styleUrls: ['./calendar-card-example.component.scss'],
})
export class CalendarCardExampleComponent {
  selectedDate: Date;
  @Input() disableWeekends = false;
  @Input() disablePastDates = false;
  @Input() disableFutureDates = false;
  @Input() setDisabledDates = false;
  @Input() setMinDate = false;
  @Input() setMaxDate = false;

  minDate: Date;
  maxDate: Date;
  disabledDates: Date[] = [];

  constructor() {
    const today = new Date();

    this.minDate = new Date();
    this.minDate.setDate(today.getDate() - 60);
    this.maxDate = new Date();
    this.maxDate.setDate(today.getDate() + 60);

    const date1 = new Date();
    date1.setDate(today.getDate() + 3);
    const date2 = new Date();
    date2.setDate(today.getDate() + 5);
    const date3 = new Date();
    date3.setDate(today.getDate() + 7);
    const date4 = new Date();
    date4.setDate(today.getDate() + 10);
    const date5 = new Date();
    date5.setDate(today.getDate() + 15);
    const date6 = new Date();
    date6.setDate(today.getDate() + 25);
    const date7 = new Date();
    date7.setDate(today.getDate() + 28);
    const date8 = new Date();
    date8.setDate(today.getDate() + 35);
    this.disabledDates.push(date1, date2, date3, date4, date5, date6, date7, date8);
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
}
