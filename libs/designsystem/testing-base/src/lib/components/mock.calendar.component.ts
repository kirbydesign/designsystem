import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { CalendarComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
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
// start class MockCalendarComponent
export class MockCalendarComponent {
  @Output() dateChange = new EventEmitter<Date>();
  @Input() timezone: 'local' | 'UTC';
  @Input() disableWeekends: boolean;
  @Input() disablePastDates: boolean;
  @Input() disableFutureDates: boolean;
  @Input() alwaysEnableToday: boolean;
  @Input() selectedDate: Date;
  @Input() disabledDates: Date[];
  @Input() todayDate: Date;
  @Input() minDate: Date;
  @Input() maxDate: Date;
} // end class MockCalendarComponent

// #endregion
