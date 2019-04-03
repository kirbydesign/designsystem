import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-calendar-example',
  templateUrl: './calendar-example.component.html',
  styleUrls: ['./calendar-example.component.scss'],
})
export class CalendarExampleComponent {
  selectedKey: string;

  selectDay(key: string) {
    console.log(key);
    this.selectedKey = key;
  }
}
