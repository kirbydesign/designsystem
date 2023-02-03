import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { Locale } from 'date-fns';

import { CalendarComponent, CalendarYearNavigatorConfig } from '@kirbydesign/designsystem/calendar';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-calendar',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: CalendarComponent,
      useExisting: forwardRef(() => MockCalendarComponent),
    },
  ],
})
export class MockCalendarComponent {
  @Output() dateChange = new EventEmitter<Date>();
  @Output() dateSelect = new EventEmitter<Date>();
  @Output() yearSelect = new EventEmitter<number>();
  @Input() timezone: 'local' | 'UTC';
  @Input() disableWeekends: boolean;
  @Input() disablePastDates: boolean;
  @Input() disableFutureDates: boolean;
  @Input() alwaysEnableToday: boolean;
  @Input() customLocales: { [key: string]: Locale };
  @Input() usePopover: boolean;
  @Input() yearNavigatorOptions: CalendarYearNavigatorConfig;
  @Input() selectedDate: Date;
  @Input() disabledDates: Date[];
  @Input() enabledDates: Date[];
  @Input() todayDate: Date;
  @Input() minDate: Date;
  @Input() maxDate: Date;
}

// #endregion
