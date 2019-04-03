import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-calendar-showcase',
  templateUrl: './calendar-showcase.component.html',
  styleUrls: ['./calendar-showcase.component.scss'],
})
export class CalendarShowcaseComponent {
  selectedKey: string;

  selectDay(key: string) {
    this.selectedKey = key;
  }
}
