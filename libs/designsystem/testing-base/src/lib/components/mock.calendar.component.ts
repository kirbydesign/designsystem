import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { CalendarComponent } from '@kirbydesign/designsystem';

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
  @Input() timezone: 'local' | 'UTC';
  @Input() disableWeekends: boolean;
  @Input() disablePastDates: boolean;
  @Input() disableFutureDates: boolean;
  @Input() alwaysEnableToday: boolean;
  @Input() useYearSelector: boolean;
  @Input() selectedDate: Date;
  @Input() disabledDates: Date[];
  @Input() todayDate: Date;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() activeYear: string;
}

// #endregion
