import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-calendar-example',
  templateUrl: './calendar-example.component.html',
  styleUrls: ['./calendar-example.component.scss'],
})
export class CalendarExampleComponent {
  selectedDate: Date;
  bankDate: Date;
  disableDatesArray: Array<Date> = new Array();

  constructor() {
    var date1 = new Date('2019-04-15');
    var date2 = new Date('2019-05-20');
    var date3 = new Date('2019-05-21');
    var date4 = new Date('2019-06-25');

    this.disableDatesArray.push(date1, date2, date3, date4);
  }

  onDateChange(selectedDate: Date) {
    console.log('onDateChange: ' + selectedDate);
    this.selectedDate = selectedDate;
  }

  nextBankDay() {
    var date = new Date('2019-05-23');
    this.bankDate = date;
  }

  today() {
    this.bankDate = new Date();
  }
}
