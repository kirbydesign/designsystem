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
  @Input() disableWeekends: boolean;
  @Input() disablePastDates: boolean;
  @Input() disableFutureDates: boolean;
  @Input() disabledDates: Date[];
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() alwaysEnableToday: boolean;
  @Input() selectedDate: Date;
}

// #endregion
