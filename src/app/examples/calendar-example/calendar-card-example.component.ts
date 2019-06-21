import { Component } from '@angular/core';

@Component({
  selector: 'kirby-calendar-card-example',
  templateUrl: './calendar-card-example.component.html',
  styleUrls: ['./calendar-card-example.component.scss'],
})
export class CalendarCardExampleComponent {
  selectedDate: Date;
  disableDatesArray: Array<Date> = new Array();

  constructor() {
    const today = new Date();
    var date1 = new Date();
    date1.setDate(today.getDate() + 3);
    var date2 = new Date();
    date2.setDate(today.getDate() + 5);
    var date3 = new Date();
    date3.setDate(today.getDate() + 7);
    var date4 = new Date();
    date4.setDate(today.getDate() + 10);
    var date5 = new Date();
    date5.setDate(today.getDate() + 15);
    var date6 = new Date();
    date6.setDate(today.getDate() + 25);
    var date7 = new Date();
    date7.setDate(today.getDate() + 28);
    var date8 = new Date();
    date8.setDate(today.getDate() + 35);

    this.disableDatesArray.push(date1, date2, date3, date4, date5, date6, date7, date8);
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
