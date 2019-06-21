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
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() disabledDates: Date[];

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
