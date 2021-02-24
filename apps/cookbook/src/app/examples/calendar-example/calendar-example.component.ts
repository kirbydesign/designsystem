import { Component } from '@angular/core';
import { CalendarYearNavigatorConfig } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-calendar-example',
  templateUrl: './calendar-example.component.html',
  styleUrls: ['./calendar-example.component.scss'],
})
export class CalendarExampleComponent {
  selectedDate: Date;

  onDateChange(selectedDate: Date) {
    this.selectedDate = selectedDate;
  }
}
