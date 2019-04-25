import { ElementRef } from '@angular/core';

import { CalendarOptions } from '../calendar.component';

export class CalendarHelper {
  private iframe: HTMLIFrameElement;
  public init(calendarContainer: ElementRef, options: CalendarOptions) {
    if (
      calendarContainer &&
      calendarContainer.nativeElement &&
      calendarContainer.nativeElement instanceof HTMLIFrameElement &&
      calendarContainer.nativeElement.contentWindow
    ) {
      this.iframe = <HTMLIFrameElement>calendarContainer.nativeElement;
      this.iframe.onload = () => {
        this.iframe.contentWindow.postMessage(
          {
            type: 'kirbyCalendarInit',
            disableWeekends: options.disableWeekends,
            disablePastDates: options.disablePastDates,
            disableDates: options.disableDates,
            currentDate: options.currentDate,
            displayDate: options.displayDate,
            weekDays: options.weekDays,
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

  public selectCurrentDate(date: Date) {
    if (this.iframe) {
      this.iframe.contentWindow.postMessage(
        {
          type: 'kirbyCalendarSelectCurrentDate',
          currentDate: date,
        },
        '*'
      );
    }
  }
}
