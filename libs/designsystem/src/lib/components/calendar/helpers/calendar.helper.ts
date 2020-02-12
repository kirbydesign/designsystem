import { ElementRef, Injectable } from '@angular/core';

import { CalendarOptions } from './calendar-options.model';

@Injectable()
export class CalendarHelper {
  private embeddedView: Window;
  private embeddedViewReady = false;

  public init(
    calendarContainer: ElementRef,
    options: CalendarOptions,
    onDaySelected: (cell: { isSelectable: boolean; date: number }) => void,
    onChangeMonth: (index: number) => void
  ) {
    if (this.hasEmbeddedView(calendarContainer)) {
      const iframe = <HTMLIFrameElement>calendarContainer.nativeElement;
      iframe.onload = () => {
        this.embeddedViewReady = true;
        this.emitOptionsToEmbeddedView(options);
      };
      this.embeddedView = iframe.contentWindow;

      window.addEventListener('message', (event: MessageEvent) =>
        this.handleMessageEvent(event, onDaySelected, onChangeMonth)
      );
    }
  }

  public update(options: CalendarOptions) {
    if (this.embeddedViewReady) {
      this.emitOptionsToEmbeddedView(options);
    }
  }

  public setSelectedDay(day: number) {
    if (this.embeddedViewReady) {
      this.embeddedView.postMessage(
        {
          type: 'kirbyCalendarSetSelectedDay',
          selectedDay: day,
        },
        '*'
      );
    }
  }

  private hasEmbeddedView(calendarContainer: ElementRef) {
    return (
      calendarContainer &&
      calendarContainer.nativeElement &&
      calendarContainer.nativeElement instanceof HTMLIFrameElement &&
      calendarContainer.nativeElement.contentWindow
    );
  }

  private emitOptionsToEmbeddedView(options: CalendarOptions) {
    this.embeddedView.postMessage(
      {
        type: 'kirbyCalendarInit',
        ...options,
      },
      '*'
    );
  }

  private handleMessageEvent(
    event: MessageEvent,
    onDaySelected: (cell: { isSelectable: boolean; date: number }) => void,
    onChangeMonth: (index: number) => void
  ) {
    if (this.validateMessage(event)) {
      switch (event.data.type) {
        case 'kirbyCalendarDaySelected':
          if (this.validateDateSelectedMessage(event)) {
            onDaySelected({ isSelectable: true, date: event.data.day });
          }
          break;
        case 'kirbyCalendarChangeMonth':
          if (this.validateNavigateMonthMessage(event)) {
            onChangeMonth(event.data.index);
          }
          break;
      }
    }
  }

  private validateMessage(event: MessageEvent) {
    return (
      this.embeddedView === event.source &&
      event.type === 'message' &&
      event.data &&
      event.data.type
    );
  }

  private validateDateSelectedMessage(event: MessageEvent) {
    return event.data.type === 'kirbyCalendarDaySelected' && event.data.day;
  }

  private validateNavigateMonthMessage(event: MessageEvent) {
    return event.data.type === 'kirbyCalendarChangeMonth' && typeof event.data.index === 'number';
  }
}
