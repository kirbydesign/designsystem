import { Component } from '@angular/core';

@Component({
  selector: 'kirby-calendar-example',
  templateUrl: './calendar-example.component.html',
  styleUrls: ['./calendar-example.component.scss'],
})
export class CalendarExampleComponent {
  selectedDate: Date;

  onDateChange(selectedDate: Date) {
    this.selectedDate = selectedDate;
  }
}
