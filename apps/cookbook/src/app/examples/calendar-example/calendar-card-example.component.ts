import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { addDays, startOfDay, subDays } from 'date-fns';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

@Component({
  selector: 'cookbook-calendar-card-example',
  templateUrl: './calendar-card-example.component.html',
  styleUrls: ['./calendar-card-example.component.scss'],
})
export class CalendarCardExampleComponent implements OnChanges {
  selectedDate: Date;
  displayDate: string;
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
  timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
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
          // realign local -> selectedDate
          this.selectedDate = zonedTimeToUtc(
            // this.subtractTimezoneOffset(this.selectedDate),
            this.selectedDate,
            this.timeZoneName
          );
        } else {
          // realign UTC -> local
          this.selectedDate = utcToZonedTime(this.selectedDate, this.timeZoneName);
        }
      }
    }
  }

  onDateChange(selectedDate: Date) {
    this.selectedDate = selectedDate;
    this.displayDate = format(this.selectedDate, 'yyyy-MM-dd HH:mm:ssXXX', {
      timeZone: this.timeZoneName,
    });
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
    const today = startOfDay(new Date());

    this.minDate = subDays(today, 60);
    this.maxDate = addDays(today, 60);
    this.todayDate = addDays(today, 3); // artificial but works for demo

    this.disabledDates = [3, 5, 7, 10, 15, 25, 28, 35].map((daysFromToday) =>
      addDays(today, daysFromToday)
    );
  }

  private subtractTimezoneOffset(date: Date): Date {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  }
}
