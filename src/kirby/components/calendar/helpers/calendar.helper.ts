import { ElementRef } from '@angular/core';

import { CalendarOptions } from '../calendar.component';

export class CalendarHelper {
  public init(calendarContainer: ElementRef, options: CalendarOptions) {
    if (
      calendarContainer &&
      calendarContainer.nativeElement &&
      calendarContainer.nativeElement instanceof HTMLIFrameElement &&
      calendarContainer.nativeElement.contentWindow
    ) {
      const iframe = <HTMLIFrameElement>calendarContainer.nativeElement;
      iframe.onload = () => {
        iframe.contentWindow.postMessage(
          {
            type: 'kirbyCalendarInit',
            weekDays: options.weekDays,
            currentMonthAndYear: options.currentMonthAndYear,
            month: JSON.stringify(options.month),
          },
          '*'
        );
      };
      window.addEventListener('message', (evt: MessageEvent) => {
        if (this.validateMessage(evt)) {
          options.selectDate(evt.data.date);
        }
      });
    } else {
      console.warn('No calendar container available...');
    }
  }

  private validateMessage(evt: MessageEvent) {
    return (
      evt.type === 'message' &&
      evt.data &&
      evt.data.type === 'kirbyCalendarSelectedDate' &&
      evt.data.date instanceof Date
    );
  }
}
