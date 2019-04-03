import { ElementRef } from '@angular/core';

export class CalendarHelper {
  calendarContainer: ElementRef;

  public init(calendarContainer: ElementRef) {
    this.calendarContainer = calendarContainer;
  }
}
