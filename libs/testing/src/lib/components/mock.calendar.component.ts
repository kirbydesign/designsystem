import { Component, Input, Output, EventEmitter } from '@angular/core';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-calendar',
  template: '<ng-content></ng-content>',
})
export class MockCalendarComponent {
  @Output() dateChange = new EventEmitter<Date>();
  @Input() disableWeekends;
  @Input() disablePastDates;
  @Input() disableFutureDates;
  @Input() disabledDates: Date[];
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() alwaysEnableToday;
  @Input() selectedDate;
}

// #endregion
