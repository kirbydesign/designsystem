import { Component } from '@angular/core';

@Component({
  selector: 'kirby-calendar-example',
  templateUrl: './calendar-example.component.html',
  styleUrls: ['./calendar-example.component.scss'],
})
export class CalendarExampleComponent {
  selectedDate: Date;
  disableDatesArray: Array<Date> = new Array();

  constructor() {
    var date1 = new Date('2019-04-18');
    var date2 = new Date('2019-04-19');
    var date3 = new Date('2019-04-22');
    var date4 = new Date('2019-05-01');
    var date5 = new Date('2019-05-17');
    var date6 = new Date('2019-05-30');
    var date7 = new Date('2019-06-05');
    var date8 = new Date('2019-06-10');

    this.disableDatesArray.push(date1, date2, date3, date4, date5, date6, date7, date8);
  }

  onDateChange(selectedDate: Date) {
    console.log('onDateChange: ' + selectedDate);
    this.selectedDate = selectedDate;
  }
}
