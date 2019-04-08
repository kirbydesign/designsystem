import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-calendar-example',
  templateUrl: './calendar-example.component.html',
  styleUrls: ['./calendar-example.component.scss'],
})
export class CalendarExampleComponent {
  selectedKey: string;
  selectedDate: Date;

  selectDay(key: string) {
    console.log(key);
    this.selectedKey = key;
  }

  onDateChange(selectedDate: Date) {
    console.log('onDateChange: ' + selectedDate);
    this.selectedDate = selectedDate;
  }
}
