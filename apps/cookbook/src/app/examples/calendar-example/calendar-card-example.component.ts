import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { addDays, startOfDay, subDays } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

const config = {
  template: `<kirby-card>
  <kirby-calendar
    [timezone]="useTimezoneUTC ? 'UTC' : 'local'"
    [disableWeekends]="disableWeekends"
    [disablePastDates]="disablePastDates"
    [disableFutureDates]="disableFutureDates"
    [disabledDates]="setDisabledDates ? disabledDates : null"
    [enabledDates]="setEnabledDates ? enabledDates : null"
    [minDate]="setMinDate ? minDate : null"
    [maxDate]="setMaxDate ? maxDate : null"
    [todayDate]="setTodayDate ? todayDate : null"
    [selectedDate]="selectedDate"
    (dateChange)="onDateChange($event)"
    [yearNavigatorOptions]="showYearNavigator ? yearNavigatorOptions : null"
  ></kirby-calendar>
</kirby-card>

<kirby-card [hasPadding]="true">
  <kirby-card-header [hasPadding]="false">
    <p>
      Selected Date: {{ selectedDate ? (selectedDate | date: 'MMM d, y z':(useTimezoneUTC ? 'UTC' : undefined)) : 'none' }}   
    </p>
  </kirby-card-header>
  <div class="buttons">
    <button kirby-button (click)="selectNextMonth()" attentionLevel="3" size="sm">
      Next month
    </button>
    <button kirby-button (click)="selectToday()" attentionLevel="3" size="sm">Now</button>
    <button kirby-button (click)="deselectDate()" attentionLevel="3" size="sm">Deselect</button>
  </div>
</kirby-card>
    `,
  codeSnippet: `this.minDate = subDays(today, 60);
this.maxDate = addDays(today, 60);
this.todayDate = addDays(today, 3);

this.disabledDates = [3, 5, 7, 10, 15, 25, 28, 35].map((daysFromToday) =>
  addDays(today, daysFromToday)
);

this.enabledDates = [3, 5, 7, 10, 15, 25, 28, 35].map((daysFromToday) =>
  addDays(today, daysFromToday)
);

selectNextMonth() {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  this.selectedDate = nextMonth;
}

selectToday() {
  this.selectedDate = new Date();
}

deselectDate() {
  this.selectedDate = null;
}
  `,
};

@Component({
  selector: 'cookbook-calendar-card-example',
  template: config.template,
  styleUrls: ['./calendar-card-example.component.scss'],
})
export class CalendarCardExampleComponent implements OnChanges {
  static template: string = config.template;
  static codeSnippet: string = config.codeSnippet;

  selectedDate: Date;
  @Input() disableWeekends = false;
  @Input() disablePastDates = false;
  @Input() disableFutureDates = false;
  @Input() setDisabledDates = false;
  @Input() setEnabledDates = false;
  @Input() setMinDate = false;
  @Input() setMaxDate = false;
  @Input() setTodayDate = false;
  @Input() useTimezoneUTC = false;
  @Input() showYearNavigator = false;

  minDate: Date;
  maxDate: Date;
  todayDate: Date;
  disabledDates: Date[];
  enabledDates: Date[];
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
            this.subtractTimezoneOffset(this.selectedDate),
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
  }

  selectNextMonth() {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    this.selectedDate = nextMonth;
  }

  selectToday() {
    this.selectedDate = new Date();
  }

  deselectDate() {
    this.selectedDate = null;
  }

  private updateInputDates() {
    const today = startOfDay(new Date());

    this.minDate = subDays(today, 60);
    this.maxDate = addDays(today, 60);
    this.todayDate = addDays(today, 3); // artificial but works for demo

    this.disabledDates = [3, 5, 7, 10, 15, 25, 28, 35].map((daysFromToday) =>
      addDays(today, daysFromToday)
    );

    this.enabledDates = [3, 5, 7, 10, 15, 25, 28, 35].map((daysFromToday) =>
      addDays(today, daysFromToday)
    );
  }

  private subtractTimezoneOffset(date: Date): Date {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  }
}
