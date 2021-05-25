import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { addDays, startOfDay, subDays } from 'date-fns';

import {
  convertUTCDateToLocalDate,
  getUtcDate,
} from '@kirbydesign/designsystem/helpers/date-helper';

@Component({
  selector: 'cookbook-calendar-card-example',
  templateUrl: './calendar-card-example.component.html',
  styleUrls: ['./calendar-card-example.component.scss'],
})
export class CalendarCardExampleComponent implements OnChanges {
  selectedDate: Date;
  @Input() disableWeekends = false;
  @Input() disablePastDates = false;
  @Input() disableFutureDates = false;
  @Input() setDisabledDates = false;
  @Input() setMinDate = false;
  @Input() setMaxDate = false;
  @Input() setTodayDate = false;
  @Input() useTimezoneUTC = false;
  @Input() showYearNavigator = false;

  minDate: Date;
  maxDate: Date;
  todayDate: Date;
  disabledDates: Date[];
  yearNavigatorOptions = { from: -6, to: 3 };

  constructor() {
    this.updateInputDates();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.useTimezoneUTC) {
      this.updateInputDates();

      if (this.selectedDate) {
        // realign selectedDate with the timezone that is now used, or the rendered date will
        // be misleading and confusing
        if (this.useTimezoneUTC) {
          // realign local -> UTC
          this.selectedDate = getUtcDate(this.selectedDate);
        } else {
          // realign UTC -> local
          this.selectedDate = convertUTCDateToLocalDate(this.selectedDate);
        }
      }
    }
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

  private updateInputDates() {
    const today = this.useTimezoneUTC ? getUtcDate(startOfDay(new Date())) : startOfDay(new Date());

    this.minDate = subDays(today, 60);
    this.maxDate = addDays(today, 60);
    this.todayDate = addDays(today, 3); // artificial but works for demo

    this.disabledDates = [3, 5, 7, 10, 15, 25, 28, 35].map((daysFomToday) =>
      addDays(today, daysFomToday)
    );
  }
}
